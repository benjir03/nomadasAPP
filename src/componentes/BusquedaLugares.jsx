import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../estilos/CarouselOptions.css';
import axios from 'axios';

const BusquedaLugares = ({ ciudad, keywords }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [city, setCity] = useState(location.state?.ciudad || ciudad || '');
  const [keywordsState, setKeywords] = useState(location.state?.keywords || keywords || '');
  const [radius, setRadius] = useState('');
  const [priceRange, setPriceRange] = useState(location.state?.presupuesto || '');
  const [rating, setRating] = useState(location.state?.calificacionMinima || '');
  const [lessKnown, setLessKnown] = useState(false);
  const [nonTourist, setNonTourist] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    setError(null);
    setPackages([]);
    setNoResults(false);

    try {
      let url = `http://localhost:3002/search?city=${city}&keywords=${keywordsState}&radius=${radius}`;

      if (priceRange && priceRange !== '4') {
        url += `&priceRange=${priceRange}`;
      }

      if (rating) {
        url += `&rating>=${rating}`;
      }

      const response = await axios.get(url);

      let fetchedPackages = response.data.results.map(result => ({
        id: result.place_id,
        title: result.name,
        category: result.type ? result.type[0] : 'Actividades', // Incluye la categoría devuelta por la API
        recommendedTime: "Tiempo recomendado no disponible",
        openingTime: result.opening_hours ? (result.opening_hours.open_now ? "Abierto ahora" : "Cerrado") : "Horario no disponible",
        price: result.price_level !== undefined ? mapPriceLevel(result.price_level) : "Precio no disponible",
        location: result.formatted_address || result.vicinity,
        image: getPhotoUrl(result.photo_reference),
        rating: result.rating || "Sin calificación",
        userRatingsTotal: result.user_ratings_total || 0
      }));

      if (fetchedPackages.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }

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

  const mapPriceLevel = (priceLevel) => {
    switch (priceLevel) {
      case 1:
        return '$';
      case 2:
        return '$$';
      case 3:
        return '$$$';
      case 4:
        return '$$$$';
      default:
        return 'Precio no disponible';
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [city, keywordsState, radius, priceRange, rating]);

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

      const placeData = { 
        ...pkg, 
        ...detailsResponse.data, 
        descripcion_corta: shortDescResponse.data.description,
        descripcion: detailedDescResponse.data.description
      };

      navigate('/actividad', { state: placeData });
    } catch (error) {
      console.error('Error al obtener detalles del lugar:', error);
    }
  };

  const renderStars = (rating) => {
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return <div className="stars">Calificación no disponible</div>;
    }
  
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
  
    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, index) => <span key={index} className="star full">★</span>)}
        {halfStars === 1 && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, index) => <span key={index} className="star empty">☆</span>)}
      </div>
    );
  };

  return (
    <div className="carousel-container">
      {loading && <p>Buscando...</p>}
      {error && <p>{error}</p>}
      {packages.length > 0 ? (
        <div className="list-container">
          {packages.map(pkg => (
            <div key={pkg.id} className="list-item">
              <img src={pkg.image} alt={pkg.title} className="package-image" />
              <div className="package-info">
                <h3>{pkg.title}</h3>
                <p><strong>Calificación:</strong> {renderStars(pkg.rating)}</p>
                <p><strong>Ubicación:</strong> {pkg.location}</p>
                <button className="view-more-btn" onClick={() => handleViewMoreClick(pkg)}>Ver más</button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {noResults && <h1>No se encontraron resultados para tu búsqueda :(</h1>}
    </div>
  );
};

export default BusquedaLugares;