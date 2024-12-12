import React from 'react';  
import ActividadAgregada from '../componentes/ActividadAgregada';  
import "../estilos/RevisarPlan.css";  
import BotonRegresar from "../componentes/BotonRegresar";
import BotonRegresar2 from "../componentes/BotonRegresar2";
import { LuPrinter } from 'react-icons/lu';
import { FaEdit, FaRoute, FaTrash } from 'react-icons/fa';

const RevisarPlan = () => {  
  return (  
    <div className="contenedorVista">  

      <div className="contenedorTitulo">  
        <BotonRegresar2 />  
        <h1 className="tituloRevisarPlan">Ver Plan</h1>  
      </div>  

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
          
          <div className="contenedorBotonesAccion">  
            <button className="botonCompletarPlan">  
              <FaEdit /> Editar Plan  
            </button>  
            <button className="botonAccion3">
              <FaTrash /> Eliminar plan  
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
            
              <strong>No. de actividades:</strong> 7 
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
            <button className="botonCompletarPlan">  
              <LuPrinter /> Imprimir Plan  
            </button>   
          </div> 
        </div>  
      </div>  
    </div>  
  );  
};  

export default RevisarPlan;