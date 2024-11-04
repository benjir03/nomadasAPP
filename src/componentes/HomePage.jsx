import React from "react";
import { Link } from "react-router-dom";
import "../estilos/styHomePage.css";
import historiaImage from '../imgs/historia.jpg';
import gastronomiaImage from '../imgs/gastronomia.webp';
import arteImage from '../imgs/arte.JPG';
import user1Image from '../imgs/viajero1.png';
import user2Image from '../imgs/viajero2.jpg';
import user3Image from '../imgs/viajero3.webp';
import user4Image from '../imgs/viajero4.jpg';

function Home() {
  return (
    <div className="home">
      {/* Sección de bienvenida */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Nómadas</h1>
          <p>Nos encargamos de diseñar y personalizar una experiencia de viaje con base a tus gustos e intereses.</p>
          <a href="/Register" className="create-itinerary-button">Crear un itinerario</a> {/* Enlace al itinerario */}
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categories-section">
        <h2>¡Explora lugares fuera de lo común!</h2>
        <div className="categories">
          <a href="/Lugares/Historia" className="category-card"> {/* Enlace a la categoría Historia */}
            <img src={historiaImage} alt="Historia" className="category-image" />
            <p className="category-text">Historia</p>
          </a>
          <a href="Lugares/Gastronomia" className="category-card"> {/* Enlace a la categoría Gastronomía */}
            <img src={gastronomiaImage} alt="Gastronomía" className="category-image" />
            <p className="category-text">Gastronomía</p>
          </a>
          <a href="Lugares/Arte" className="category-card"> {/* Enlace a la categoría Arte */}
            <img src={arteImage} alt="Arte" className="category-image" />
            <p className="category-text">Arte</p>
          </a>
        </div>
        <a href="/Lugares" className="more-categories-link">Más categorías...</a>
      </section>

      {/* Sección de historias de usuarios */}
      <section className="user-stories-section">
        <h2>Comparte tu siguiente aventura.</h2>
        <div className="user-stories">
          <a href="/Historias/user1" className="user-story"> {/* Enlace a la historia de User 1 */}
            <img src={user1Image} alt="User 1" className="user-image" />
            <p>@User 1</p>
          </a>
          <a href="/Historias/user2" className="user-story"> {/* Enlace a la historia de User 2 */}
            <img src={user2Image} alt="User 2" className="user-image" />
            <p>@User 2</p>
          </a>
          <a href="/Historias/user3" className="user-story"> {/* Enlace a la historia de User 3 */}
            <img src={user3Image} alt="User 3" className="user-image" />
            <p>@User 3</p>
          </a>
          <a href="/Historias/user4" className="user-story"> {/* Enlace a la historia de User 4 */}
            <img src={user4Image} alt="User 4" className="user-image" />
            <p>@User 4</p>
          </a>
        </div>
        <a href="/Historias" className="more-stories-link">Más historias...</a>
      </section>
    </div>
  );
}

export default Home;
