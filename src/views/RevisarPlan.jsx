import React from 'react';
import ActividadAgregada from '../componentes/ActividadAgregada';
import "../estilos/RevisarPlan.css";

const RevisarPlan = () => {
  return (
    <div className="contenedorVista">
      <h1 className="tituloRevisarPlan">Revisar Plan</h1>
      <div className="contenedorPrincipal">
        <div className="contenedorActividades">
          <ActividadAgregada 
            nombre="Parque Central" 
            ubicacion="Centro" 
            horario="8:00 AM - 10:00 PM" 
            imagen="ruta_a_tu_imagen_parque.jpg" 
          />
          <ActividadAgregada 
            nombre="Museo de Arte" 
            ubicacion="Avenida Principal" 
            horario="9:00 AM - 5:00 PM" 
            imagen="ruta_a_tu_imagen_museo.jpg" 
          />
          {/* Botón Completar Plan */}
          <button className="botonCompletarPlan">Completar Plan</button>
          <button
          className="search-button"
          onClick={() => window.open('https://www.google.com/maps/dir/Alejandro+Dumas+81,+Polanco,+Polanco+IV+Secc,+Miguel+Hidalgo,+11550+Ciudad+de+M%C3%A9xico,+CDMX/Blvd.+Miguel+de+Cervantes+Saavedra,+Granada,+11529+Ciudad+de+M%C3%A9xico,+CDMX/@19.4355518,-99.2042008,16z/data=!3m1!4b1!4m13!4m12!1m5!1m1!1s0x85d202020055c1c3:0x6604f6bd7e880fae!2m2!1d-99.1956749!2d19.4304316!1m5!1m1!1s0x85d2021a843d2a1b:0xe7656ed95e724022!2m2!1d-99.2034115!2d19.4401937?entry=ttu&g_ep=EgoyMDI0MTExMi4wIKXMDSoASAFQAw%3D%3D', '_blank')}
        >
          Ver ruta
        </button>

        </div>
        <div className="contenedorLadoDerecho">
          <h3 className="nombrePlan">Nombre del Plan</h3>
          <div className="detalleActividades">
            <p><strong>Actividades:</strong></p>
            <ul>
              <li>Parque Central: Centro</li>
              <li>Museo de Arte: Avenida Principal</li>
            </ul>
          </div>
          <div className="detalleLugar">
            <p><strong>Lugar:</strong> Descripción del lugar</p>
          </div>
          <div className="detalleAcompanantes">
            <p><strong>Acompañantes:</strong> 2 personas</p>
          </div>
          <div className="detalleTransporte">
            <p><strong>Transporte:</strong></p>
            <label>
              <input type="radio" name="transporte" value="si" /> Sí
            </label>
            <label>
              <input type="radio" name="transporte" value="no" /> No
            </label>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RevisarPlan;
