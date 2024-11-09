import React, { useState } from "react";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { validarCorreo, validarContrasena, } from "../validaciones/validacionesInicioSesion";

const InicioRegistro = ({accion, boton, mensaje}) => {
    
    const [correo, setCorreo] = useState("");
    const [contraseña, setContrasena] = useState("");
    const [errores, setErrores] = useState({});
    const [googleData, setGoogleData] = useState(null);
    const navigate = useNavigate();
    
    const manejarEnvio = (e) => {
        e.preventDefault();
        const nuevosErrores = {};
        setErrores(nuevosErrores);
        
        const errorCorreo = validarCorreo(correo);
        if (errorCorreo) nuevosErrores.correo = errorCorreo;
        
        const erroresContrasena = validarContrasena(contraseña);
        if (erroresContrasena.length > 0) nuevosErrores.contraseña = erroresContrasena;
    };
    
    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);
        console.log(decoded); // Verifica que los datos están bien
        setGoogleData(decoded); // Almacena los datos de Google en el estado
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
    const store = async (e) => {
        e.preventDefault();
        manejarEnvio(e);
        
        if (Object.keys(errores).length === 0) {
            try {
                const URI = "http://localhost:3001/usuario/insertar";
                    const requestData = {
                        nombre: googleData?.name,
                        correo: googleData?.email || correo,
                        contraseña,
                        google_id: googleData?.sub,
                        picture: googleData?.picture,
                    };
                  const response = await axios.post(URI, requestData, { withCredentials: true }); // Envío de cookies
                  console.log(response.data.message); // Muestra mensaje de éxito
                  navigate('/Completar'); // Redirige al perfil
                } catch (error) {
                    console.error('Error al registrar usuario:', error);
                    alert('Hubo un problema con el registro. Inténtalo de nuevo.');
                }
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
                disabled={!!googleData} // Desactiva si viene de Google
            />
            {errores.correo && <p className="error">{errores.correo}</p>}

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
            <div className='btn'>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() =>{
                    console.log('Inicio fallido');
                    }}
                    cookiePolicy={"single_host_policy"}
                />
            </div>
        </form>
            <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
    );
}
export default InicioRegistro;