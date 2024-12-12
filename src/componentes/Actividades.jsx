import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaHeart } from "react-icons/fa"; // Íconos de react-icons
import "../estilos/styActividad.css";
import axios from "axios";
import BotonRegresar from "../componentes/BotonRegresar";

// Función para renderizar las estrellas
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);  // Cantidad de estrellas completas
  const halfStar = rating % 1 !== 0 ? 1 : 0;  // Si tiene decimales, agrega media estrella
  const emptyStars = 5 - fullStars - halfStar;  // Estrellas vacías


  return (
    <>
      {'★'.repeat(fullStars).split('').map((star, index) => (
        <span key={index} className="star">{star}</span>  // Estrellas completas
      ))}
      {halfStar === 1 && <span className="star">☆</span>}  {/* Media estrella si hay decimales */}
      {'☆'.repeat(emptyStars).split('').map((star, index) => (
        <span key={index} className="star">{star}</span>  // Estrellas vacías
      ))}
    </>
  );
};

function ActividadPrincipal({ 
  titulo,
  id, 
  descripcion, 
  imagenFondo, 
  infoTitulo, 
  infoPrecio, 
  infoDuracion, 
  infoDescripcion, 
  mapaSrc, 
  mapaTitulo, 
  mapaUbicacion, 
  mapaLink,
  infoCalificacion // Agregar la calificación aquí
}) {
  const [nombre_actividad, setNombre] = useState("");
  const navigate = useNavigate();
  // Función para manejar el click en "Agregar al plan"
  const handleAddToPlan = async () => {
    setNombre(titulo);
    const URI = "http://localhost:3001/plan/insertarLugar";
    const requestData = {
      nombre_actividad: titulo,
      imagen_actividad: imagenFondo,
      ID_google: id,
    }
  try{
    const response = await axios.post(
      URI, requestData, { withCredentials: true }
    );
    console.log(response.data.message);
    console.log(requestData);
    alert("¡Actividad agregada al plan correctamente!");
    navigate('/RevisarPlan')
  }catch(error){
    console.error('Error al agregar al plan:', error);
    alert("Hubo un problema al agregar la actividad al plan.");
  }
  };

  // Función para manejar el click en "Favoritos"
  const handleAddToFavorites = () => {
    alert("¡Actividad agregada a favoritos!");
  };

  return (
    <div>
      {/* Sección de bienvenida */}
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${imagenFondo})`,
          height: `88vh`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Botón de regresar en la esquina superior izquierda */}
        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
          <BotonRegresar />
        </div>

        <div className="contenedorDos">
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
          <Link 
            className="botonAccionAct" 
            onClick={handleAddToPlan}  // Agregar acción de click aquí
          >
            <FaPlus style={{ marginRight: "8px" }} /> Agregar al plan
          </Link>
          <Link 
            className="botonAccionAct" 
            onClick={handleAddToFavorites}  // Agregar acción de click aquí
          >
            <FaHeart style={{ marginRight: "8px" }} /> Favoritos
          </Link>
        </div>
      </section>

      {/* Sección de información de la actividad */}
      <section className="actividadInfo">
        <div className="descripcion">
          <h2>{infoTitulo}</h2>
          <p><strong>Precio: </strong>{infoPrecio}</p>
          {/* Mostrar la calificación en estrellas */}
          <p><strong>Calificación: </strong>{renderStars(infoCalificacion) || "No disponible"}</p>
          <p>{infoDescripcion}</p>
        </div>
        <div className="mapa">
          <iframe
            title={mapaTitulo}
            src={mapaSrc}
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <p>{mapaUbicacion}</p>
          <Link to={mapaLink}>Web del lugar</Link>
        </div>
      </section>
    </div>
  );
}

export default ActividadPrincipal;
