import React from "react";
//import { Link } from "react-router-dom";
import "../estilos/styBarraNav.css";
import {logoNomadas} from "../imgs/ArchivoImgs";

const BarraNav = () => {
  return (
    <header className="header">
      <div className="logo">
          <img src = {logoNomadas} alt="Logo de la página" />
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            Itinerarios
          </li>
          <li>
            Lugares
          </li>
          <li>
            Historias
          </li>
          <li>
              Registrarse
          </li>
          <li>
              Iniciar sesión
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BarraNav;
