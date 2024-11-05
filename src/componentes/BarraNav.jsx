import React from "react";
//import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "../estilos/styBarraNav.css";
import { logoNomadas } from "../imgs/ArchivoImgs";

const BarraNav = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/HomePage">
          <img src={logoNomadas} alt="Logo de la página" />
        </Link>
        <Link to="/Inicio">
          <img src={logoNomadas} alt="Logo de la página" style={{ width: '50px', height: 'auto' }} />
          <h1>Nómadas</h1>
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/Destino">Itinerarios</Link>
          </li>
          <li>
            <Link to="/Destino">Lugares</Link>
          </li>
          <li>
            <Link to="/Destino">Historias</Link>
          </li>
          <li>
            <Link className="botonAccion" to="/Registro">
              Registrarse
            </Link>
          </li>
          <li>
            <Link className="botonAccion" to="/InicioSesion">
              Iniciar sesión
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BarraNav;