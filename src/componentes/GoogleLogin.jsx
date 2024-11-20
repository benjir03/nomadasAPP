// GoogleLogin.jsx
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginComponent = ({ onGoogleSuccess }) => {
    const responseGoogle = (response) => {
        const { profileObj } = response;
        if (profileObj) {
            // Estructura uniforme de datos
            const userData = {
                nombre: profileObj.givenName,
                apellido: profileObj.familyName,
                correo: profileObj.email,
            };
            onGoogleSuccess(userData);
        } else {
            console.error("Error en la autenticación con Google");
        }
    };

    return (
        <GoogleLogin
            clientId="226964234531-b8fnlu7fh96jlikvns9fmd745m6crclh.apps.googleusercontent.com"
            buttonText="Iniciar sesión con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};

export default GoogleLoginComponent;
