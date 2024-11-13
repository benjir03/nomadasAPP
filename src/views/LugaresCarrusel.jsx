import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../estilos/CarouselOptions.css';
import axios from 'axios';

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      →
    </div>
  );
};

const LugaresCarrusel = () => {
  const location = useLocation(); // Ahora usamos useLocation correctamente
  const navigate = useNavigate();

  const [city, setCity] = useState(location.state?.ciudad || '');
  const [radius, setRadius] = useState('');
  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [priceRange, setPriceRange] = useState(location.state?.presupuesto || '');
  const [rating, setRating] = useState('');
  const [ambiance, setAmbiance] = useState(
    location.state?.acompanantes === "Voy solo" ? "tranquilo" : 
    location.state?.acompanantes === "Con pareja" ? "romántico" : 
    "familiar"
  );
  const [lessKnown, setLessKnown] = useState(false);
  const [nonTourist, setNonTourist] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setPackages([]);

    try {
      const url = `http://localhost:5000/search?city=${city}&category=${category}&radius=${radius}&priceRange=${priceRange}&rating=${rating}&keywords=${keywords}`;
      const response = await axios.get(url);

      let fetchedPackages = response.data.results.map(result => ({
        id: result.place_id,
        title: result.name,
        category: category,
        recommendedTime: "Tiempo recomendado no disponible",
        openingTime: result.opening_hours ? (result.opening_hours.open_now ? "Abierto ahora" : "Cerrado") : "Horario no disponible",
        price: result.price_level !== undefined ? `Precio: ${result.price_level}` : "Precio no disponible",
        location: result.formatted_address || result.vicinity,
        image: getPhotoUrl(result.photo_reference),
        rating: result.rating || "Sin calificación",
        userRatingsTotal: result.user_ratings_total || 0
      }));

      if (lessKnown) {
        fetchedPackages = fetchedPackages.filter(pkg => pkg.userRatingsTotal < 50);
      }

      if (nonTourist) {
        fetchedPackages = fetchedPackages.filter(pkg => !pkg.location.toLowerCase().includes("turístico"));
      }

      setPackages(fetchedPackages);
    } catch (error) {
      setError('Ocurrió un error al realizar la búsqueda.');
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return 'https://via.placeholder.com/400';
    }
    return `http://localhost:5000/place-photo?photo_reference=${photoReference}`;
  };

  const handleViewMoreClick = async (pkg) => {
    try {
      const detailsUrl = `http://localhost:5000/place-details?place_id=${pkg.id}`;
      const detailsResponse = await axios.get(detailsUrl);

      const shortDescUrl = `http://localhost:5000/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=100`;
      const shortDescResponse = await axios.get(shortDescUrl);

      const detailedDescUrl = `http://localhost:5000/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=300`;
      const detailedDescResponse = await axios.get(detailedDescUrl);

      console.log("Descripción corta recibida del servidor:", shortDescResponse.data.description);
      console.log("Descripción detallada recibida del servidor:", detailedDescResponse.data.description);

      const placeData = { 
        ...pkg, 
        ...detailsResponse.data, 
        descripcion_corta: shortDescResponse.data.description,
        descripcion: detailedDescResponse.data.description,
        category: pkg.category
      };

      navigate('/actividad', { state: placeData });
    } catch (error) {
      console.error('Error al obtener detalles del lugar:', error);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    adaptiveHeight: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ]
  };

  return (
    <div className="carousel-container">
      <form onSubmit={handleSubmit}>
        <h2>Busca tu lugar favorito</h2>
        <div>
          <label htmlFor="city">Lugar:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="radius">Radio (km):</label>
          <input type="number" id="radius" value={radius} onChange={(e) => setRadius(e.target.value)} />
        </div>
        <div>
          <label htmlFor="category">Categoría:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="restaurant">Restaurantes</option>
            <option value="bar">Bares</option>
            <option value="cafe">Cafeterías</option>
            <option value="store">Tiendas</option>
            <option value="museum">Museos</option>
            <option value="park">Parques</option>
            <option value="">Otros</option>
          </select>
        </div>
        <div>
          <label htmlFor="keywords">Palabras clave:</label>
          <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </div>
        <div>
          <label htmlFor="priceRange">Precio (1-4):</label>
          <input type="number" id="priceRange" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} min="1" max="4" />
        </div>
        <div>
          <label htmlFor="rating">Calificación mínima:</label>
          <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" step="0.1" />
        </div>
        <div>
          <label htmlFor="ambiance">Ambiente:</label>
          <select id="ambiance" value={ambiance} onChange={(e) => setAmbiance(e.target.value)}>
            <option value="tranquilo">Tranquilo</option>
            <option value="familiar">Familiar/Amistoso</option>
            <option value="romántico">Romántico</option>
          </select>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={lessKnown} onChange={() => setLessKnown(!lessKnown)} />
            Lugares menos conocidos
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" checked={nonTourist} onChange={() => setNonTourist(!nonTourist)} />
            Fuera de las zonas turísticas
          </label>
        </div>
        <button type="submit" disabled={loading}>Buscar</button>
      </form>
      {loading && <p>Buscando...</p>}
      {error && <p>{error}</p>}
      {packages.length > 0 ? (
        <div className="carousel-box">
          <Slider {...settings}>
            {packages.map(pkg => (
              <div key={pkg.id} style={{ padding: "10px" }}>
                <div className="package-card">
                  <img src={pkg.image} alt={pkg.title} className="package-image" />
                  <h3>{pkg.title}</h3>
                  <p><strong>Categoría:</strong> {pkg.category}</p>
                  <p><strong>Calificación:</strong> {pkg.rating}</p>
                  <p><strong>Ubicación:</strong> {pkg.location}</p>
                  <button className="view-more-btn" onClick={() => handleViewMoreClick(pkg)}>Ver más</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : null}
    </div>
  );
};

export default LugaresCarrusel;
