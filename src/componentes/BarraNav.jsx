import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logoNomadas } from "../imgs/ArchivoImgs";
import "../estilos/estiloBarraNav.css";
import axios from "axios";

const BarraNav = () => {
  const [nombreUsuario, setNombreUsuario] = useState(null); // Estado para el nombre

  useEffect(() => {
    const verificarUsuario = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/perfil", {
          withCredentials: true,
        });
        setNombreUsuario(response.data.nombre); // Asignar el nombre si está autenticado
      } catch (error) {
        setNombreUsuario(null); // Usuario no autenticado
      }
    };
    verificarUsuario();
  }, []);
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
            <Link className="normal" to="/ArmarPlan">
              Arma tu plan
            </Link>
          </li>
          <li>
            <Link className="normal" to="/Explora">
              Explora
            </Link>
          </li>
          <li>
            <Link className="botonAccion" to="/RevisarPlan">
              Ver mi plan
            </Link>
          </li>
          <li>
            <Link className="botonAccion" to="/InicioSesion">
              Iniciar sesión
            </Link>
          </li>
          <li>
            <Link className="botonAccion" to="/Perfil">
            {nombreUsuario ? nombreUsuario : "Perfil"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BarraNav;
