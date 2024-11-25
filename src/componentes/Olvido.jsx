import React, { useState } from 'react'
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../componentes/GoogleLogin";
import MetaLogin from "./MetaLogin";

const Verificar = () => {
        //Constantes de envio de formulario
        const [correo, setCorreo] = useState("");
        const navigate = useNavigate();
        const [errores, setErrores] = useState({});
        //Validaciones

        const handleSocialSuccess = (userData) => {
            // Actualiza los campos con los datos recibidos
            if (userData.correo) setCorreo(userData.correo);
            
            // Llama a la función store automáticamente para enviar los datos
            enviar(userData);
        };
        
        const enviar = async (userData = null) =>{
                try {
                    if (userData) {
                        if (userData.correo) setCorreo(userData.correo);
                    }
                    const URI = "http://localhost:3001/usuario/olvido";
                    const requestData = {
                        correo: userData.correo || correo,
                    };
                    
                    console.log("Correo al que envio: ", requestData);
                    const response = await axios.post(URI, requestData, { withCredentials: true });
                    console.log(response.data.message); // Mensaje de éxito
                    navigate("/InfoPass"); // Redirige a Perfil
                
                } catch (error) {
                    console.error( "Error al enviar el correo:", error);
                    alert("Hubo un problema al enviar el correo.");
                }
        }
    
    return (
        <div className="login-container">
                <h1 className="login-title">Recupera tu contraseña</h1>
            <form className="login-form" a onSubmit={enviar}>
                {/*
                
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    className="input-field"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    name='correo'
                />
                <button type="submit" className="login-button">Enviar correo</button>

                */}
                
                <GoogleLogin onGoogleSuccess={(userData) => handleSocialSuccess(userData)} />
                <MetaLogin onFacebookSuccess={(userData) => handleSocialSuccess(userData)} />
            </form>
        </div>
    )
}

export default Verificar;