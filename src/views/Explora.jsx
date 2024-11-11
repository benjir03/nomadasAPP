import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/explora.jpg";
import FichaCategoria from "../componentes/FichaCategoria";

import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01,
} from "../imgs/ArchivoImgs";


const images = [
  { src: BackInicio, alt: 'Imagen 1', info: 'Información de la imagen 1' },
  { src: gastronomiaImage, alt: 'Imagen 2', info: 'Información de la imagen 2' },
  { src: arteImage, alt: 'Imagen 3', info: 'Información de la imagen 3' },
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
          backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
          backgroundPosition: "center", // Centra la imagen,
        }}
      >
        <div className="contenedorDos">
          <h1>Lugares</h1>
          <p>
            ¡Explora lugares fuera de lo común!
          </p>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categoriasSec">
        <h2>Categorías</h2>
        <div className="categorias">
          <FichaCategoria titulo="Historia" contenido="" imagen = {historiaImage}/>
          <FichaCategoria titulo="Arte" contenido="" imagen = {arteImage}/>
          <FichaCategoria titulo="Gastronomía" contenido="" imagen = {gastronomiaImage}/>
          {/* <Link to="/Lugares/Historia" className="category-card">
            <img
              src={historiaImage}
              alt="Historia"
              className="category-image"
            />
            <p className="category-text">Historia</p>
          </Link>
          <Link to="/Lugares/Gastronomia" className="category-card">
            <img
              src={gastronomiaImage}
              alt="Gastronomía"
              className="category-image"
            />
            <p className="category-text">Gastronomía</p>
          </Link>
          <Link to="/Lugares/Arte" className="category-card">
            <img src={arteImage} alt="Arte" className="category-image" />
            <p className="category-text">Arte</p>
          </Link> */}
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más categorías...
        </Link>
      </section>

      {/* Sección de historias de usuarios */}
      <section className="user-stories-section">
        <h2>Lugares Recomendados</h2>
        <div className="user-stories">
          <Link to="/Historias/user1" className="user-story">
            <img src={explora01} alt="User 1" className="user-image" />
            <p>Lugar 1</p>
          </Link>
          <Link to="/Historias/user2" className="user-story">
            <img src={explora01} alt="User 2" className="user-image" />
            <p>Lugar 2</p>
          </Link>
          <Link to="/Historias/user3" className="user-story">
            <img src={explora01} alt="User 3" className="user-image" />
            <p>Lugar 3</p>
          </Link>
          <Link to="/Historias/user4" className="user-story">
            <img src={explora01} alt="User 4" className="user-image" />
            <p>Lugar 4</p>
          </Link>
        </div>
        <Link to="/Historias" className="more-stories-link">
          Más lugares...
        </Link>
      </section>
    </div>
    
  );
}

export default Inicio;
