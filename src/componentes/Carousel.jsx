import React, { useState, useEffect } from 'react';
import '../estilos/styCarousel.css';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const handleNext = () => {
    setIsSliding(true); 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsSliding(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setIsSliding(false);
    }, 500); 
  };

  
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(handleNext, 3000); 
      return () => clearInterval(interval);
    }
  }, [isPaused, images.length]);

  
  const toggleModal = () => {
    setIsPaused(!isModalOpen);
    setIsModalOpen(!isModalOpen);
  };

  const handleImageClick = () => {
    setIsPaused(true);
    toggleModal(); 
  };

  return (
    <div className="carousel-container">
      <div className={`carousel ${isSliding ? 'sliding' : ''}`}>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="carousel-image"
          onClick={handleImageClick}
        />
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
