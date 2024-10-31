import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InicioSesion() {
  return (
    <div className="d-flex flex-column align-items-center" style={{ marginTop: '50px' }}>
      
      {/* Título */}
      <h1>¿Listo para crear el plan perfecto?</h1>
      
      {/* Subtítulo */}
      <p style={{ fontSize: 'smaller' }}>Iniciar sesión</p>
      
      {/* Formulario de inicio de sesión */}
      <div style={{ width: '300px', textAlign: 'left' }}>
        
        {/* Campo de correo */}
        <input
          type="email"
          placeholder="Ingresa tu correo"
          className="form-control mb-3"
          style={{ fontSize: 'large' }}
        />
        
        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          className="form-control mb-3"
          style={{ fontSize: 'large' }}
        />
        
        {/* Botón de entrar */}
        <button className="btn btn-primary w-100 mb-3">¡ENTRA!</button>
        
        {/* Checkbox de mantener sesión iniciada */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="mantenerSesion"
          />
          <label className="form-check-label" htmlFor="mantenerSesion">
            Mantener sesión iniciada
          </label>
        </div>
        
        {/* Enlace de olvido de contraseña */}
        <p style={{ fontSize: 'smaller', color: 'blue', cursor: 'pointer' }}>
          <u>¿Olvidaste tu contraseña?</u>
        </p>
        
        {/* Enlace de registro */}
        <p style={{ fontSize: 'smaller' }}>
          ¿No eres un nómada?{' '}
          <span style={{ color: 'blue', cursor: 'pointer' }}>
            <u>Regístrate aquí</u>
          </span>
        </p>
      </div>
    </div>
  );
}
