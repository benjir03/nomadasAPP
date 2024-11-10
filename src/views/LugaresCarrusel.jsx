import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../estilos/styCarousel.css';
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
  const [city, setCity] = useState('');
  const [radius, setRadius] = useState('');
  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [rating, setRating] = useState('');
  const [ambiance, setAmbiance] = useState('');
  const [lessKnown, setLessKnown] = useState(false);
  const [nonTourist, setNonTourist] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPackage, setCurrentPackage] = useState(null);

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
      const response = await axios.get(detailsUrl);
      setCurrentPackage({ ...pkg, ...response.data });
      openPopup({ ...pkg, ...response.data });
    } catch (error) {
      console.error('Error al obtener detalles del lugar:', error);
    }
  };

  const openPopup = (pkg) => {
    const popup = window.open('', 'Detalles del Lugar', 'width=800,height=800');
    popup.document.write(`
      <html>
        <head>
          <title>${pkg.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            img { max-width: 100%; height: auto; border-radius: 10px; margin-bottom: 20px; }
            h3 { margin-top: 0; }
            .close-btn { background-color: #007bff; color: white; padding: 10px; border: none; border-radius: 5px; cursor: pointer; }
          </style>
        </head>
        <body>
          <img src="${pkg.image}" alt="Imagen ampliada" />
          <h3>${pkg.title}</h3>
          <p><strong>Dirección:</strong> ${pkg.formatted_address || 'No disponible'}</p>
          <p><strong>Precio:</strong> ${pkg.price || 'No disponible'}</p>
          <p><strong>Web:</strong> ${pkg.website || 'No disponible'}</p>
          <p><strong>Descripción:</strong> ${pkg.description || 'No disponible'}</p>
          <p><strong>Categoría:</strong> ${pkg.category || 'No disponible'}</p>
          <p><strong>Horario:</strong> ${pkg.openingTime || 'No disponible'}</p>
          <p><strong>Rating:</strong> ${pkg.rating || 'No disponible'}</p>
          <p><strong>Reseñas:</strong></p>
          ${pkg.reviews && pkg.reviews.length > 0 ? `
            <ul>
              ${pkg.reviews.map(review => `<li><strong>${review.author_name}:</strong> ${review.text}</li>`).join('')}
            </ul>
          ` : '<p>No hay reseñas disponibles.</p>'}
          <h3>Imágenes adicionales:</h3>
          ${pkg.photos && pkg.photos.length > 0 ? `
            <div class="photos-container">
              ${pkg.photos.map(photo => `<img src="${getPhotoUrl(photo.photo_reference)}" alt="Imagen adicional" style="margin-bottom: 10px;" />`).join('')}
            </div>
          ` : '<p>No hay imágenes adicionales disponibles.</p>'}
          <div class="map-container">
            <iframe
              title="Ubicación del lugar"
              width="100%"
              height="300"
              frameBorder="0"
              style="border: 0"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCEj5HsivhghX7r_o31Z9FKo7HaQblM6WU&q=place_id:${pkg.id}"
              allowFullScreen>
            </iframe>
          </div>
          <button class="close-btn" onclick="window.close()">Cerrar</button>
        </body>
      </html>
    `);
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
      <h2>Busca tu lugar favorito</h2>
      <form onSubmit={handleSubmit}>
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
            <option value="animado">Animado</option>
            <option value="familiar">Familiar</option>
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
      ) : (
        <p>No hay imágenes disponibles para mostrar</p>
      )}
    </div>
  );
};

export default LugaresCarrusel;

