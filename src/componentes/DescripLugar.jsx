import React from 'react';
import Actividad from './actividad'; // Importa el componente Actividad
import '../estilos/listaactividad.css';

function ListaActividad() {
    const activities = [
        { title: 'Senderismo', description: 'Explora la naturaleza', imageUrl: require('../imgs/explora01.jpg') },
        { title: 'Nadar', description: 'Descubre el agua', imageUrl: require('../imgs/imgkil.jpg') },
        { title: 'Escalada', description: 'Desafía las alturas', imageUrl: require('../imgs/explora.jpg') },
      ];
      

  return (
    <div className="lista-actividad">
      <h1 className="lista-actividad-title">¡Explora actividades emocionantes!</h1>
      <div className="actividad-cards">
        {activities.map((activity, index) => (
          <Actividad
            key={index}
            title={activity.title}
            description={activity.description}
            imageUrl={activity.imageUrl}
          />
        ))}
      </div>
      <a href="#" className="more-categories-link">Más actividades...</a>
    </div>
  );
}

export default ListaActividad;