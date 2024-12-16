import React, { useEffect, useState } from 'react';
import ActividadAgregada from '../componentes/ActividadAgregada';
import "../estilos/RevisarPlan.css";
import BotonRegresar from "../componentes/BotonRegresar";
import BotonRegresar2 from "../componentes/BotonRegresar2";
import axios from 'axios';
import { LuPrinter } from 'react-icons/lu';
import { FaCheck, FaEdit, FaRoute, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RevisarPlan = () => {
  const [plan, setPlan] = useState([]);
  
  const Completar = () => {
    const navigate = useNavigate();
    alert("Plan completado, felicidades");
    navigate("/Perfil");
  }
  
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
    <div className="contenedorVista">  

      <div className="contenedorTitulo">  
        <BotonRegresar2 />  
        <h1 className="tituloRevisarPlan">Revisar Plan</h1>  
      </div>  

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
              <button className="botonCompletarPlan" onClick={Completar}>  
                <FaCheck /> Completar Plan  
              </button>  
              <button className="botonAccion2">
                <FaTrash /> Limpiar plan  
              </button>  
            </div> 

        </div>

        <div className="contenedorLadoDerecho">  
                  <div className="nombrePlanContenedor">  
                    <h3 className="nombrePlan">Nombre del Plan</h3>  
                    <button className="botonEditarNombre">Editar</button>  
                  </div>  
                  <br/>
                  <div className="nombrPlanContenedor">
                    <h2 className="nombrePlan">Detalles del plan</h2>
                  </div>
        
                  {/* Agrupación de actividades */}
                  <div className="detalleActividades">
                    
                      <strong>Ciudad:</strong> Descripción del lugar
                      <strong>Acompañantes:</strong> 2 personas
        
                  {/*<div className="nombrePlanContenedor">  
                    <h3 className="nombrePlan">Fecha</h3>  
                    <button className="botonEditarNombre">Editar</button>  
                  </div>*/}
                      <strong>No. de actividades: {plan.length}</strong>
                      {plan.map((actividad, index) => (
                        <div key={index}>
                          {/* Aquí va el contenido de cada actividad */}
                          Actividad {index + 1}: {actividad.nombre_actividad}
                        </div>
                      ))}

                      <strong>Mascota:</strong> Sí 
                      <strong>Capacidades diferentes:</strong> Ninguna 
                  </div>  
        
                  <div className="contenedorBotonesAccion"> 
                  <button  
                      className="botonVerRuta"  
                      onClick={() => window.open('https://www.google.com/maps/dir/...', '_blank')}  
                    >  
                      <FaRoute /> Ver ruta  
                    </button>    
                  </div> 
                </div>  
      </div>
    </div>
  );
};

export default RevisarPlan;