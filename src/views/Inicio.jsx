import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/fondoInicio.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares"; // Importa el componente FichaLugares

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
            contenido="Algo bonito"
            imagen={historiaImage}
          />
          <FichaCategoria
            titulo="Benji"
            contenido="Scrum master"
            imagen={arteImage}
          />
          <FichaCategoria
            titulo="Uriel"
            contenido="Scrum master"
            imagen={gastronomiaImage}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más categorías...
        </Link>
      </section>

      {/* Sección de lugares recomendados */}
      <div className="contenedorLugaresSec">
        <h2 className="tituloLugares">Lugares Recomendados</h2>
        <section className="lugaresSec">
          <FichaLugares
            titulo="Lugar 1"
            contenido="Descripción del Lugar 1"
            imagen={Lugar1}
          />
          <FichaLugares
            titulo="Lugar 2"
            contenido="Descripción del Lugar 2"
            imagen={Lugar2}
          />
          <FichaLugares
            titulo="Lugar 3"
            contenido="Descripción del Lugar 3"
            imagen={Lugar3}
          />
          <FichaLugares
            titulo="Lugar 4"
            contenido="Descripción del Lugar 4"
            imagen={Lugar4}
          />
        </section>
        <div className="linkMasLugares">
          <a href="/mas-lugares">Más lugares</a>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
