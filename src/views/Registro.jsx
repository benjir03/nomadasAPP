import React, { useState } from 'react';
import backgroundImage from '../imgs/fondoRegistrarse.jpg';
import '../estilos/styRegistro.css'; 
<<<<<<< HEAD
import axios from 'axios';

const URI = 'http:://localhost/8000/'

export default function Registro() {
  const [nombre, setnombre] = useState('')
  const [fecha_nacimeinto, setfecha_nacimeinto] = useState('')
  const [correo, setcorreo] = useState('')
  const [contraseña, setcontraseña] = useState('')
  const [genero, setgenero] = useState('')
  const [telefono, settelefono] = useState('')
  const [verificado, setverificado] = useState('')
  const store = (e) => {
    e.preventDefault()
    axios.post(URI, {})
  }
  
=======
import { validarCorreo, validarContrasena, confirmarContrasena } from '../validaciones/validacionesRegistro';

export default function Registro() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [errores, setErrores] = useState({});

  const manejarEnvio = (e) => {
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

    // Confirmación de la contraseña
    const errorConfirmacion = confirmarContrasena(contrasena, confirmacion);
    if (errorConfirmacion) {
      nuevosErrores.confirmacion = errorConfirmacion;
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      console.log("Formulario enviado");
    }
  };

>>>>>>> 511b859dbdd773050442ba6bf8a34778d8f39bf5
  return (
    <div
      className="registro-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
<<<<<<< HEAD
      <form action={store}>
        
      </form>
      {/* Título */}
=======
>>>>>>> 511b859dbdd773050442ba6bf8a34778d8f39bf5
      <h1 className="registro-title">El mundo no se va a conquistar solo</h1>
      <p className="registro-subtitle">Regístrate</p>
      
      <form className="registro-form" onSubmit={manejarEnvio}>
        <input
          type="email"
          placeholder="Ingresa un correo"
          className="registro-input"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {errores.correo && <p className="error">{errores.correo}</p>}
        
        <input
          type="password"
          placeholder="Ingresa una contraseña"
          className="registro-input"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        {errores.contrasena && errores.contrasena.map((error, index) => (
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

        <p className="registro-link">
          ¿Ya eres un nómada?{' '}
          <span className="registro-login-link">
            <u>Ingresa aquí</u>
          </span>
        </p>
      </form>
    </div>
  );
}
