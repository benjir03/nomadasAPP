// Carousel.js
import React, { useState } from 'react';
import '../styles/styCarousel.css';
import { images } from '../components/Carousel';

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="carousel-container">
      <div className="carousel slide">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            >
              <img
                className="d-block w-100 carousel-image"
                src={image.src}
                alt={image.alt}
                onClick={openModal}
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          role="button"
          onClick={goToPrevious}
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          role="button"
          onClick={goToNext}
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={images[currentIndex].src} alt={images[currentIndex].alt} className="modal-image" />
            <h2>{images[currentIndex].title}</h2>
            <p>{images[currentIndex].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
