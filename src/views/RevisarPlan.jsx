import React, { useEffect, useState } from 'react';
import ActividadAgregada from '../componentes/ActividadAgregada';
import "../estilos/RevisarPlan.css";
import BotonRegresar from "../componentes/BotonRegresar";
import axios from 'axios';

const RevisarPlan = () => {
  const [plan, setPlan] = useState([]);
  
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get('http://localhost:3001/plan/obtenerPlan', {
          withCredentials: true,
        });
        console.log(response);
        const planData = response.data;
        setPlan(planData);
      } catch (error) {
        console.error("Error al obtener el plan del usuario:", error);
      }
    };
    
    fetchPlan();
  }, []);
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
            <p><strong>Actividades:</strong></p>
            <ul>
              <li>Parque Central: Centro</li>
              <li>Museo de Arte: Avenida Principal</li>
            </ul>
          </div>
          <div className="detalleLugar">
            <p><strong>Ciudad:</strong> Descripción del lugar</p>
          </div>
          <div className="detalleAcompanantes">
            <p><strong>Acompañantes:</strong> 2 personas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisarPlan;
