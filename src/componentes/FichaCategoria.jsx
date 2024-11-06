import React, { useState } from "react";
import "../estilos/estiloFichaCategoria.css";

const FichaCategoria = ({titulo, contenido, imagen}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="contenedorFicha"
      style={{
        backgroundImage: `url(${imagen})`,
        height: "40vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative", // Necesario para posicionar el gradiente
        borderRadius: "25px", // Asegura que el borde redondeado se aplique al contenedor
        overflow: "hidden", // Oculta cualquier desbordamiento
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="gradienteSuperpuesto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top, #006d77, transparent)",
          opacity: isHovered ? 0 : 1, // Cambia la opacidad para la transición
          transition: "opacity 0.3s ease", // Transición suave de la opacidad
        }}
      ></div>
      {/* Capa del Gradiente */}
      <div
        className="gradienteSuperpuesto"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to top, #e19577, transparent)",
          opacity: isHovered ? 1 : 0, // Cambia la opacidad para la transición
          transition: "opacity 0.3s ease", // Transición suave de la opacidad
        }}
      ></div>

      <div className="contenedorContendioFichas">
        <h1>{titulo}</h1>
        <p>{contenido}</p>
      </div>
    </div>
  );
};

export default FichaCategoria;
