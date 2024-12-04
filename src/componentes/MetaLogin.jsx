// MetaLogin.jsx
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const MetaLogin = ({ onFacebookSuccess }) => {
    const responseFacebook = (response) => {
        if (response.status !== 'unknown') {
            // Estructura uniforme de datos
            const userData = {
                nombre: response.name.split(" ")[0], // Primer nombre
                apellido: response.name.split(" ").slice(1).join(" "), // Resto del nombre como apellido
                correo: response.email,
            };
            console.log(response);
            onFacebookSuccess(userData);
        } else {
            console.error("Error en la autenticación con Facebook");
        }
    };

    return (
        <FacebookLogin
            appId="450122651452431"
            fields="name,email"
            callback={responseFacebook}
            textButton="Iniciar sesión con Facebook"
            icon="fa-facebook"
        />
    );
};

export default MetaLogin;
