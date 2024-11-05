import React from "react";
import { Link } from "react-router-dom";
import { logoNomadas } from "../imgs/ArchivoImgs";
import "../estilos/styBarraNav.css";

const BarraNav = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/Inicio">
          <img
            src={logoNomadas}
            alt="Logo de la página"
            style={{ width: "50px", height: "auto" }}
          />
        </Link>
        <Link to="/Inicio">
          <h1>Nómadas</h1>
        </Link>
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <Link className="normal" to="/Destino">
              Arma tu plan
            </Link>
          </li>
          <li>
            <Link className="normal" to="/Destino">
              Recomendaciones
            </Link>
          </li>
          <li>
            <Link className="normal" to="/Destino">
              Experiencias
            </Link>
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
