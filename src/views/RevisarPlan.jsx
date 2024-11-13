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
          <p className="informacionAdicional">
            #
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevisarPlan;
