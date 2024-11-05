import React, { useState } from 'react';
import backgroundImage from '../imgs/fondoRegistrarse.jpg';
import '../estilos/styRegistro.css'; 
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
  
  return (
    <div
      className="registro-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <form action={store}>
        
      </form>
      {/* Título */}
      <h1 className="registro-title">El mundo no se va a conquistar solo</h1>
      
      {/* Subtítulo */}
      <p className="registro-subtitle">Regístrate</p>
      
      {/* Formulario de registro */}
      <div className="registro-form">
        
        {/* Campo de correo */}
        <input
          type="email"
          placeholder="Ingresa un correo"
          className="registro-input"
        />
        
        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Ingresa una contraseña"
          className="registro-input"
        />
        
        {/* Campo de confirmación de contraseña */}
        <input
          type="password"
          placeholder="Confirma tu contraseña"
          className="registro-input"
        />
        
        {/* Botón de registrarse */}
        <button className="registro-button">¡Quiero ser un Nómada!</button>
        
        {/* Enlace de inicio de sesión */}
        <p className="registro-link">
          ¿Ya eres un nómada?{' '}
          <span className="registro-login-link">
            <u>Ingresa aquí</u>
          </span>
        </p>
      </div>
    </div>
  );
}
