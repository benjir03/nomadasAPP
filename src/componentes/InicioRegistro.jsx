import React, { useEffect, useState } from "react";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import GoogleLogin from "../componentes/GoogleLogin";
import {jwtDecode} from 'jwt-decode';
import { validarCorreo, validarContrasena, } from "../validaciones/validacionesInicioSesion";
import { gapi } from "gapi-script";
import MetaLogin from "./MetaLogin";


const clientId = "226964234531-b8fnlu7fh96jlikvns9fmd745m6crclh.apps.googleusercontent.com";

const InicioRegistro = ({accion, boton, mensaje}) => {
    //Constantes de envio de formulario
    const [correo, setCorreo] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
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
        if (erroresContrasena.length > 0) nuevosErrores.contraseña = erroresContrasena;
    };
    
    useEffect(() =>{
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        gapi.load('client:auth2', start);
    },[]);
    //Google y Meta
    const handleSocialSuccess = (userData) => {
        // Actualiza los campos con los datos recibidos
        if (userData.nombre) setNombre(userData.nombre);
        if (userData.apellido) setApellido(userData.apellido);
        if (userData.correo) setCorreo(userData.correo);
        
        // Llama a la función store automáticamente para enviar los datos
        accion === "store" ? store(userData) : enviar(userData);
    };
    //Login
    const enviar = async (userData = null) =>{
        // Si se proporcionan datos de usuario de redes sociales, actualiza los campos
        if (userData) {
            if (userData.correo) setCorreo(userData.correo);
        }
        const URI = "http://localhost:3001/auth/login";
        const requestData = {
            correo: userData.correo || correo,
            contraseña: contraseña,
        };
            try {
            const response = await axios.post(URI, requestData, { withCredentials: true });
            console.log(response.data.message); // Mensaje de éxito
            navigate("/Perfil"); // Redirige a Perfil
            } catch (error) {
            console.error( "Error al iniciar sesión:", error);
            alert("Hubo un problema con el inicio de sesión.");
            }
    }
    //Registro
    const store = async (userData = null) => {
        // Si se proporcionan datos de usuario de redes sociales, actualiza los campos
        if (userData) {
            if (userData.nombre) setNombre(userData.nombre);
            if (userData.apellido) setApellido(userData.apellido);
            if (userData.correo) setCorreo(userData.correo);
        }

        const URI = "http://localhost:3001/usuario/insertar";
        const requestData = {
            nombre: userData.nombre || "", // Usa el valor actual o una cadena vacía
            apellido: userData.apellido || "",
            correo: userData.correo || correo,
            contraseña: contraseña || "",
        };
        try {
            // Envía los datos al backend
            const response = await axios.post(URI, requestData, { withCredentials: true });
            console.log(response.data.message);
            navigate("/Verificar");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            alert("Hubo un problema con el registro. Inténtalo de nuevo.");
        }
    };
    
    return (
        <div className="login-container">
            <h1 className="login-title">{mensaje}</h1>
        <form className="login-form" a onSubmit={accion === "store" ? store : enviar}>
            <input
                type="email"
                placeholder="Ingresa tu correo"
                className="input-field"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="input-field"
                value={contraseña}
                onChange={(e) => setContrasena(e.target.value)}
            />
            {errores.contrasena &&
                errores.contrasena.map((error, index) => (
                <p key={index} className="error">
                    {error}
                </p>
                ))}
            
            <button type="submit" className="login-button">{boton}</button>
            <GoogleLogin onGoogleSuccess={(userData) => handleSocialSuccess(userData, accion)} />
            <MetaLogin onFacebookSuccess={(userData) => handleSocialSuccess(userData, accion)} />
        </form>
            <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
            <br />
            <p className="forgot-password">{accion === "store" ? "Ya tienes cuenta ?" : "No tienes cuenta"}</p>
            <Link to={accion === "store" ? "/InicioSesion" : "/Registro"}>{accion === "store" ? "Inicia sesion" : "Registrate"}</Link>
        </div>
    );
}
export default InicioRegistro;