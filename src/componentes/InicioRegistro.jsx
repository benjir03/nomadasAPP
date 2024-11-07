import React, { useState } from "react";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css'; // Import your general styles
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import { validarCorreo, validarContrasena, } from "../validaciones/validacionesInicioSesion";

const InicioRegistro = ({ruta, accion, boton}) => {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();
    
    const manejarEnvio = async (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    // Validación del correo
    const errorCorreo = validarCorreo(correo);
    if (errorCorreo) {
        nuevosErrores.correo = errorCorreo;
    }
    // Validación de la contraseña
    const erroresContrasena = validarContrasena(contrasena);
    if (erroresContrasena.length > 0) {
        nuevosErrores.contrasena = erroresContrasena;
    }
    setErrores(nuevosErrores);
    };
    //Google
    const handleGoogleSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);
        console.log(decoded); // Verifica que los datos están bien
        setGoogleData(decoded); // Almacena los datos de Google en el estado
    };
    //Login
    const enviar = async (e) =>{
        e.preventDefault();
        manejarEnvio(e);
        
        if (Object.keys(nuevosErrores).length === 0) {
            try {
            const response = await axios.post(
                ruta,
                {
                correo,
                contraseña: contrasena,
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
                    const requestData = {
                        nombre: googleData?.name,
                        correo: googleData?.email || correo,
                        contraseña,
                        google_id: googleData?.sub,
                        picture: googleData?.picture,
                    };
                  const response = await axios.post(ruta, requestData, { withCredentials: true }); // Envío de cookies
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
            <h1 className="login-title">Iniciar Sesión</h1>
        <form className="login-form" onSubmit={accion}>
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
                value={contrasena}
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