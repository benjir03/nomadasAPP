import React, { useEffect, useState, useContext } from "react";
import "../estilos/styGeneral.css";
import "../estilos/styInicioRegistro.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogin from "../componentes/GoogleLogin";
import { jwtDecode } from "jwt-decode";
import { BackRegistro } from "../imgs/ArchivoImgs"; 
import {
  validarCorreo,
  validarContrasena,
} from "../validaciones/validacionesInicioSesion";
import { gapi } from "gapi-script";
import MetaLogin from "./MetaLogin";
import { AuthContext } from "../context/auth";

const clientId =
  "226964234531-b8fnlu7fh96jlikvns9fmd745m6crclh.apps.googleusercontent.com";

const InicioRegistro = ({ accion, boton, mensaje }) => {
  //Constantes de envio de formulario
const { login } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [genero, setGenero] = useState("");
  const [birthday, setBirthday] = useState("");
  const [contraseña, setContrasena] = useState("");
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  //Validaciones
  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    setErrores(nuevosErrores);

    const errorCorreo = validarCorreo(correo);
    if (errorCorreo) nuevosErrores.correo = errorCorreo;

    const erroresContrasena = validarContrasena(contraseña);
    if (erroresContrasena.length > 0)
      nuevosErrores.contraseña = erroresContrasena;
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  //Google y Meta
  const handleSocialSuccess = (userData) => {
    // Actualiza los campos con los datos recibidos
    if (userData.nombre) setNombre(userData.nombre);
    if (userData.apellido) setApellido(userData.apellido);
    if (userData.correo) setCorreo(userData.correo);
    if (userData.genero) setGenero(userData.genero);
    if (userData.fecha_nacimiento) setBirthday(userData.fecha_nacimiento);

    // Llama a la función store automáticamente para enviar los datos
    accion === "store" ? store(userData) : enviar(userData);
  };
  //Login
  const enviar = async (userData = null) => {
    // Si se proporcionan datos de usuario de redes sociales, actualiza los campos
    if (userData) {
      if (userData.correo) setCorreo(userData.correo);
    }
    const URI = "http://localhost:3001/auth/login";
    const requestData = {
      correo: userData.correo
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        requestData,
        { withCredentials: true }
      );
      console.log(response.data.message); // Mensaje de éxito
      login();
      navigate("/Perfil"); // Redirige a Perfil
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Hubo un problema con el inicio de sesión.");
    }
  };
  //Registro
  const store = async (userData = null) => {
    // Si se proporcionan datos de usuario de redes sociales, actualiza los campos
    if (userData) {
      if (userData.nombre) setNombre(userData.nombre);
      if (userData.apellido) setApellido(userData.apellido);
      if (userData.correo) setCorreo(userData.correo);
      if (userData.genero) setGenero(userData.genero);
      if (userData.fecha_nacimiento) setBirthday(userData.fecha_nacimiento);
    }
    const URI = "http://localhost:3001/usuario/insertar";
    try {
      const requestData = {
        nombre: userData.nombre, // Usa el valor actual o una cadena vacía
        apellido: userData.apellido,
        correo: userData.correo,
        imagen: userData.imagen,
        genero: userData.genero || '',
        fecha_nacimiento: userData.fecha_nacimiento || '',
      };
      // Envía los datos al backend
      const response = await axios.post(
        "http://localhost:3001/usuario/insertar",
        requestData,
        { withCredentials: true }
      );
      console.log(response.data.message);
      navigate("/GustosPerfil");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("Hubo un problema con el registro. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="generalVista"
    style={{
      backgroundImage: `url(${BackRegistro})`, // Asegúrate de usar la interpolación correcta*/
      backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
      backgroundPosition: "center", // Centra la imagen
    }}
    >
      <div className="login-container">
      <h1 className="login-title">{mensaje}</h1>
        <form
                    className="login-form"
          a
          onSubmit={accion === "store" ? store : enviar}
        >

          <GoogleLogin
            onGoogleSuccess={(userData) =>
              handleSocialSuccess(userData, accion)
            }
          />
          <MetaLogin
            onFacebookSuccess={(userData) =>
              handleSocialSuccess(userData, accion)
            }
          />
        </form>
        
        <br />
        <br />
        <p className="forgot-password">
          {accion === "store" ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
        </p>
        <Link to={accion === "store" ? "/InicioSesion" : "/Registro"}>
          {accion === "store" ? "Inicia sesión" : "Regístrate"}
        </Link>
      </div>
    </div>
  );
};
export default InicioRegistro;
