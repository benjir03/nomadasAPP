import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../estilos/CarouselOptions.css';
import axios from 'axios';

const LugaresCarrusel = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [city, setCity] = useState(location.state?.ciudad || '');
  const [radius, setRadius] = useState('');
  const [category, setCategory] = useState(location.state?.categoria || '');
  const [keywords, setKeywords] = useState('');
  const [priceRange, setPriceRange] = useState(location.state?.presupuesto || '');
  const [rating, setRating] = useState(location.state?.calificacionMinima || '');
  const [ambiance, setAmbiance] = useState(location.state?.ambiente || '');
  const [lessKnown, setLessKnown] = useState(false);
  const [nonTourist, setNonTourist] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    setError(null);
    setPackages([]);

    const translatedPriceRange = translatePriceRange(priceRange);

    try {
      const url = `http://localhost:3002/search?city=${city}&category=${category}&radius=${radius}&priceRange=${translatedPriceRange}&rating=${rating}&keywords=${keywords}`;
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

  useEffect(() => {
    const {
      ciudad,
      presupuesto,
      categoria,
      calificacionMinima,
      ambiente,
    } = location.state || {};

    if (ciudad || presupuesto || categoria || calificacionMinima || ambiente) {
      setCity(ciudad || "");
      setPriceRange(presupuesto || "");
      setCategory(categoria || "");
      setRating(calificacionMinima || "");
      setAmbiance(ambiente || "");
    }
    // Realiza la búsqueda automáticamente al cargar la página si hay datos en location.state
    if (location.state) {
      handleSubmit();
    }
  }, [location.state]);

  const translatePriceRange = (value) => {
    if (value <= 300) return 1;
    if (value <= 600) return 2;
    if (value <= 1500) return 3;
    if (value <= 2500) return 4;
    return 0; // Para el valor inicial de 0
  };

  const getPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return 'https://via.placeholder.com/400';
    }
    return `http://localhost:3002/place-photo?photo_reference=${photoReference}`;
  };

  const handleViewMoreClick = async (pkg) => {
    try {
      const detailsUrl = `http://localhost:3002/place-details?place_id=${pkg.id}`;
      const detailsResponse = await axios.get(detailsUrl);

      const shortDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=100`;
      const shortDescResponse = await axios.get(shortDescUrl);

      const detailedDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=300`;
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

  return (
    <div className="carousel-container">
      <form onSubmit={handleSubmit}>
        <h2>Busca tu lugar favorito</h2>
        <div>
          <label htmlFor="city">Lugar:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="category">Categoría:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas las Categorias</option>
            <option value="art">Arte</option>
            <option value="shop">Compras</option>
            <option value="history">Cultura e Historia</option>
            <option value="sport">Deportes y Actividades Extremas</option>
            <option value="family">Familia y Niños</option>
            <option value="food">Gastronomia</option>
            <option value="nature">Naturaleza y Aventura</option>
            <option value="night">Vida Nocturna</option>
          </select>
        </div>
        <div>
          <label htmlFor="keywords">Palabras clave:</label>
          <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </div>
        <div>
          <label htmlFor="priceRange">Precio (0-4):</label>
          <input type="number" id="priceRange" value={translatePriceRange(priceRange)} readOnly />
        </div>
        <div>
          <label htmlFor="rating">Calificación mínima:</label>
          <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" step="0.1" />
        </div>
        <div>
          <label htmlFor="ambiance">Ambiente:</label>
          <select id="ambiance" value={ambiance} onChange={(e) => setAmbiance(e.target.value)}>
            <option value="tranquilo">Tranquilo</option>
            <option value="familiar">Familiar</option>
            <option value="romántico">Romántico</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>Buscar</button>
      </form>
      {loading && <p>Buscando...</p>}
      {error && <p>{error}</p>}
      {packages.length > 0 ? (
        <div className="list-container">
          {packages.map(pkg => (
            <div key={pkg.id} className="list-item">
              <img src={pkg.image} alt={pkg.title} className="package-image" />
              <h3>{pkg.title}</h3>
              <p><strong>Categoría:</strong> {pkg.category}</p>
              <p><strong>Calificación:</strong> {pkg.rating}</p>
              <p><strong>Ubicación:</strong> {pkg.location}</p>
              <button className="view-more-btn" onClick={() => handleViewMoreClick(pkg)}>Ver más</button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LugaresCarrusel;