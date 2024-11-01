import React from 'react';
import Button from "../components/Button";
import Img from '../components/Imgs';
import logo from "../imgs/LogoNoP.jpeg";
import historia from "../imgs/Historia.jpg";
import food from "../imgs/food.jpg";
import art from "../imgs/art.jpg";
import "../styles/styHome.css";

export default function home () {
    return (
        <div className='General'>
            <div className='Home'>
                <div className='ContHome'>
                    <h1>Nónamadas</h1>
                    <p>Nos encargamos de diseñar y personalizar una experiencia
                        en base a tus gustos y preferencias
                    </p>
                    <Button text="Crear un itenerario" url="https://www.pricetravel.com/?campaignTokenApi=12133092272d4d38a5315776e096cdef&gad_source=1&gbraid=0AAAAADvAX6zD2v9Quhf2WiTrvPDYf3toA&gclid=EAIaIQobChMI1eHOgKK3iQMVeUlHAR3NjgEgEAAYASAAEgJUxfD_BwE"/>
                </div>
            </div>
            <div className='Categories'>
                <h1>¡Explora lugares fuera de lo común!</h1>
                <h3>Historia, comida, arte y mucho mas</h3>
                <div className='CatImg'>
                    <Img Direccion={historia}/>
                    <Img Direccion={food}/>
                    <Img Direccion={art}/>
                </div>
            </div>
            <div className='Opiniones'>
                <h1>Comparte tu siguiente aventura</h1>
                <div className='CatImg'>
                    <Img Direccion={logo}/>
                    <Img Direccion={logo}/>
                    <Img Direccion={logo}/>
                </div>
            </div>
        </div>
    );
};