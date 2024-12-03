import React, { useState, useEffect } from "react";
import "../estilos/carrouselCategorias.css";
import FichaCategoria from "./FichaCategoria";

const CarrouselCategorias = ({ categorias }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Ajusta el número de fichas visibles en función del tamaño de la pantalla
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth <= 600) {
        setVisibleCount(1); // Solo una ficha visible en pantallas pequeñas
      } else if (window.innerWidth <= 900) {
        setVisibleCount(2); // Dos fichas visibles en pantallas medianas
      } else {
        setVisibleCount(3); // Tres fichas visibles en pantallas grandes
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Agrupa las categorías según el número de fichas visibles
  const groupedCategorias = [];
  for (let i = 0; i < categorias.length; i += visibleCount) {
    groupedCategorias.push(categorias.slice(i, i + visibleCount));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedCategorias.length);
    }, 3000); // Cambia cada 3 segundos
    return () => clearInterval(interval);
  }, [groupedCategorias.length]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedCategorias.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + groupedCategorias.length) % groupedCategorias.length);
  };

  return (
    <div className="carrousel">
      {/* Botón izquierdo */}
      <button className="carrousel-nav carrousel-nav-left" onClick={handlePrev}>
        &#8592;
      </button>

      <div
        className="carrousel-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {groupedCategorias.map((group, index) => (
          <div
            key={index}
            className={`carrousel-item ${group.length === 2 ? 'centro' : ''}`}
          >
            {group.map((categoria, idx) => (
              <FichaCategoria
                key={idx}
                titulo={categoria.titulo}
                contenido={categoria.contenido}
                imagen={categoria.imagen}
                categoria={categoria.categoria}
                className="ficha-en-carrousel"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Botón derecho */}
      <button className="carrousel-nav carrousel-nav-right" onClick={handleNext}>
        &#8594;
      </button>

      <div className="carrousel-indicators">
        {groupedCategorias.map((_, index) => (
          <div
            key={index}
            className={`carrousel-indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => handleIndicatorClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarrouselCategorias;
