import React from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaHeart } from "react-icons/fa"; // Íconos de react-icons
import "../estilos/styActividad.css";
import BotonRegresar from "../componentes/BotonRegresar";

function ActividadPrincipal({ 
  titulo, 
  descripcion, 
  imagenFondo, 
  infoTitulo, 
  infoPrecio, 
  infoDuracion, 
  infoDescripcion, 
  mapaSrc, 
  mapaTitulo, 
  mapaUbicacion, 
  mapaLink 
}) {
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
          <Link className="botonAccionAct">
            <FaPlus style={{ marginRight: "8px" }} /> Agregar al plan
          </Link>
          <Link className="botonAccionAct">
            <FaHeart style={{ marginRight: "8px" }} /> Favoritos
          </Link>
        </div>
      </section>

      {/* Sección de información de la actividad */}
      <section className="actividadInfo">
        <div className="descripcion">
          <h2>{infoTitulo}</h2>
          <p>Precio: {infoPrecio}</p>
          <p>Duración: {infoDuracion}</p>
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
