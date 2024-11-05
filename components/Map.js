import React from 'react';
import './Map.css'; // Si tienes estilos específicos para Map

const Map = () => {
  return (
    <div className="map">
      <img src="mapaba.jpg" alt="Mapa de Bellas Artes" className="bellasartes-imagetwo" />
      <div className="map-info">
        <p>Palacio de Bellas Artes</p>
        <p>Ciudad de México, México</p>
        <p>19.4353, -99.1411</p>
        <p><a href="#">Ver en Google Maps</a> | <a href="#">Reservar hotel en Kayak</a></p>
      </div>
    </div>
  );
};

export default Map;
