import React from 'react';
import Carousel from '../components/Carousel';
import logo from "../imgs/LogoNoP.jpeg";

const App = () => {
    const images = [
        {
            src:logo,
            alt: 'Imagen 1',
            info: 'Descripción de la imagen 1'
        },
        {
            src: 'https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg',
            alt: 'Imagen 2',
            info: 'Descripción de la imagen 2'
        },
        {
            src: 'https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg',
            alt: 'Imagen 3',
            info: 'Descripción de la imagen 3'
        },
        // Agrega más imágenes según sea necesario
    ];

    return (
        <div className="App">
            <Carousel images={images} />
        </div>
    );
};

export default App;