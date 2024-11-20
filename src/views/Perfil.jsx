import React, { useState, useEffect } from "react";
import "../estilos/styPerfil.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BackPerfil, ciudad } from "../imgs/ArchivoImgs";
import { FaCircle } from "react-icons/fa";


const Perfil = () => {
  const [activeSection, setActiveSection] = useState("info");
  const [usuario, setUsuario] = useState([]);
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
            <div className="login-container" >
              <h2 className="login-title">Datos generales</h2>
              
              <p className="input-field">
                <strong>Nombre:</strong> {`${usuario.nombre}`}
              </p>

              <p className="input-field">
                <strong>Apellido:</strong> {`${usuario.apellido}`}
              </p>

              <p className="input-field">
                <strong>Fecha de nacimiento:</strong> {`${usuario.fecha_nacimiento}`}
                {usuario.fecha_nacimiento}
              </p>
              <p className="input-field">
                <strong>Género:</strong> {`${usuario.genero}`}
              </p>
            </div>

            <div className="login-container">
              <h2 className="login-title" >Datos de la cuenta</h2>

              <p className="input-field">
                <strong>Correo:</strong> {`${usuario.email}`}
              </p>

              <p className="input-field">
                <strong>Teléfono:</strong> {`${usuario.telefono}`}
              </p>

              <br />

              <Link className="botonAccion" to="/Modificar">
                Modificar datos
              </Link>
              <br />
              <br />
              <button onClick={handleDelete} className="botonAccion">
                Eliminar cuenta 
              </button>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="contenedorVista">
            <div  >
              <h2 className="login-title">Protección de información personal</h2>
              <p className="Parrafo1">
                Conoce cómo es que cuidamos la integridad de tus datos personales...
              </p>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="contenedorVista">
            <div  >
              <h2 className="login-title">Notificaciones recientes</h2>
              <p className="Parrafo1">
                Aquí podrás consultar todas las notificaciones que genere nuestro sistema para tu cuenta.
              </p>              
            </div>
          </div>
        );

      case "logout":
        handleLogout();
        return null;
      default:
        return <div>Selecciona una opción</div>;
    }
  };



  return (
    <>
    <div className="perfil-container">

      <aside className="sidebar">
        <h2 className="perfil-nombre">Bienvenido</h2>

        <div
              className="contenedorTres"
              style={{
                backgroundImage: {BackPerfil}, // Asegúrate de usar la interpolación correcta
                //height: "20vh", // Usa comillas para las unidades
                backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
                backgroundPosition: "center", // Centra la imagen                                
              }}
        >
        </div>

        <h2 className="perfil-nombre">{`${usuario.nombre}`}</h2>

        <br/>

        <ul>
          <li
            className={activeSection === "info" ? "active" : ""}
            onClick={() => setActiveSection("info")}
          >
            Información personal
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


    <div className="complemento">

    </div>
    </>
  );
};

export default Perfil;