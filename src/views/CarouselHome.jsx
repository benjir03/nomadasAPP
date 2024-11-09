import React, {useState, useEffect} from "react";
import axios from "axios";
import "../estilos/styCarouselHome.css";
import {motion, AnimatePresence} from "framer-motion";
import {villa, apartamento, resort} from "../imgs/ArchivoImgs";

const CarouselHome = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('left');
    const [isPaused, setIsPaused] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [CarTab, setCarTab] = useState([]);
    
    useEffect(() => {
        const fetchCarousel = async () => {
            try {
                const response = await axios.get("http://localhost:3001/carousel/datos");
                setCarTab(response.data);
                } catch (error) {
                    console.error("Error al obtener datos del Carousel:", error);
                }
        };
        fetchCarousel();
    }, []);
    
    const images = require.context('../imgs');
    const getImage = (imagen) => {
        try {
            return images(`/${imagen}`);
        } catch (error) {
            console.error("Error al cargar la imagen:", error);
            return null;
        };
    }
    const slideVariants = {
        hiddenRight: {
          x: "100%",
          opacity: 0,
        },
        hiddenLeft: {
          x: "-100%",
          opacity: 0,
        },
        visible: {
          x: "0",
          opacity: 1,
          transition: {
            duration: 2,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.8,
          transition: {
            duration: 0.5,
          },
        },
    };
    
    const handleNext = () => {
        setDirection("right");
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 === CarTab[currentIndex].imagen.length ? 0 : prevIndex + 1
        );
    };
    
    const handlePrevious = () => {
        setDirection("left");
    
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? CarTab[currentIndex].imagen.length - 1 : prevIndex - 1
        );
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
    
    if (!CarTab.length || currentIndex >= CarTab.length) {
        return null; // Render nothing if CarTab is empty or currentIndex is out of bounds
    }
    
    return (
        <div className="carousel">
            <AnimatePresence>
                <motion.img
                    key={currentIndex}
                    src={getImage(CarTab[currentIndex].imagen)}
                    variants={slideVariants}
                    initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                    animate="visible"
                    exit="exit"
                    onClick={handleImageClick}
                />
            </AnimatePresence>
        
            <div className="slide_direction">
                <div className="left" onClick={handlePrevious}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="20"
                    >
                        <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
                    </svg>
                </div>
                <div className="right" onClick={handleNext}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="20"
                        viewBox="0 96 960 960"
                        width="20"
                    >
                        <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
                    </svg>
                </div>
            </div>
            {isModalOpen && (
                <div className="modal" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img
                        src={`${CarTab[currentIndex].imagen}`}
                        className="modal-image"
                        />
                        <p className="modal-info">{`${CarTab[currentIndex].titulo}`}</p>
                        <p className="modal-info">{`${CarTab[currentIndex].descripcion}`}</p>
                    </div>
                </div>
            )}
        </div>
        
    );
}
export default CarouselHome;