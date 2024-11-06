import React, { useState } from "react";
import "../estilos/estiloFichaCategoria.css";
import fondiCategorias from "../imgs/Biblioteca.jpg";

const FichaCategoria = () => {
  // Declarar el estado isHovered
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="contenedorFicha"
      style={{
        background: isHovered
          ? `linear-gradient(to top, #e19577, transparent), url(${fondiCategorias})`
          : `url(${fondiCategorias})`,
        height: "40vh",
        backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
        backgroundPosition: "center", // Centra la imagen
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
        transition: "background 0.3s ease", // Transición suave
      }}
      onMouseEnter={() => setIsHovered(true)} // Activa el hover
      onMouseLeave={() => setIsHovered(false)} // Desactiva el hover
    >
      <div className="contenedorContendioFichas">
        <h1>Nombre chido</h1>
        <p>Info importante del lugar.</p>
      </div>
    </div>
  );
};

export default FichaCategoria;
