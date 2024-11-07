import React, { useState, useEffect } from "react";
import "../estilos/styPerfil.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BackPerfil, ciudad } from "../imgs/ArchivoImgs";


const Perfil = () => {
  const [activeSection, setActiveSection] = useState("info");
  const [usuario, setUsuario] = useState({
    nombre: "",
    fecha_nacimiento: "",
    correo: "",
    genero: "",
    telefono: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/perfil", {
          withCredentials: true,
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/Inicio");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar tu cuenta?"
    );
    if (confirmDelete) {
      try {
        await axios.delete("http://localhost:3001/auth/eliminar", {
          withCredentials: true,
        });
        navigate("/Inicio"); // Redirige después de eliminar la cuenta
      } catch (error) {
        console.error("Error al eliminar la cuenta:", error);
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "info":
        return (
          <div className="contenedorVista">
            <div
              className="contenedorUno"
              style={{
                backgroundImage: {BackPerfil}, // Asegúrate de usar la interpolación correcta
                height: "50vh", // Usa comillas para las unidades
                backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
                backgroundPosition: "center", // Centra la imagen
              }}
            >
              <div className="contenedorDos">
                <h1>Hola {usuario.nombre}</h1>
              </div>
            </div>
            <div>
              <h2>Información general</h2>
              <p><strong>Nombre:</strong> {usuario.nombre}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>{" "}
                {usuario.fecha_nacimiento}
              </p>
              <p>
                <strong>Género:</strong> {usuario.genero}
              </p>
              <p>
                <strong>Teléfono:</strong> {usuario.telefono}
              </p>
              <Link className="botonAccion" to="/Modificar">
                Modificar 
              </Link>
              <br />
              <br />
              <br />
              <button onClick={handleDelete} className="botonAccion">
                Eliminar cuenta
              </button>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="contenedorVista">
            <div
              className="contenedorUno"
              style={{
                backgroundImage: {ciudad}, // Asegúrate de usar la interpolación correcta
                height: "50vh", // Usa comillas para las unidades
                backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
                backgroundPosition: "center", // Centra la imagen
              }}
            >
              <div className="contenedorDos"><h1>Hola {usuario.nombre}</h1>
              </div>
            </div>
            <div>
              <h2>Información de cuenta</h2>
              <p>
                <strong>Nombre:</strong> {usuario.correo}
              </p>
              <p>
                <strong>Correo</strong> {usuario.correo}
              </p>
              <p>
                <strong>Teléfono:</strong> {usuario.telefono}
              </p>
              <br />
              <Link className="botonAccion" to="/Modificar">Modificar
              </Link>
              <br />
              <br />
              <br />
              <button onClick={handleDelete} className="botonAccion3">
                Eliminar cuenta
              </button>
            </div>
          </div>
        );
      case "security":
        return <div>Seguridad</div>;
      case "notifications":
        return <div>Notificaciones</div>;
      case "logout":
        handleLogout();
        return null;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div className="perfil-container">
      <aside className="sidebar">
        <h2 className="perfil-nombre">{`Bienvenido ${usuario.nombre}`}</h2>

        <ul>
          <li
            className={activeSection === "info" ? "active" : ""}
            onClick={() => setActiveSection("info")}
          >
            Información personal
          </li>

          <li
            className={activeSection === "settings" ? "active" : ""}
            onClick={() => setActiveSection("settings")}
          >
            Configuración de cuenta
          </li>

          <li
            className={activeSection === "security" ? "active" : ""}
            onClick={() => setActiveSection("security")}
          >
            Seguridad
          </li>

          <li
            className={activeSection === "notifications" ? "active" : ""}
            onClick={() => setActiveSection("notifications")}
          >
            Notificaciones
          </li>

          <li
            className={activeSection === "logout" ? "active" : ""}
            onClick={() => setActiveSection("logout")}
          >
            Cerrar sesión
          </li>
        </ul>
      </aside>
      <main className="content">{renderContent()}</main>
    </div>
  );
};

export default Perfil;
