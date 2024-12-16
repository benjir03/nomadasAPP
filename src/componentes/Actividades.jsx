import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaHeart } from "react-icons/fa";
import "../estilos/styActividad.css";
import axios from "axios";
import BotonRegresar from "../componentes/BotonRegresar";
import Alertas from "../componentes/Alertas";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <>
      {"★".repeat(fullStars).split("").map((star, index) => (
        <span key={index} className="star">{star}</span>
      ))}
      {halfStar === 1 && <span className="star">☆</span>}
      {"☆".repeat(emptyStars).split("").map((star, index) => (
        <span key={index} className="star">{star}</span>
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
  infoCalificacion
}) {
  const [nombre_actividad, setNombre] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  
  const handleAddPlan = async () => {
    setNombre(titulo);
    const URI = "http://localhost:3001/plan/insertarLugar";
    const requestData = {
      nombre_actividad: titulo,
      imagen_actividad: imagenFondo,
      ID_google: id,
      controlador: 1,
    };
    try {
      const response = await axios.post(URI, requestData, { withCredentials: true });
      console.log(response.data.message);
      console.log(requestData);
      setAlertMessage("¡Actividad agregada al plan!");
      setShowAlert(true);
      setTimeout(() => navigate("/RevisarPlan"), 1500);
    } catch (error) {
      console.error("Error al agregar al plan:", error);
      setAlertMessage("Hubo un problema al agregar la actividad al plan.");
      setShowAlert(true);
    }
  };
  
  const handleNewPlan = async () => {
    setNombre(titulo);
    const URI = "http://localhost:3001/plan/insertarLugar";
    const requestData = {
      nombre_actividad: titulo,
      imagen_actividad: imagenFondo,
      ID_google: id,
      controlador: 2,
    };
    try {
      const response = await axios.post(URI, requestData, { withCredentials: true });
      console.log(response.data.message);
      console.log(requestData);
      setAlertMessage("¡Actividad agregada al plan!");
      setShowAlert(true);
      setTimeout(() => navigate("/RevisarPlan"), 1500);
    } catch (error) {
      console.error("Error al agregar al plan:", error);
      setAlertMessage("Hubo un problema al agregar la actividad al plan.");
      setShowAlert(true);
    }
  };
  
  const handleAddToFavorites = () => {
    setAlertMessage("¡Actividad agregada a favoritos!");
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
    setAlertMessage("");
  };

  return (
    <div>
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${imagenFondo})`,
          height: `88vh`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
          <BotonRegresar />
        </div>

        <div className="contenedorDos">
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
          <button
            className="botonAccionAct"
            onClick={() => setShowDialog(true)}
            style={{
              display: "flex",
              alignItems: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "inherit",
            }}
          >
            <FaPlus style={{ marginRight: "8px" }} /> Agregar al plan
          </button>
          
          {/* Componente de confirmación */}
          {showDialog && (
            <Alertas
              message="¿Estás seguro de que deseas agregar esto al plan?"
              onConfirm={handleNewPlan}
              onCancel={handleAddPlan}
            />
          )}
          <Link className="botonAccionAct" onClick={handleAddToFavorites}>
            <FaHeart style={{ marginRight: "8px" }} /> Favoritos
          </Link>
        </div>
      </section>

      <section className="actividadInfo">
        <div className="descripcion">
          <h2>{infoTitulo}</h2>
          <p><strong>Precio: </strong>{infoPrecio}</p>
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
