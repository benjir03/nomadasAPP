import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/styCarousel.css'; // Asegúrate de importar el CSS

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    // Asegúrate de que hay imágenes
    if (!images || images.length === 0) {
        return <div>No hay imágenes para mostrar.</div>;
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleImageClick = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="carousel">
            <div className="carousel-images">
                <AnimatePresence>
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex].src}
                        alt={images[currentIndex].alt}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleImageClick}
                    />
                </AnimatePresence>
            </div>
            <div className="slide_direction">
                <button className="left" onClick={handlePrevious}>❮</button>
                <button className="right" onClick={handleNext}>❯</button>
            </div>

            {isOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={images[currentIndex].src} alt={images[currentIndex].alt} />
                        <p>{images[currentIndex].info}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;