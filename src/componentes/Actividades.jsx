// ActividadPrincipal.js
import React from "react";
import { Link } from "react-router-dom";
import "../estilos/styActividad.css";

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
        <div className="contenedorDos">
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
          <Link className="botonAccion2">Agregar al plan</Link>
        </div>
      </section>

      {/* Sección de información de la actividad */}
      <section className="actividadInfo">
        <div className="descripcion">
          <h2>{infoTitulo}</h2>
          <p>Precio {infoPrecio}</p>
          <p>Duración {infoDuracion}</p>
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
          <Link to={mapaLink}>Ver en Google Maps</Link>
        </div>
      </section>
    </div>
  );
}

export default ActividadPrincipal;
