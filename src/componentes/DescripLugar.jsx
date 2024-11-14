import React from 'react';
import Actividad from './actividad'; // Importa el componente Actividad
import '../estilos/styDescripLugar.css'; // Cambia el nombre del archivo CSS si es necesario

function ListaActividad() {
  const activities = [
    { title: 'CDMX', imageUrl: require('../imgs/lugar_cdmx.webp') },
    { title: 'Chiapas', imageUrl: require('../imgs/lugar_chiapas.webp') },
    { title: 'Cancún', imageUrl: require('../imgs/lugar_cancun.webp') },
  ];

  return (
    <div className="city-card-list">
      <h1 className="city-card-title">Selecciona los lugares que vas a visitar</h1>
      <div className="city-card-container">
        {activities.map((activity, index) => (
          <Actividad
            key={index}
            title={activity.title}
            description={activity.description}
            imageUrl={activity.imageUrl}
          />
        ))}
      </div>
      <a href="#" className="city-card-link">Más lugares...</a>
    </div>
  );
}   

export default ListaActividad;
