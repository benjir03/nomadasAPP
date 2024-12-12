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
          {plan.map((actividad, index) => (
              <ActividadAgregada
              key={index}
              imagen = {actividad.imagen_actividad}
              nombre={actividad.nombre_actividad}
              ubicacion="" 
              horario=""
            />
          ))}
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