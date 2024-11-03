import React from 'react';

const placesData = [
  {
    name: 'La Isla de las Muñecas',
    imageUrl: 'https://example.com/isla-munecas.jpg', // Cambia esto por la URL real de la imagen
    category: 'Lugares recomendados',
  },
  {
    name: 'Prismas basálticos',
    imageUrl: 'https://example.com/prismas-basalticos.jpg', // Cambia esto por la URL real de la imagen
    category: 'Lugares recomendados',
  },
  {
    name: 'Islas Marietas',
    imageUrl: 'https://example.com/islas-marietas.jpg', // Cambia esto por la URL real de la imagen
    category: 'Lugares recomendados',
  },
  {
    name: 'Riviera Maya',
    imageUrl: 'https://example.com/riviera-maya.jpg', // Cambia esto por la URL real de la imagen
    category: 'Más visitados',
  },
  {
    name: 'Palenque',
    imageUrl: 'https://example.com/palenque.jpg', // Cambia esto por la URL real de la imagen
    category: 'Más visitados',
  },
  {
    name: 'Bellas Artes',
    imageUrl: 'https://example.com/bellas-artes.jpg', // Cambia esto por la URL real de la imagen
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
