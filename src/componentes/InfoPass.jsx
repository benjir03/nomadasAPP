import React from 'react'
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';

const InfoPass = () => {
        
    return (
        <div className="login-container">
            <h1 className="login-title">Recuperación de contraseña</h1>
            <div className="login-form">
                <p className="login-button">El correo con la información necesaria para restablecer tu contraseña ha sido enviado</p>
            </div>
        </div>
    )
}

export default InfoPass;