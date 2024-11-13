
import React from "react";
import { Link } from "react-router-dom";

const FichaOpinion = ({ usuarios }) => {
  return (
    <section className="user-stories-section">
      <h2>Comparte tu siguiente aventura.</h2>
      <div className="user-stories">
        {usuarios.map((usuario, index) => (
          <Link
            to={`/Historias/${usuario.nombre}`}
            className="user-story"
            key={index}
          >
            <img
              src={usuario.imagen}
              alt={usuario.nombre}
              className="user-image"
            />
            <p>@{usuario.nombre}</p>
          </Link>
        ))}
      </div>
      <Link to="/Historias" className="more-stories-link">
        Más historias...
      </Link>
    </section>
  );
};

export default FichaOpinion;
