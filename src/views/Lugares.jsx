import React from 'react';
import { historiaImage, islamuñecas, bellasartes } from "../imgs/ArchivoImgs";

const placesData = [
  {
    name: 'La Isla de las Muñecas',
    imageUrl: islamuñecas, // Cambia esto por la URL real de la imagen
    category: 'Lugares recomendados',
  },
  {
    name: 'Prismas basálticos',
    imageUrl: historiaImage, // Cambia esto por la URL real de la imagen
    category: 'Lugares recomendados',
  },
  {
    name: 'Islas Marietas',
    imageUrl: islamuñecas, // Cambia esto por la URL real de la imagen
    category: 'Lugares recomendados',
  },
  {
    name: 'Riviera Maya',
    imageUrl: historiaImage, // Cambia esto por la URL real de la imagen
    category: 'Más visitados',
  },
  {
    name: 'Palenque',
    imageUrl: historiaImage, // Cambia esto por la URL real de la imagen
    category: 'Más visitados',
  },
  {
    name: 'Bellas Artes',
    imageUrl: bellasartes, // Cambia esto por la URL real de la imagen
    category: 'Más visitados',
  },
];

function PlacesBlog() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Lugares</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2em' }}>¡Explora lugares fuera de lo común!</p>
      
      {/* Lugares recomendados */}
      <h2>Lugares recomendados</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '15px' }}>
        {placesData
          .filter(place => place.category === 'Lugares recomendados')
          .map((place, index) => (
            <div key={index} style={{ width: '200px', textAlign: 'center' }}>
              <img
                src={place.imageUrl}
                alt={place.name}
                style={{ width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <p>{place.name}</p>
            </div>
          ))}
      </div>

      {/* Más visitados */}
      <h2>Más visitados</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '15px' }}>
        {placesData
          .filter(place => place.category === 'Más visitados')
          .map((place, index) => (
            <div key={index} style={{ width: '200px', textAlign: 'center' }}>
              <img
                src={place.imageUrl}
                alt={place.name}
                style={{ width: '100%', height: '150px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <p>{place.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesBlog;