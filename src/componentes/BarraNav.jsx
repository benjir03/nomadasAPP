import React from "react";
import { Link } from "react-router-dom";
import "../estilos/styBarraNav.css";
import { logoNomadas } from "../imgs/ArchivoImgs";

const BarraNav = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/HomePage">
          <img src={logoNomadas} alt="Logo de la página" />
          <h1>Nómadas</h1>
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/Datosdelusuario">Itinerarios</Link>
          </li>
          <li>
            <Link to="/Lugares">Lugares</Link>
          </li>
          <li>
            <Link to="/Historias">Historias</Link>
          </li>
          <li>
            <Link className="botonAccion" to="/Register">
              Registrarse
            </Link>
          </li>
          <li>
            <Link className="botonAccion" to="/Login">
              Iniciar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BarraNav;
