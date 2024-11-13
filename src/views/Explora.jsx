
import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/explora.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";

import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01,
} from "../imgs/ArchivoImgs";

const images = [
  { src: BackInicio, alt: "Imagen 1", info: "Información de la imagen 1" },
  { src: gastronomiaImage, alt: "Imagen 2", info: "Información de la imagen 2" },
  { src: arteImage, alt: "Imagen 3", info: "Información de la imagen 3" },
];

const lugares = [
  { nombre: "Lugar 1", imagen: explora01 },
  { nombre: "Lugar 2", imagen: explora01 },
  { nombre: "Lugar 3", imagen: explora01 },
  { nombre: "Lugar 4", imagen: explora01 },
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
          <h1>Lugares</h1>
          <p>¡Explora lugares fuera de lo común!</p>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categoriasSec">
        <h2>Categorías</h2>
        <div className="categorias">
          <FichaCategoria titulo="Historia" contenido="" imagen={historiaImage} />
          <FichaCategoria titulo="Arte" contenido="" imagen={arteImage} />
          <FichaCategoria titulo="Gastronomía" contenido="" imagen={gastronomiaImage} />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más categorías...
        </Link>
      </section>

      {/* Sección de lugares recomendados */}
      <FichaLugares lugares={lugares} />
    </div>
  );
}

export default Inicio;
