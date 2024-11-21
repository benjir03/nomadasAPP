import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/fondoInicio.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";

import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01,Lugar1,Lugar2,Lugar3,Lugar4
} from "../imgs/ArchivoImgs";


function Inicio() {
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
          <h1>Nómadas</h1>
          <p>
            Nos encargamos de diseñar y personalizar una experiencia de viaje
            como a ti te gusta.
          </p>
          <Link to="/ArmarPlan" className="botonAccion2">
            Comienza a crear un plan
          </Link>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categoriasSec">
        <h2>¡Explora lugares fuera de lo común!</h2>
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
        <h2>Lugares Recomendados</h2>
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
     
    </div>
  );
}

export default Inicio;
