import React from 'react';
import ActividadAgregada from '../componentes/ActividadAgregada';
import "../estilos/RevisarPlan.css";
import BotonRegresar from "../componentes/BotonRegresar";

const RevisarPlan = () => {
  return (
    <div>
      {/* Contenedor para el botón de regresar alineado a la izquierda */}
      <div className="contenedorBotonRegresar ">
        <BotonRegresar />
      </div>

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
          <div className="contenedorBotonesAccion">
            <button className="botonCompletarPlan">Completar Plan</button>
            <button
              className="botonVerRuta"
              onClick={() => window.open('https://www.google.com/maps/dir/...', '_blank')}
            >
              Ver ruta
            </button>
          </div>
        </div>

        {/* Contenedor lado derecho */}
        <div className="contenedorLadoDerecho">
          <div className="nombrePlanContenedor">
            <h3 className="nombrePlan">Nombre del Plan</h3>
            <button className="botonEditarNombre">Editar</button>
          </div>

          {/* Agrupación de actividades */}
          <div className="detalleActividades">
            <div className="detalleActividad">
              <p><strong>Actividad:</strong> Parque Central: Centro</p>
              <p><strong>Ciudad:</strong> Descripción del lugar</p>
              <p><strong>Acompañantes:</strong> 2 personas</p>
            </div>

            <div className="detalleActividad">
              <p><strong>Actividad:</strong> Museo de Arte: Avenida Principal</p>
              <p><strong>Ciudad:</strong> Descripción del lugar</p>
              <p><strong>Acompañantes:</strong> 2 personas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisarPlan;
