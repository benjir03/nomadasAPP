import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registro() {
  return (
    <div className="d-flex flex-column align-items-center" style={{ marginTop: '50px' }}>
      
      {/* Título */}
      <h1>El mundo no se va a conquistar solo</h1>
      
      {/* Subtítulo */}
      <p style={{ fontSize: 'smaller' }}>Regístrate</p>
      
      {/* Formulario de registro */}
      <div style={{ width: '300px', textAlign: 'left' }}>
        
        {/* Campo de correo */}
        <input
          type="email"
          placeholder="Ingresa un correo"
          className="form-control mb-3"
          style={{ fontSize: 'large' }}
        />
        
        {/* Campo de contraseña */}
        <input
          type="password"
          placeholder="Ingresa una contraseña"
          className="form-control mb-3"
          style={{ fontSize: 'large' }}
        />
        
        {/* Campo de confirmación de contraseña */}
        <input
          type="password"
          placeholder="Confirma tu contraseña"
          className="form-control mb-3"
          style={{ fontSize: 'large' }}
        />
        
        {/* Botón de registrarse */}
        <button className="btn btn-primary w-100 mb-3">¡Quiero ser un Nomada!</button>
        
        {/* Enlace de inicio de sesión */}
        <p style={{ fontSize: 'smaller' }}>
          ¿Ya eres un nómada?{' '}
          <span style={{ color: 'blue', cursor: 'pointer' }}>
            <u>Ingresa aquí</u>
          </span>
        </p>
      </div>
    </div>
  );
}
