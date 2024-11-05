// src/components/Itinerary.js
import React from 'react';
import './Itinerary.css';

function Itinerary({ itinerary }) {
    return (
        <div className="itinerary">
            <div className="details">
                <h3>{itinerary.title}</h3>
                <p>Inicio: {itinerary.startDate}</p>
                <p>Fin: {itinerary.endDate}</p>
                <p>Presupuesto: {itinerary.budget}</p>
                <h3>Actividades</h3>
                <ul>
                    {itinerary.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
                <h3>Hotel</h3>
                <p>{itinerary.hotel}</p>
            </div>
            <img src={itinerary.image} alt={`Imagen de ${itinerary.title}`} />
            <div className="actions">
                <button>Consultar</button>
                <button>Imprimir</button>
            </div>
        </div>
    );
}

export default Itinerary;
