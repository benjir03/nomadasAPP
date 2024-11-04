import React from 'react';
import backgroundImage from '../imgs/inicioSesion.jpg'; 
import '../estilos/styInicioSesion.css'; 

export default function InicioSesion() {
  return (
    <div
      className="inicio-sesion-container"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Imagen de fondo
      }}
    >
      
      {/* Título */}
      <h1 className="inicio-sesion-title">¿Listo para crear el plan perfecto?</h1>
      
      {/* Subtítulo */}
      <p className="inicio-sesion-subtitle">Iniciar sesión</p>
      
      {/* Formulario de inicio de sesión */}
      <div className="inicio-sesion-form">
        
        {/* Campo de correo */}
        <input
          type="email"
          placeholder="Ingresa tu correo"
          className="inicio-sesion-input"
        />
        
        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          className="inicio-sesion-input"
        />
        
        {/* Botón de entrar */}
        <button className="inicio-sesion-button">¡ENTRA!</button>
        
        {/* Checkbox de mantener sesión iniciada */}
        <div className="inicio-sesion-checkbox">
          <input type="checkbox" id="mantenerSesion" />
          <label htmlFor="mantenerSesion">Mantener sesión iniciada</label>
        </div>
        
        {/* Enlace de olvido de contraseña */}
        <p className="inicio-sesion-link">
          <u>¿Olvidaste tu contraseña?</u>
        </p>
        
        {/* Enlace de registro */}
        <p className="inicio-sesion-link">
          ¿No eres un nómada?{' '}
          <span className="registro-link">
            <u>Regístrate aquí</u>
          </span>
        </p>
      </div>
    </div>
  );
}
