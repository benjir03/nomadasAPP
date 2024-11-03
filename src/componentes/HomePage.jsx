import React from "react";
import { Link } from "react-router-dom";
import "../estilos/styHomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Bienvenido a Nómadas App</h1>
        <p>Explora itinerarios, descubre nuevos lugares y comparte tus historias de viaje.</p>
      </header>
      <section className="home-content">
        <div className="home-options">
          <Link to="/itinerarios" className="home-button">Itinerarios</Link>
          <Link to="/lugares" className="home-button">Lugares</Link>
          <Link to="/historias" className="home-button">Historias</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
