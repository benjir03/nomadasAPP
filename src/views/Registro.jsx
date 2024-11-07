import React, { useState } from 'react';
import backgroundImage from '../imgs/fondoRegistrarse.jpg';
import '../estilos/styRegistro.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validarCorreo, validarContrasena, validarNombre } from '../validaciones/validacionesRegistro';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

const URI = "http://localhost:3001/usuario/insertar"; // URL correcta

const Registro = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [errores, setErrores] = useState({});
    const [googleData, setGoogleData] = useState(null); // Estado para los datos de Google
    const navigate = useNavigate();
    
    const store = async (e) => {
      e.preventDefault();
      manejarEnvio(e);

      if (Object.keys(errores).length === 0) {
        try {
            const requestData = {
                nombre: googleData?.name || nombre,
                correo: googleData?.email || correo,
                contraseña,
                google_id: googleData?.sub,
                picture: googleData?.picture,
            };
            
            const response = await axios.post(URI, requestData, { withCredentials: true }); // Envío de cookies

            console.log(response.data.message); // Muestra mensaje de éxito
            navigate('/Completar'); // Redirige al perfil
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un problema con el registro. Inténtalo de nuevo.');
        }
      }
    };

    const manejarEnvio = (e) => {
      e.preventDefault();
      const nuevosErrores = {};
      setErrores(nuevosErrores);
      
      // Validaciones
      const errorNombre = validarNombre(nombre);
      if (errorNombre) nuevosErrores.nombre = errorNombre;


      const errorCorreo = validarCorreo(correo);
      if (errorCorreo) nuevosErrores.correo = errorCorreo;
      
      const erroresContrasena = validarContrasena(contraseña);
      if (erroresContrasena.length > 0) nuevosErrores.contraseña = erroresContrasena;
    };

    const handleGoogleSuccess = (credentialResponse) => {
      const decoded = jwtDecode(credentialResponse?.credential);
      console.log(decoded); // Verifica que los datos están bien
      setGoogleData(decoded); // Almacena los datos de Google en el estado
    };
    
    return (
      <div
        className="registro-container"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="registro-title">El mundo no se va a conquistar solo</h1>
        <p className="registro-subtitle">Regístrate</p>
        
        <form className="registro-form" onSubmit={store}>
          <input
            type="text"
            placeholder="Ingresa tu nombre"
            className="registro-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={!!googleData} // Desactiva si viene de Google
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
          
          <input
            type="email"
            placeholder="Ingresa un correo"
            className="registro-input"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            disabled={!!googleData} // Desactiva si viene de Google
          />
          {errores.correo && <p className="error">{errores.correo}</p>}
          
          <input
            type="password"
            placeholder="Ingresa una contraseña"
            className="registro-input"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          {errores.contraseña && errores.contraseña.map((error, index) => (
            <p key={index} className="error">{error}</p>
          ))}
          
          <input
            type="password"
            placeholder="Confirma tu contraseña"
            className="registro-input"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
          />
          {errores.confirmacion && <p className="error">{errores.confirmacion}</p>}
          <button type="submit" className="registro-button">¡Quiero ser un Nómada!</button>
          <div className='btn'>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>{
                console.log('Inicio fallido');
              }}
              cookiePolicy={"single_host_policy"}
            />
          </div>
          <p className="registro-link">
            ¿Ya eres un nómada?{' '}
            <span className="registro-login-link">
              <u>Ingresa aquí</u>
            </span>
          </p>
        </form>
      </div>
    );
};

export default Registro;
