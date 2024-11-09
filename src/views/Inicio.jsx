import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/fondoInicio.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import ImageCarousel from "../componentes/Carousel";

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
          <FichaCategoria titulo="Historia" contenido="Algo bonito" imagen = {historiaImage}/>
          <FichaCategoria titulo="Benji" contenido="Scrum master" imagen = {arteImage}/>
          <FichaCategoria titulo="Uriel" contenido="Scrum master" imagen = {gastronomiaImage}/>
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
        <h2>Comparte tu siguiente aventura.</h2>
        <div className="user-stories">
          <Link to="/Historias/user1" className="user-story">
            <img src={user1Image} alt="User 1" className="user-image" />
            <p>@User 1</p>
          </Link>
          <Link to="/Historias/user2" className="user-story">
            <img src={user2Image} alt="User 2" className="user-image" />
            <p>@User 2</p>
          </Link>
          <Link to="/Historias/user3" className="user-story">
            <img src={user3Image} alt="User 3" className="user-image" />
            <p>@User 3</p>
          </Link>
          <Link to="/Historias/user4" className="user-story">
            <img src={user4Image} alt="User 4" className="user-image" />
            <p>@User 4</p>
          </Link>
        </div>
        <Link to="/Historias" className="more-stories-link">
          Más historias...
        </Link>
      </section>
      <div className="App">
      <ImageCarousel images={images} />
    </div>
    </div>
    
  );
}

export default Inicio;
