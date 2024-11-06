import React, { useState } from 'react';
import backgroundImage from '../imgs/fondoRegistrarse.jpg';
import '../estilos/styRegistro.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validarCorreo, validarContrasena, confirmarContrasena, validarNombre, validarFechaNacimiento, validarGenero, validarTelefono } from '../validaciones/validacionesRegistro';

const URI = "http://localhost:3001/usuario/insertar"; // URL correcta

const Registro = () => {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmacion, setConfirmacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [telefono, setTelefono] = useState('');
    const [errores, setErrores] = useState({});
    const navigate = useNavigate();
    
    const store = async(e) => {
      e.preventDefault();
      manejarEnvio(e);
  
      if (Object.keys(errores).length === 0) {
        try {
            const response = await axios.post(URI, {
                nombre,
                fecha_nacimiento: fechaNacimiento,
                correo,
                contraseña,
                genero,
                telefono,
            }, { withCredentials: true }); // Envío de cookies

            console.log(response.data.message); // Muestra mensaje de éxito
            navigate('/Perfil'); // Redirige al perfil
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un problema con el registro. Inténtalo de nuevo.');
        }
      }
    };  

    const manejarEnvio = (e) => {
      e.preventDefault();
      const nuevosErrores = {};

      // Validaciones
      const errorCorreo = validarCorreo(correo);
      if (errorCorreo) nuevosErrores.correo = errorCorreo;

      const erroresContrasena = validarContrasena(contraseña);
      if (erroresContrasena.length > 0) nuevosErrores.contraseña = erroresContrasena;

      const errorConfirmacion = confirmarContrasena(contraseña, confirmacion);
      if (errorConfirmacion) nuevosErrores.confirmacion = errorConfirmacion;

      const errorNombre = validarNombre(nombre);
      if (errorNombre) nuevosErrores.nombre = errorNombre;

      const errorFechaNacimiento = validarFechaNacimiento(fechaNacimiento);
      if (errorFechaNacimiento) nuevosErrores.fechaNacimiento = errorFechaNacimiento;

      const errorGenero = validarGenero(genero);
      if (errorGenero) nuevosErrores.genero = errorGenero;

      const errorTelefono = validarTelefono(telefono);
      if (errorTelefono) nuevosErrores.telefono = errorTelefono;

      setErrores(nuevosErrores);
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
          
          <div className="registro-input">
            <label>
              <input
                type="radio"
                name="genero"
                value="M"
                checked={genero === "M"}
                onChange={(e) => setGenero(e.target.value)}
              />
              Masculino
            </label>
            <label>
              <input
                type="radio"
                name="genero"
                value="F"
                checked={genero === "F"}
                onChange={(e) => setGenero(e.target.value)}
              />
              Femenino
            </label>
          </div>
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
