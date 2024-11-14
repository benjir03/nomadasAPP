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
