
import React from "react";
import { Link } from "react-router-dom";

const FichaLugares = ({ lugares }) => {
  return (
    <section className="user-stories-section">
      <h2>Lugares Recomendados</h2>
      <div className="user-stories">
        {lugares.map((lugar, index) => (
          <Link to={`/Historias/${lugar.nombre}`} className="user-story" key={index}>
            <img src={lugar.imagen} alt={lugar.nombre} className="user-image" />
            <p>{lugar.nombre}</p>
          </Link>
        ))}
      </div>
      <Link to="/Historias" className="more-stories-link">
        Más lugares...
      </Link>
    </section>
  );
};

export default FichaLugares;
