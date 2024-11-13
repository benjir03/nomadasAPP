import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/fondoInicio.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaOpinion from "../componentes/FichaOpinion";
import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  user1Image,
  user2Image,
  user3Image,
  user4Image,
} from "../imgs/ArchivoImgs";

const images = [
  { src: BackInicio, alt: "Imagen 1", info: "Información de la imagen 1" },
  {
    src: gastronomiaImage,
    alt: "Imagen 2",
    info: "Información de la imagen 2",
  },
  { src: arteImage, alt: "Imagen 3", info: "Información de la imagen 3" },
];

const usuarios = [
  { nombre: "User 1", imagen: user1Image },
  { nombre: "User 2", imagen: user2Image },
  { nombre: "User 3", imagen: user3Image },
  { nombre: "User 4", imagen: user4Image },
];

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

      {/* Sección de historias de usuarios */}
      <FichaOpinion usuarios={usuarios} />
    </div>
  );
}

export default Inicio;
