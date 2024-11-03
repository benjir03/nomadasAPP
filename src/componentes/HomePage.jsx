import React from "react";
import { Link } from "react-router-dom";
import "../estilos/styHomePage.css";
import historiaImage from '../imgs/historia.jpg';
import gastronomiaImage from '../imgs/gastronomia.webp';
import arteImage from '../imgs/arte.JPG';
import user1Image from '../imgs/travel01.jpg';
import user2Image from '../imgs/travel01.jpg';
import user3Image from '../imgs/travel01.jpg';
import user4Image from '../imgs/travel01.jpg';

function Home() {
  return (
    <div className="home">
      {/* Sección de bienvenida */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Nómadas</h1>
          <p>Nos encargamos de diseñar y personalizar una experiencia de viaje con base a tus gustos e intereses.</p>
          <button className="create-itinerary-button">Crear un itinerario</button>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categories-section">
        <h2>¡Explora lugares fuera de lo común!</h2>
        <div className="categories">
          <div className="category-card">
            <img src={historiaImage} alt="Historia" className="category-image" />
            <p className="category-text">Historia</p>
          </div>
          <div className="category-card">
            <img src={gastronomiaImage} alt="Gastronomía" className="category-image" />
            <p className="category-text">Gastronomía</p>
          </div>
          <div className="category-card">
            <img src={arteImage} alt="Arte" className="category-image" />
            <p className="category-text">Arte</p>
          </div>
        </div>
        <a href="#" className="more-categories-link">Más categorías...</a>
      </section>

      {/* Sección de historias de usuarios */}
      <section className="user-stories-section">
        <h2>Comparte tu siguiente aventura.</h2>
        <div className="user-stories">
          <div className="user-story">
            <img src={user1Image} alt="User 1" className="user-image" />
            <p>@User 1</p>
          </div>
          <div className="user-story">
            <img src={user2Image} alt="User 2" className="user-image" />
            <p>@User 2</p>
          </div>
          <div className="user-story">
            <img src={user3Image} alt="User 3" className="user-image" />
            <p>@User 3</p>
          </div>
          <div className="user-story">
            <img src={user4Image} alt="User 4" className="user-image" />
            <p>@User 4</p>
          </div>
        </div>
        <a href="#" className="more-stories-link">Más historias...</a>
      </section>
    </div>
  );
}

export default Home;
