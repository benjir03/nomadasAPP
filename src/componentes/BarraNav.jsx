import React from "react";
import "../estilos/styBarraNav.css";
import { logoNomadas } from "../imgs/ArchivoImgs";

const BarraNav = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logoNomadas} alt="Logo de la página" />
        <h1>Nómadas app</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="#home">NómadasUwU</a>
          </li>
          <li>
            <a href="#about">Itinerarios</a>
          </li>
          <li>
            <a href="#services">Historias</a>
          </li>
          <li>
            <a href="#contact">Contacto</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BarraNav;
