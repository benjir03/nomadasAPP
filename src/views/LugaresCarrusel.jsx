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
  const [noResults, setNoResults] = useState(false);  // Agregar estado para verificar resultados vacíos


  const handleSubmit = async (event) => {

    setLoading(true);
    setError(null);
    setPackages([]);
    setNoResults(false);  // Reiniciar el estado de noResults al inicio de la búsqueda
  
    try {
      // Comenzamos a construir la URL
    let url = `http://localhost:3002/search?city=${city}&category=${category}&radius=${radius}&keywords=${keywords}`;

    // Verificar si la categoría seleccionada NO es 'museum' para incluir el precio
    if (category !== 'museum') {
      // Si el precio no es 4, lo añadimos a la URL
      if (priceRange && priceRange !== '4') {
        url += `&priceRange=${priceRange}`;
      }
    }

    // Verificar si hay calificación seleccionada
    if (rating) {
      if (rating === '4') {
        url += ``; // Si rating es 4, incluir todos los ratings
      } else {
        url += `&rating>=${rating}`;
      }
    }
  
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

      // Si no hay resultados, actualizamos el estado para mostrar el mensaje
      if (fetchedPackages.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }


  
      // Ordenar los lugares por calificación, en orden descendente (de mayor a menor)
      fetchedPackages.sort((a, b) => b.rating - a.rating);
  
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
  

 // useEffect para inicializar los filtros desde location.state
 useEffect(() => {
  const {
    ciudad,
    presupuesto,
    categoria,
    calificacionMinima,
    ambiente,
  } = location.state || {};

  if (ciudad || presupuesto || categoria || calificacionMinima || ambiente) {
    setCity(ciudad || '');
    setPriceRange(presupuesto || '');
    setCategory(categoria || '');
    setRating(calificacionMinima || '');
    setAmbiance(ambiente || '');
  }
}, [location.state]);

// useEffect para realizar la búsqueda cuando los filtros cambien
useEffect(() => {
  if (city || category || priceRange || rating || keywords || ambiance) {
    handleSubmit();
  }
}, [city, category, priceRange, rating, keywords, ambiance]);

  const translatePriceRange = (value) => {
    if (value <= 200) return 1;
    if (value <= 800) return 2;
    if (value <= 2600) return 3;
    if (value <= 3000) return 4;
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
            <option value="all">Todas las Categorias</option>
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
      {noResults && <h1>No se encontraron resultados para tu búsqueda:(</h1>}
    </div>
  );
};

export default LugaresCarrusel;