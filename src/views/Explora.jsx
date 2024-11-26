import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/explora.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";
import FichaActividad from "../componentes/FichaActividad";

import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01, Lugar1, Lugar2, Lugar3, Lugar4
} from "../imgs/ArchivoImgs";

function Explora() {
  return (
    <div className="contenedorVista">
      {/* Sección de bienvenida */}
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${fondiInicio})`,
          height: `90vh`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="contenedorDos">
          <h1>Explora</h1>
          <p>¡Encuentra lugares fuera de lo común!</p>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categoriasSec">
        <h2>Categorías</h2>
        <div className="categorias">
          <FichaCategoria
            titulo="Historia"
            contenido=""
            imagen={historiaImage}
          />
          <FichaCategoria
            titulo="Arte"
            contenido=""
            imagen={arteImage}
          />
          <FichaCategoria
            titulo="Gastronomía"
            contenido=""
            imagen={gastronomiaImage}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más categorías...
        </Link>
      </section>

      {/* Sección de lugares recomendados */}
      <section className="categoriasSec">
        <h2>Lugares</h2>
        <div className="categorias">
          <FichaLugares
            titulo="Lugar1"
            contenido=""
            imagen={Lugar1}
          />
          <FichaLugares
            titulo="Lugar2"
            contenido=""
            imagen={Lugar1}
          />
          <FichaLugares
            titulo="Lugar3"
            contenido=""
            imagen={Lugar1}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más lugares...
        </Link>
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
        <Link to="/Lugares" className="more-categories-link">
          Más actividades...
        </Link>
      </section>


    </div>
  );
}

export default Explora;
