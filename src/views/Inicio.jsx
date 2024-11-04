import React from "react";
import BarraNav from "../componentes/BarraNav";
import { Link } from "react-router-dom";
import "../estilos/styInicio.css";
import {
  historiaImage,
  gastronomiaImage,
  arteImage,
  user1Image,
  user2Image,
  user3Image,
  user4Image,
} from "../imgs/ArchivoImgs";

function Inicio() {
  return (
    <div className="home">
      <BarraNav />

      {/* Sección de bienvenida */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Nómadas</h1>
          <p>
            Nos encargamos de diseñar y personalizar una experiencia de viaje
            con base a tus gustos e intereses.
          </p>
          <Link to="/Destino" className="create-itinerary-button">
            Comienza a crear un itinerario
          </Link>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categories-section">
        <h2>¡Explora lugares fuera de lo común!</h2>
        <div className="categories">
          <Link to="/Lugares/Historia" className="category-card">
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
          </Link>
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
    </div>
  );
}

export default Inicio;
