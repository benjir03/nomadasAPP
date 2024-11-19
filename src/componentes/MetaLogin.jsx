import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({ onSuccess }) => {
    const responseFacebook = (response) => {
        if (response.status !== 'unknown') {
            // Extrae datos del usuario y pásalos al formulario
            const userData = {
                nombre: response.name,
                correo: response.email,
            };
            onSuccess("Datos de Meta", userData);
        } else {
            console.error('Error en la autenticación con Facebook');
        }
    };

    return (
        <FacebookLogin
            appId="450122651452431"
            autoLoad={false}
            fields="name, email"
            callback={responseFacebook}
            icon="fa-facebook"
        />
    );
};

export default FacebookLoginComponent;
