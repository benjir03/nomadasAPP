import React, { useEffect, useState } from "react";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Login from "../componentes/GoogleLogin";
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
    const [errores, setErrores] = useState({});
    const [googleData, setGoogleData] = useState(null);
    const navigate = useNavigate();
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
    //Google
    const handleGoogleSuccess = (data) => {
        console.log(data); // Datos del usuario de Google
        setGoogleData(data);
        setCorreo(data.email); // Establecer el correo desde los datos de Google
        setNombre(data.given_name); // Establecer el correo desde los datos de Google
        setApellido(data.family_name); // Establecer el correo desde los datos de Google
    };
    //Meta
    const handleFacebookSuccess = (userData) => {
        console.log(userData)
        setNombre(userData.nombre);
        setCorreo(userData.correo);
        // Aquí puedes enviar los datos al servidor si es necesario
    };
    //Login
    const enviar = async (e) =>{
        e.preventDefault();
        manejarEnvio(e);
        
        if (Object.keys(errores).length === 0) {
            try {
            const response = await axios.post(
                "http://localhost:3001/auth/login",
                {
                correo,
                contraseña: contraseña,
                },
                { withCredentials: true }
            );
    
            console.log(response.data.message); // Mensaje de éxito
                navigate("/Perfil"); // Redirige a Perfil
            } catch (error) {
            console.error(
                "Error al iniciar sesión:",
                error.response?.data || error.message
            );
            alert("Hubo un problema con el inicio de sesión.");
            }
        }
    }
    //Registro
    const store = async ({googleUserData, userData}) => {
        const data = googleUserData || {}; // Si hay datos de Google, úsalos
        const datamet = userData || {};
        setCorreo(data.email || datamet.correo); // Establece el correo si es proporcionado por Google
        setNombre(data.given_name || datamet.nombre); // Establece el nombre si es proporcionado por Google
        setApellido(data.family_name); // Establece el apellido si es proporcionado por Google
        try {
            const URI = "http://localhost:3001/usuario/insertar";
            const requestData = {
                nombre: data.given_name || datamet.nombre,
                apellido: data.family_name,
                correo: data.email || correo || datamet.correo,
                contraseña: contraseña,
            };
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
                disabled={!!googleData} // Desactiva si ya hay datos de Google
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
            <Login onGoogleSuccess={accion === "store" ? store : enviar} />
            <MetaLogin onSuccess={handleFacebookSuccess}/>
        </form>
            <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
    );
}
export default InicioRegistro;