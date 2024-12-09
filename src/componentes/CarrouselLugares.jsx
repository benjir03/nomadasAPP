import React, { useState, useEffect } from "react";
import "../estilos/carrouselLugares.css";
import FichaLugares from "./FichaLugares";
import { Link } from 'react-router-dom';

const CarrouselLugares = ({ lugares }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fichasPorBloque, setFichasPorBloque] = useState(4); // Predeterminado para pantallas grandes
  const [groupedLugares, setGroupedLugares] = useState([]);

  // Actualiza el número de fichas visibles según el ancho de la pantalla
  const updateBloques = () => {
    const width = window.innerWidth;

    let fichasVisibles;
    if (width <= 600) {
      fichasVisibles = 1;
    } else if (width <= 900) {
      fichasVisibles = 2;
    } else if (width <= 1200) {
      fichasVisibles = 3;
    } else {
      fichasVisibles = 4;
    }

    setFichasPorBloque(fichasVisibles);

    // Reagrupa los lugares
    const newGroupedLugares = [];
    for (let i = 0; i < lugares.length; i += fichasVisibles) {
      newGroupedLugares.push(lugares.slice(i, i + fichasVisibles));
    }
    setGroupedLugares(newGroupedLugares);
  };

  // Ejecuta la función al montar y cuando cambia el tamaño de la ventana
  useEffect(() => {
    updateBloques();
    window.addEventListener("resize", updateBloques);
    return () => window.removeEventListener("resize", updateBloques);
  }, [lugares]);

  // Cambia automáticamente el índice del carrusel cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedLugares.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [groupedLugares]);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < groupedLugares.length) {
      setCurrentIndex(newIndex);
    }
  };
  
  const handlePrev = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="carrousel-lugares">
    {/* Botón izquierdo */}
    <button className="carrousel-nav carrousel-nav-left" onClick={handlePrev}>
      &#8592;
    </button>

    <div
      className="carrousel-container"
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
      {groupedLugares.map((group, index) => (
        <div key={index} className="carrousel-group">
          <div
            className={`carrousel-item ${group.length === 2 ? "centro" : ""}`}
          >
            {group.map((lugar, idx) => (
              <Link to={`/lugares/${lugar.id}`}> {/* Enlace a la página de detalle */}
                <FichaLugares
                  titulo={lugar.titulo}
                  contenido={lugar.contenido}
                  imagen={lugar.imagen}
                    className="ficha-en-carrousel"
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Botón derecho */}
    <button className="carrousel-nav carrousel-nav-right" onClick={handleNext}>
      &#8594;
    </button>

    {/* Indicadores */}
    <div className="carrousel-indicators">
      {groupedLugares.map((_, index) => (
        <div
          key={index}
          className={`carrousel-indicator ${index === currentIndex ? "active" : ""}`}
          onClick={() => handleIndicatorClick(index)}
        ></div>
      ))}
    </div>
  </div>
  );
};

export default CarrouselLugares;
