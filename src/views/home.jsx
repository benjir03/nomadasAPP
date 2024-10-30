import React from 'react';
import Button from "../components/Button";
import "../styles/styHome.css";

export default function home () {
    return (
    <div className='home'>
        <div className='ContHome'>
            <h1>Nónamadas</h1>
            <p>Nos encargamos de diseñar y personalizar una experiencia
                en base a tus gustos y preferencias
            </p>
            <Button text="Crear un itenerario" url="https://www.pricetravel.com/?campaignTokenApi=12133092272d4d38a5315776e096cdef&gad_source=1&gbraid=0AAAAADvAX6zD2v9Quhf2WiTrvPDYf3toA&gclid=EAIaIQobChMI1eHOgKK3iQMVeUlHAR3NjgEgEAAYASAAEgJUxfD_BwE"/>
        </div>
    </div>
    );
};