import React from 'react';
import '../estilos/actividad.css';

function Actividad({ title, description, imageUrl }) {
  return (
    <div
      className="actividad-card"
      style={{ backgroundImage: `url(${imageUrl})` }} // Añade la imagen como fondo
    >
      <div className="overlay">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Actividad;
