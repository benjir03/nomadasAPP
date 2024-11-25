import React, { useEffect, useState } from 'react'
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validarCorreo } from "../validaciones/validacionesInicioSesion";

const Verificar = () => {
        //Constantes de envio de formulario
        const [correo, setCorreo] = useState("");
        const navigate = useNavigate();
        const [errores, setErrores] = useState({});
        //Validaciones
        const manejarEnvio = (e) => {
            e.preventDefault();
            const nuevosErrores = {};
            setErrores(nuevosErrores);
            
            const errorCorreo = validarCorreo(correo);
            if (errorCorreo) nuevosErrores.correo = errorCorreo;
        };
        
        const enviar = async (userData = null) =>{
            // Si se proporcionan datos de usuario de redes sociales, actualiza los campos
            if (userData) {
                if (userData.correo) setCorreo(userData.correo);
            }
            const URI = "http://localhost:3001/usuario/olvido";
            const requestData = {
                correo: correo,
            };
                try {
                const response = await axios.get(URI, requestData, { withCredentials: true });
                console.log(response.data.message); // Mensaje de éxito
                navigate("/InfoPass"); // Redirige a Perfil
                } catch (error) {
                console.error( "Error al iniciar sesión:", error);
                alert("Hubo un problema con el inicio de sesión.");
                }
        }
    
    return (
        <div className="login-container">
                <h1 className="login-title">Recupera tu contraseña</h1>
            <form className="login-form" a onSubmit={enviar}>
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="input-field"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                <button type="submit" className="login-button">Enviar correo</button>
            </form>
        </div>
    )
}

export default Verificar;