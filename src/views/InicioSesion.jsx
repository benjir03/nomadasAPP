import React, { useState } from 'react';
import backgroundImage from '../imgs/inicioSesion.jpg'; 
import '../estilos/styInicioSesion.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { validarCorreo, validarContrasena } from '../validaciones/validacionesInicioSesion';

export default function InicioSesion() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
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
        const response = await axios.post('http://localhost:3001/auth/login', {
          correo,
          contraseña: contrasena
        }, { withCredentials: true });

        console.log(response.data.message); // Mensaje de éxito
        navigate('/Perfil'); // Redirige a Perfil
      } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data || error.message);
        alert('Hubo un problema con el inicio de sesión.');
      }
    }
  };

  return (
    <div
      className="inicio-sesion-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="inicio-sesion-title">¿Listo para crear el plan perfecto?</h1>
      <p className="inicio-sesion-subtitle">Iniciar sesión</p>
      
      <form className="inicio-sesion-form" onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          className="inicio-sesion-input"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {errores.correo && <p className="error">{errores.correo}</p>}
        
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          className="inicio-sesion-input"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        {errores.contrasena && errores.contrasena.map((error, index) => (
          <p key={index} className="error">{error}</p>
        ))}

        <button type="submit" className="inicio-sesion-button">¡ENTRA!</button>

        <div className="inicio-sesion-checkbox">
          <input type="checkbox" id="mantenerSesion" />
          <label htmlFor="mantenerSesion">Mantener sesión iniciada</label>
        </div>

        <p className="inicio-sesion-link">
          <u>¿Olvidaste tu contraseña?</u>
        </p>

        <p className="inicio-sesion-link">
          ¿No eres un nómada?{' '}
          <span className="registro-link">
            <u>Regístrate aquí</u>
          </span>
        </p>
      </form>
    </div>
  );
}
