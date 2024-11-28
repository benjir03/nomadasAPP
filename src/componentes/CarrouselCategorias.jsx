import React, { useState } from "react";
import "../estilos/carrouselCategorias.css";
import FichaCategoria from "./FichaCategoria";

const CarrouselCategorias = ({ categorias }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categorias.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === categorias.length - 1 ? 0 : prevIndex + 1
    );
  };

  const visibleCategorias = [
    categorias[currentIndex],
    categorias[(currentIndex + 1) % categorias.length],
    categorias[(currentIndex + 2) % categorias.length],
  ];

  return (
    <div className="carrousel-container">
      <button className="carrousel-button left" onClick={handlePrevClick}>
        &#8249;
      </button>
      <div className="carrousel-slide">
        {visibleCategorias.map((categoria, index) => (
          <div key={index} className="carrousel-item">
            <FichaCategoria
              titulo={categoria.titulo}
              contenido={categoria.contenido}
              imagen={categoria.imagen}
              categoria={categoria.categoria}
            />
          </div>
        ))}
      </div>
      <button className="carrousel-button right" onClick={handleNextClick}>
        &#8250;
      </button>
    </div>
  );
};

export default CarrouselCategorias;
