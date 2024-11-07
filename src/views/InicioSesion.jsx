import React, { useState } from "react";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css'; // Import your general styles
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  validarCorreo,
  validarContrasena,
} from "../validaciones/validacionesInicioSesion";

export default function InicioSesion() {
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

    // Si no hay errores, envía la solicitud de inicio de sesión
    if (Object.keys(nuevosErrores).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/login",
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
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      <form className="login-form" onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          className="input-field"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
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

        <button type="submit" className="login-button">Ingresar</button>
      </form>
      <a href="/forgot-password" className="forgot-password">¿Olvidaste tu contraseña?</a>
    </div>
  );
}
