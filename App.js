// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Itinerary from './components/Itinerary';
import Footer from './components/Footer';
import './App.css';

function App() {
    const itineraries = [
        {
            title: "Playa del Carmen, México",
            startDate: "12/12/2024",
            endDate: "20/12/2024",
            budget: "$18,000 MXN",
            activities: ["Visita a cenotes", "Buceo en arrecifes", "Excursión a Tulum"],
            hotel: "Hotel Playa Palms, Calle 8 Norte, Playa del Carmen",
            image: "playa_del_carmen.jpeg"
        },
        {
            title: "París, Francia",
            startDate: "05/04/2024",
            endDate: "12/04/2024",
            budget: "€3,000 EUR",
            activities: ["Tour en la Torre Eiffel", "Visita al Museo del Louvre", "Paseo en barco por el Sena"],
            hotel: "Hotel Le Meurice, Rue de Rivoli, París",
            image: "paris.jpg"
        }
    ];

    return (
        <div className="App" style={{ backgroundImage: 'url(fondo.jpg)', backgroundSize: 'cover' }}>
            <Navbar />
            <div className="container">
                <h2>Historial de Itinerarios Guardados</h2>
                {itineraries.map((itinerary, index) => (
                    <Itinerary key={index} itinerary={itinerary} />
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default App;
