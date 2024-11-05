import React, { useState } from 'react';
import backgroundImage from '../imgs/fondoRegistrarse.jpg';
import '../estilos/styRegistro.css'; 
import { validarCorreo, validarContrasena, confirmarContrasena, validarNombre, validarFechaNacimiento, validarGenero, validarTelefono } from '../validaciones/validacionesRegistro';

export default function Registro() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [telefono, setTelefono] = useState('');
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

    // Validación del nombre
    const errorNombre = validarNombre(nombre);
    if (errorNombre) {
      nuevosErrores.nombre = errorNombre;
    }

    // Validación de la fecha de nacimiento
    const errorFechaNacimiento = validarFechaNacimiento(fechaNacimiento);
    if (errorFechaNacimiento) {
      nuevosErrores.fechaNacimiento = errorFechaNacimiento;
    }

    // Validación del género
    const errorGenero = validarGenero(genero);
    if (errorGenero) {
      nuevosErrores.genero = errorGenero;
    }

    // Validación del teléfono
    const errorTelefono = validarTelefono(telefono);
    if (errorTelefono) {
      nuevosErrores.telefono = errorTelefono;
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      console.log("Formulario enviado");
    }
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
      
      <form className="registro-form" onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          className="registro-input"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}

        <input
          type="date"
          placeholder="Fecha de nacimiento"
          className="registro-input"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
        {errores.fechaNacimiento && <p className="error">{errores.fechaNacimiento}</p>}

        <select
          className="registro-input"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="">Selecciona tu género</option>
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
        </select>
        {errores.genero && <p className="error">{errores.genero}</p>}

        <input
          type="tel"
          placeholder="Ingresa tu teléfono"
          className="registro-input"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        {errores.telefono && <p className="error">{errores.telefono}</p>}

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
