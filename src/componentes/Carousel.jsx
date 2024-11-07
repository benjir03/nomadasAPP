import React, { useState, useEffect } from 'react';
import '../estilos/styCarousel.css'; // Ensure your CSS file supports slide transitions

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // To control the sliding effect
  const [isPaused, setIsPaused] = useState(false); // To handle pausing on click
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility

  // Function to move to the next image
  const handleNext = () => {
    setIsSliding(true); // Start sliding effect
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsSliding(false); // End sliding effect
    }, 500); // Duration of the slide effect
  };

  const handlePrev = () => {
    setIsSliding(true); // Start sliding effect
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setIsSliding(false); // End sliding effect
    }, 500); // Duration of the slide effect
  };

  // Automatically switch images
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(handleNext, 3000); // Change image every 3 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isPaused, images.length]);

  // Function to toggle modal
  const toggleModal = () => {
    setIsPaused(!isModalOpen); // Pause when opening, resume when closing
    setIsModalOpen(!isModalOpen);
  };

  // Pause the carousel on image click and open modal
  const handleImageClick = () => {
    setIsPaused(true); // Pause the carousel
    toggleModal(); // Open modal
  };

  return (
    <div className="carousel-container">
      <div className={`carousel ${isSliding ? 'sliding' : ''}`}>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="carousel-image"
          onClick={handleImageClick} // Pause on click and open modal
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
