import React from 'react';
import "../estilos/styGustosPerfil.css";

const OpcionCard = ({ icono, texto, seleccionado, onClick }) => {
  return (
    <div
      className={`opcion-card ${seleccionado ? "selected" : ""}`}
      onClick={(e) => {
        e.stopPropagation(); // Evita que el evento se propague si es necesario
        onClick();
      }}
    >
      <div className="icono">{icono}</div>
      <button className="opcion-boton">{texto}</button>
    </div>
  );
};

export default OpcionCard;
