import React from "react";
import { Link } from "react-router-dom";
import "../estilos/FichasLugares.css"; // Importa el archivo CSS

const FichaLugares = ({ lugares }) => {
  return (
    <section className="lugares-recomendados-section">
      <h2>Lugares Recomendados</h2>
      <div className="lugares-recomendados">
        {lugares.map((lugar, index) => (
          <Link to={`/Historias/${lugar.nombre}`} className="lugar-recomendado" key={index}>
            <img src={lugar.imagen} alt={lugar.nombre} className="imagen-lugar" />
            <p>{lugar.nombre}</p>
          </Link>
        ))}
      </div>
      <Link to="/Historias" className="ver-mas-lugares-link">
        Más lugares...
      </Link>
    </section>
  );
};

export default FichaLugares;
