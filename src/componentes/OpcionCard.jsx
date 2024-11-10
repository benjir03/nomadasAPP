import React from 'react';
import "../estilos/styGustosPerfil.css";

const OpcionCard = ({ icono, texto, seleccionado, onClick }) => {
  return (
    <div
      className={`opcion-card ${seleccionado ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="icono">{icono}</div>
      <button className="opcion-boton">{texto}</button>
    </div>
  );
};

export default OpcionCard;
