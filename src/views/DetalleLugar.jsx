import React from "react";
import { Link } from "react-router-dom";
import "../estilos/DetalleLugar.css";
import fondiInicio from "../imgs/cdmx-portada.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";
import FichaActividad from "../componentes/FichaActividad";
import BotonRegresar from "../componentes/BotonRegresar";

import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01, Lugar1, Lugar2, Lugar3, Lugar4
} from "../imgs/ArchivoImgs";

function DetalleLugar() {
  return (
    <div className="contenedorVista">
      {/* Sección de bienvenida */}
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${fondiInicio})`,
          height: `90vh`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
         {/* Botón de regresar en la esquina superior izquierda */}
         <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
          <BotonRegresar />
        </div>
        <div className="contenedorDos">
          <h1>Ciudad</h1>
          <p>En esta sección encontrarás las actividades que corresponden a un lugar o ciudad</p>
        </div>
      </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <h2>Actividades</h2>
        <div className="categorias">
          <FichaActividad
            titulo="Actividad1"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad2"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad3"
            contenido=""
            imagen={BackInicio}
          />
        </div>
      </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <div className="categorias">
          <FichaActividad
            titulo="Actividad4"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad5"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad6"
            contenido=""
            imagen={BackInicio}
          />
        </div>
      </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <div className="categorias">
          <FichaActividad
            titulo="Actividad7"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad8"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad9"
            contenido=""
            imagen={BackInicio}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más actividades...
        </Link>
      </section>


    </div>
  );
}

export default DetalleLugar;
