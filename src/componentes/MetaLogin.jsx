// MetaLogin.jsx
import React from 'react';
import FacebookLogin from 'react-facebook-login';

const MetaLogin = ({ onFacebookSuccess }) => {
    const responseFacebook = (response) => {
        if (response.status !== 'unknown') {
            // Estructura uniforme de datos
            const userData = {
                nombre: response.first_name, // Primer nombre
                apellido: response.last_name, // Resto del nombre como apellido
                correo: response.email,
                imagen: response.picture.data.url,
                genero: response.gender === 'male' ? 'M' : 'F',
                fecha_nacimiento: (() => {
                    const birthdayParts = response.birthday.split('/');
                    return `${birthdayParts[2]}/${birthdayParts[0]}/${birthdayParts[1]}`; // AAAA/MM/DD
                })(),
            };
            console.log(userData);
            onFacebookSuccess(userData);
        } else {
            console.error("Error en la autenticación con Facebook");
        }
    };

    return (
        <FacebookLogin
            appId="450122651452431"
            fields="first_name,last_name,email,picture,gender,birthday"
            scope="public_profile,email,user_gender,user_birthday" // Solicitar los permisos necesarios
            callback={responseFacebook}
            textButton="Iniciar sesión con Facebook"
            icon="fa-facebook"
        />
    );
};

export default MetaLogin;
