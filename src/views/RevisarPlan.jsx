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

  // Función para calcular la ruta óptima y devolver el enlace de Google Maps
  const calcularRuta = async (placeIds, travelMode = 'driving') => {
    if (!placeIds.length) return null;
    const origins = placeIds[0];
    const destinations = placeIds.slice(1).join('|');
    try {
      const response = await axios.get(`http://localhost:3002/route-matrix?origins=${origins}&destinations=${destinations}`);
      const data = response.data;
      console.log('datos ', placeIds);
      
      if (data.rows && data.rows[0] && data.rows[0].elements) {
        const route = optimizeRoute(data.rows[0].elements);
        console.log('PlaceDetails ', data.placeDetails );
        return generateMapsLink(route, data.placeDetails, travelMode);
      }
      
      return null;
    } catch (error) {
      console.error("Error al obtener la matriz de rutas:", error);
      return null;
    }
  };

  const optimizeRoute = (elements) => {
    console.log("Matriz de elementos:", elements);
  
    const validElements = elements.map((e, index) => ({
      ...e,
      index,
    })).filter(e => e.status === "OK");
  
    validElements.sort((a, b) => a.duration.value - b.duration.value);
  
    const route = validElements.map(e => e.index); // Ordenar según duración mínima
    console.log('Ruta optimizada:', route);
    return route;
  };
  
  const generateMapsLink = (route, placeDetails, travelMode) => {
    if (!placeDetails || placeDetails.length === 0) {
      console.error("Error: placeDetails no está disponible o está vacío.");
      return null;
    }
  
    const origin = encodeURIComponent(placeDetails[route[0]].formatted_address);
    const destination = encodeURIComponent(placeDetails[route[route.length - 1]].formatted_address);
    const waypoints = route.slice(1, -1)
      .map(index => encodeURIComponent(placeDetails[index]?.formatted_address || ""))
      .filter(Boolean) // Remover waypoints inválidos
      .join('|');
  
    const link = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=${travelMode}`;
    console.log('Link de Google Maps:', link);
    return link;
  };
  
  // Manejar errores en handleVerRuta
  const handleVerRuta = async () => {
    if (plan.length > 0) {
      const placeIds = plan.map(actividad => actividad.ID_google);
      console.log('placeIds:', placeIds);
  
      try {
        const link = await calcularRuta(placeIds, 'driving');
        if (link) {
          setMapsLink(link);
        } else {
          console.error("No se pudo generar el enlace.");
        }
      } catch (error) {
        console.error("Error al calcular la ruta:", error);
      }
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
        const planData = response.data;
        setPlan(planData);
      } catch (error) {
        console.error("Error al obtener el plan del usuario:", error);
      }
    };

    fetchPlan();
  }, []);

  const handleDeleteActivity = (nombreActividad) => {
    setPlan(prevPlan =>
      prevPlan.filter(actividad => actividad.nombre_actividad !== nombreActividad)
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
                {/*
                
                */}<a href={mapsLink} target="_blank" rel="noopener noreferrer">Link</a>
              </div>
            )}


        </div>

        <div className="contenedorLadoDerecho">  
                  <div className="nombrePlanContenedor">
                    {plan.map((actividad, index) =>(
                      <div key={index}>
                        <h3 className="nombrePlan">{actividad.nombre_itinerario}</h3>
                      </div>
                    ))}
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