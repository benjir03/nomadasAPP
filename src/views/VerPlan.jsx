import React from 'react';  
import ActividadAgregada from '../componentes/ActividadAgregada';  
import "../estilos/RevisarPlan.css";  
import BotonRegresar from "../componentes/BotonRegresar";
import BotonRegresar2 from "../componentes/BotonRegresar2";  
import { LuPrinter } from 'react-icons/lu';  
import { FaRoute } from 'react-icons/fa';  

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
              <LuPrinter /> Imprimir Plan  
            </button>  
            <button  
              className="botonVerRuta"  
              onClick={() => window.open('https://www.google.com/maps/dir/...', '_blank')}  
            >  
              <FaRoute /> Ver ruta  
            </button>  
          </div>  
        </div>  

        <div className="contenedorLadoDerecho">  
          <div className="nombrePlanContenedor">  
            <h3 className="nombrePlan">Nombre del Plan</h3>  
            <button className="botonEditarNombre">Editar</button>  
          </div>  

          {/* Agrupación de actividades */}
          <div className="detalleActividades">
            <div className="detalleActividad">
              <p><strong>Ciudad:</strong> Descripción del lugar</p>
              <p><strong>Acompañantes:</strong> 2 personas</p>
              {/*<p><strong>Actividad:</strong> Parque Central: Centro</p>*/}
            </div>

          {/*<div className="nombrePlanContenedor">  
            <h3 className="nombrePlan">Fecha</h3>  
            <button className="botonEditarNombre">Editar</button>  
          </div>*/}

            <div className="detalleActividad">
              <p><strong>No. de actividades:</strong> 7 </p>
              <p><strong>Mascota:</strong> Sí </p>
              <p><strong>Capacidades diferentes:</strong> Ninguna </p>

              {/*<p><strong>Actividad:</strong> Museo de Arte: Avenida Principal</p>
              <p><strong>Ciudad:</strong> Descripción del lugar</p>
              <p><strong>Acompañantes:</strong> 2 personas</p>*/}
            </div>
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default RevisarPlan;