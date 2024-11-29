import React, { useState, useEffect } from "react";
import "../estilos/styPerfil.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BackPerfil, ciudad } from "../imgs/ArchivoImgs";
import { FaCircle } from "react-icons/fa";
import { EjemploPerfil } from "../imgs/ArchivoImgs";

const Perfil = () => {
  const [activeSection, setActiveSection] = useState("info");
  const [usuario, setUsuario] = useState([]);
  const [pref, setPref] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  //Token perfil
  {/*
      useEffect(() => {
    if (!token) {
      navigate('/InicioSesion');  // Redirige si no hay token
    }
  }, [token, navigate]);
  */}

  //Datos del perfil
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/perfil", {
          withCredentials: true,
        });
        const algo = await axios.get("http://localhost:3001/gustos/gustos", {
          withCredentials: true,
        });
        const userData = response.data;
        const userPref = algo.data;
        // Formatear la fecha de nacimiento al formato YYYY-MM-DD
        const formattedDate = userData.fecha_nacimiento
          ? userData.fecha_nacimiento.split('T')[0]
          : "";
        setUsuario({ ...userData, fecha_nacimiento: formattedDate });
        setPref(userPref);
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
      //Datos usuarips
      case "info":
        return (
          <div className="perfil-centrado">
            <div className="login-container" >
              <h2 className="login-title">Datos generales</h2>
              
              <p className="camposPerfil">
                <strong>Nombre:</strong> {`${usuario.nombre}`}
              </p>

              <p className="camposPerfil">
                <strong>Apellido:</strong> {`${usuario.apellido}`}
              </p>

              <p className="camposPerfil">
                <strong>Fecha de nacimiento:</strong> {`${usuario.fecha_nacimiento}`}
              </p>
              <p className="camposPerfil">
                <strong>Género:</strong> {`${usuario.genero}` === 'M' ? 'Masculino' : 'Femenino'}
              </p>
            
              <br/>

              <h2 className="login-title" >Datos de la cuenta</h2>

              <p className="camposPerfil">
                <strong>Correo:</strong> {`${usuario.email}`}
              </p>

              <p className="camposPerfil">
                <strong>Contraseña:</strong> {`${usuario.contraseña}`}
              </p>

              <p className="camposPerfil">
                <strong>Teléfono:</strong> {`${usuario.telefono}`}
              </p>

              <br/>

              <Link className="botonAccion" to="/Modificar">
                Modificar datos
              </Link>

              <br/>
              <br/>

              <button onClick={handleDelete} className="botonAccion">
                Eliminar cuenta 
              </button>

              <br/>
              <br/>
              <br/>

              <button className="botonAccion">
                Editar foto de perfil
              </button>


            </div>
          </div>
        );
        //Prefencias
        case "pref":
          return(
            <div className="perfil-centrado">
            <div className="login-container" >
              <h2 className="login-title">Preferencias</h2>
              
              <p className="camposPerfil">
                <strong>Categoria favorita:</strong> {`${pref.nombre_categoria}`}
              </p>

              <p className="camposPerfil">
                <strong>Estación favorita:</strong> {`${pref.nombre}`}
              </p>

              <p className="camposPerfil">
                <strong>Duracion usual de viajes:</strong> {`${pref.duracion}`=== 1 ? '1 dia' : '2 dias o mas'}
              </p>
              <p className="camposPerfil">
                <strong>Viajas solito pibe ?</strong> {`${pref.compañia}` === 'A' ? 'Solo' : 'No, Acompañado'}
              </p>
              <p className="camposPerfil">
                <strong>Te interesan destinos turisticos o poco turisticos</strong> {`${pref.turistico}` === 'S' ? 'Turisticos' : 'No turisticos'}
              </p>
              <p className="camposPerfil">
                <strong>Viajas con mascotas ? Te interesan lugar pet-frendly</strong> {`${pref.pets}` === 'S' ? 'Si' : 'No'}
              </p>
              <p className="camposPerfil">
                <strong>Prefieres opciones veganas ?</strong> {`${pref.vegano}` === 'S' ? 'Si' : 'No'}
              </p>
              <p className="camposPerfil">
                <strong>Cuentas con capacidades diferestes al resto ?</strong> {`${pref.capacidades_diferentes}` === 'S' ? 'Si' : 'No'}
              </p>
              <br/>
              <br/>

              <Link className="botonAccion" to="/">
                Modificar gustos y preferencias
              </Link>
              <br/><br/><br />
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

        case "config":
        return (
          <div className="contenedorVista">
            <div  >
              <h2 className="login-title">Configuración Avanzada</h2>
              <p className="Parrafo1">
                En esta sección puedes configurar los detalles de tu cuenta para tener la mejor experiencia.
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
    <div className="perfil-centrado">

      

      <div className="sidebar">
        <h2 className="perfil-nombre">Bienvenido {`${usuario.nombre}`}</h2>

        <div
              className="contenedorTres"
              style={{
                backgroundImage: `url(${EjemploPerfil})`, // Asegúrate de usar la interpolación correcta*/
                backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
                backgroundPosition: "center", // Centra la imagen
              }}
        >
        </div>

        <br/>

        <ul>
          <li
            className={activeSection === "info" ? "active" : ""}
            onClick={() => setActiveSection("info")}
          >
            Información personal
          </li>

          <li
            className={activeSection === "pref" ? "active" : ""}
            onClick={() => setActiveSection("pref")}
          >
            Preferencias
          </li>

          <li
            className={activeSection === "notifications" ? "active" : ""}
            onClick={() => setActiveSection("notifications")}
          >
            Notificaciones
          </li>

          <li
            className={activeSection === "planes" ? "active" : ""}
            onClick={() => setActiveSection("planes")}
          >
            Mis planes
          </li>

          <li
            className={activeSection === "config" ? "active" : ""}
            onClick={() => setActiveSection("config")}
          >
            Configuración avanzada
          </li>

          <br/>

          <button className="botonCerrar"
            onClick={() => setActiveSection("logout")}>
            Cerrar Sesión
          </button>

        </ul>
      </div>
      <main className="content">{renderContent()}</main>
    </div>


    <div className="complemento0"></div>

    </>
  );
};

export default Perfil;