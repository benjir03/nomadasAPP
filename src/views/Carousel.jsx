// App.js
import React from 'react';
import ImageCarousel from '../componentes/Carousel';
import fondo from "../imgs/apartamento.jpg"

const images = [
  { src: fondo, alt: 'Imagen 1', info: 'Información de la imagen 1' },
  { src: 'ruta/a/imagen2.jpg', alt: 'Imagen 2', info: 'Información de la imagen 2' },
  { src: 'ruta/a/imagen3.jpg', alt: 'Imagen 3', info: 'Información de la imagen 3' },
];

function App() {
  return (
    <div className="App">
      <h1>Mi Carrusel de Imágenes</h1>
      <ImageCarousel images={images} />
    </div>
  );
}

export default App;
