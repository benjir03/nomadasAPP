// ImageCarousel.js
import React, { useState } from 'react';
import '../estilos/styCarousel.css'; // Archivo CSS opcional para estilos

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para cambiar la imagen
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button onClick={handlePrev} className="carousel-button">
          ‹
        </button>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="carousel-image"
          onClick={toggleModal}
        />
        <button onClick={handleNext} className="carousel-button">
          ›
        </button>
      </div>

      {isModalOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="modal-image"
            />
            <p className="modal-info">{images[currentIndex].info}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
