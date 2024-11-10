import React from "react";
import { Link } from "react-router-dom";
import { logoNomadas } from "../imgs/ArchivoImgs";
import "../estilos/estiloBarraNav.css";

const BarraNav = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/Inicio">
          <img src={logoNomadas} alt="Logo de la página" />
        </Link>
        <Link to="/Inicio">
          <h1>NómadasAPP</h1>
        </Link>
      </div>

      <nav>
        <ul className="nav-links">
        <li>
            <Link className="normal" to="/GustosPerfil">
              prueba de Gustos
            </Link>
          </li>
          <li>
            <Link className="normal" to="/ArmarPlan">
              Arma tu plan
            </Link>
          </li>
          <li>
            <Link className="normal" to="/Actividad">
              Recomendaciones
            </Link>
          </li>
          <li>
            <Link className="normal" to="/Experiencias">
              Experiencias
            </Link>
          </li>
          <li>
            <Link className="botonAccion" to="/Lugares">
              Lugares
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
          <li>
            <Link className="botonAccion" to="/Perfil">
              Perfil
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BarraNav;
