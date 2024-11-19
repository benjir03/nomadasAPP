import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import React from "react";
//Inicio Google
function Login({ onGoogleSuccess }) {
//Exito
    const onSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Inicio de sesión exitoso: ", decoded);
        onGoogleSuccess(decoded); // Pasar los datos al componente padre
    };
//Fallo
    const onFailure = (error) => {
        console.log("Inicio de sesión fallido", error);
    };
//Boton
    return (
        <div id="signInButton">
            <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
        </div>
    );
}

export default Login;
