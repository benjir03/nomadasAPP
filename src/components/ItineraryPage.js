import React from 'react';
import ActivityItem from './ActivityItem';

function ItineraryPage() {
    return (
        <div className="container">
            <div className="left">
                <div className="top-section">
                    <div className="calendar">
                        <div>mie<br />17<br />oct</div>
                        <div>jue<br />18<br />oct</div>
                        <div>vie<br />19<br />oct</div>
                        <div>sab<br />20<br />oct</div>
                    </div>
                    <div className="expenses">
                        <div>Actividades $1500</div>
                        <div>Alimentos $800</div>
                        <div>Transporte $300</div>
                        <div>Total $2600</div>
                    </div>
                </div>

                <div className="activity-list">
                    <ActivityItem 
                        imgSrc="/cancun.jpg" 
                        title="Viaje de ida a Cancún" 
                        description="Vuelo directo de CDMX a Cancún. Salida a las 9:00 AM." 
                    />
                    <ActivityItem 
                        imgSrc="/nacional.jpg" 
                        title="Caminata en el Parque Nacional" 
                        description="Exploración guiada por senderos naturales y avistamiento de flora y fauna." 
                    />
                    <ActivityItem 
                        imgSrc="/restau.jpg" 
                        title="Cena en Restaurante La Selva" 
                        description="Disfruta de una cena típica con mariscos y sabores locales." 
                    />
                    <ActivityItem 
                        imgSrc="/madero.jpg" 
                        title="Visita a Puerto Madero" 
                        description="Cena en uno de los mejores restaurantes de la ciudad con vista al mar." 
                    />
                    <ActivityItem 
                        imgSrc="/metro.png" 
                        title="Transporte en Metrobus" 
                        description="Transporte local para recorrer el centro de la ciudad." 
                    />
                </div>
            </div>

            <div className="right">
                <h3>Parque Ecológico de Xochimilco, Ciudad de México</h3>
                <div className="map">
                    <img src="/xochi.jpg" alt="Mapa" style={{ width: '100%', borderRadius: '8px' }} />
                    <p>Coordenadas: 19.2908, -99.0986</p>
                    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Ver en Google Maps</a><br />
                    <a href="https://www.kayak.com" target="_blank" rel="noopener noreferrer">Reservar hotel en Kayak</a>
                </div>
                <p>El Parque Ecológico de Xochimilco es una reserva natural que ofrece paseos en trajineras, actividades al aire libre y vistas impresionantes de la ciudad.</p>
            </div>
        </div>
    );
}

export default ItineraryPage;
