import React from 'react';
import './TopPlaces.css'; // Si tienes estilos específicos para TopPlaces

const TopPlaces = () => {
  return (
    <div className="top-places">
      <h2>Top places in Mexico City</h2>
      <div className="places">
        <div className="place">
          <img src="museoantro.jpg" alt="Museo Nacional de Antropología" className="imagess" />
          <p>Museo Nacional de Antropología</p>
          <p>El museo más grande y visitado de México.</p>
          <a href="#">Más...</a>
        </div>
        {/* Repite para otros lugares */}
      </div>
    </div>
  );
};

export default TopPlaces;
