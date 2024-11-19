import React, { useState } from "react";
import "../estilos/FichasLugares.css";

const FichaLugares = ({ titulo, contenido, imagen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="contenedorFichaLugares"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundImage: `url(${imagen})` }} // Solo mantén el estilo de la imagen
    >
      <div
        className="gradienteSuperpuestoLugares"
        style={{ opacity: isHovered ? 0 : 1 }}
      ></div>
      <div
        className="gradienteSuperpuestoLugares"
        style={{ opacity: isHovered ? 1 : 0 }}
      ></div>
      <div className="contenedorContendioFichasLugares">
        <h1>{titulo}</h1>
        <p>{contenido}</p>
      </div>
    </div>
  );
};

export default FichaLugares;
