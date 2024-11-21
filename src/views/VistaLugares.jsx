import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../estilos/CarouselOptions.css";

const VistaLugares = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lugares, setLugares] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return "https://via.placeholder.com/400";
    }
    return `http://localhost:3002/place-photo?photo_reference=${photoReference}`;
  };

  const fetchLugares = async () => {
    setLoading(true);
    setError(null);
    setLugares([]);

    try {
      const { categoria, ciudad } = location.state; // Recibe categoría y ciudad desde el estado
      const url = `http://localhost:3002/search?city=${ciudad}&category=${categoria.join(
        ","
      )}&radius=5000`;
      const response = await axios.get(url);

      const fetchedLugares = response.data.results.map((result) => ({
        id: result.place_id,
        title: result.name,
        location: result.formatted_address || result.vicinity,
        image: getPhotoUrl(result.photo_reference),
        rating: result.rating || "Sin calificación",
        userRatingsTotal: result.user_ratings_total || 0,
        openingTime: result.opening_hours
          ? result.opening_hours.open_now
            ? "Abierto ahora"
            : "Cerrado"
          : "Horario no disponible",
      }));

      setLugares(fetchedLugares);
    } catch (error) {
      setError("Ocurrió un error al obtener los lugares.");
      console.error("Error al realizar la búsqueda:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMoreClick = async (lugar) => {
    try {
      const detailsUrl = `http://localhost:3002/place-details?place_id=${lugar.id}`;
      const detailsResponse = await axios.get(detailsUrl);

      const shortDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(
        lugar.title
      )}&exchars=100`;
      const shortDescResponse = await axios.get(shortDescUrl);

      const detailedDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(
        lugar.title
      )}&exchars=300`;
      const detailedDescResponse = await axios.get(detailedDescUrl);

      const placeData = {
        ...lugar,
        ...detailsResponse.data,
        descripcion_corta: shortDescResponse.data.description,
        descripcion: detailedDescResponse.data.description,
      };

      navigate("/actividad", { state: placeData });
    } catch (error) {
      console.error("Error al obtener detalles del lugar:", error);
    }
  };

  useEffect(() => {
    fetchLugares();
  }, []);

  return (
    <div className="carousel-container">
      <h2>Lugares de interés</h2>
      {loading && <p>Cargando lugares...</p>}
      {error && <p>{error}</p>}
      {lugares.length > 0 ? (
        <div className="list-container">
          {lugares.map((lugar) => (
            <div key={lugar.id} className="list-item">
              <img
                src={lugar.image}
                alt={lugar.title}
                className="package-image"
              />
              <h3>{lugar.title}</h3>
              <p>
                <strong>Calificación:</strong> {lugar.rating}
              </p>
              <p>
                <strong>Ubicación:</strong> {lugar.location}
              </p>
              <p>
                <strong>Estado:</strong> {lugar.openingTime}
              </p>
              <button
                className="view-more-btn"
                onClick={() => handleViewMoreClick(lugar)}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No se encontraron lugares para esta búsqueda.</p>
      )}
    </div>
  );
};

export default VistaLugares;
