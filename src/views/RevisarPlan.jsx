import React, { useEffect, useState } from 'react';
import ActividadAgregada from '../componentes/ActividadAgregada';
import "../estilos/RevisarPlan.css";
import BotonRegresar from "../componentes/BotonRegresar";
import BotonRegresar2 from "../componentes/BotonRegresar2";
import axios from 'axios';
import { LuPrinter } from 'react-icons/lu';
import { FaCheck, FaEdit, FaRoute, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { calcularRuta } from '../componentes/calcularRuta';

const RevisarPlan = () => {
  const [plan, setPlan] = useState([]);
  const navigate = useNavigate();
  const [mapsLink, setMapsLink] = useState('');

  const handleVerRuta = async () => {
    if (plan.length > 0) {
      const placeIds = plan.map(actividad => actividad.ID_actividad); // Asumiendo que cada actividad tiene un ID_actividad
      const link = await calcularRuta(placeIds, 'driving'); // Puedes cambiar el modo según se requiera
      setMapsLink(link);
    }
  };
  
  const Completar = () => {
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

    // Función para eliminar la actividad del estado local
    const handleDeleteActivity = (nombreActividad) => {
      setPlan((prevPlan) =>
        prevPlan.filter((actividad) => actividad.nombre_actividad !== nombreActividad)
      );
    };
    const Limpiar = async () =>{
      
    }
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
              onDelete={handleDeleteActivity}
              ID_actividad={actividad.ID_actividad}
            />
          ))}
            
            <div className="contenedorBotonesAccion">
              <button className="botonCompletarPlan" onClick={Completar}>
                <FaCheck /> Completar Plan
              </button>
              <button className="botonAccion2" onClick={Limpiar}>
                <FaTrash /> Limpiar plan
              </button>
              <button className="botonVerRuta" onClick={handleVerRuta}>
                <FaRoute /> Ver ruta
              </button>
            </div>
            {mapsLink && (
              <div>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer">Ver Ruta en Google Maps</a>
              </div>
            )}


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
                      onClick={() => window.open('/Ruta', '_blank')}  
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