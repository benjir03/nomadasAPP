import React, { useState } from 'react';

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el correo electrónico al servidor
    setMessage('Si el correo es válido, se enviarán instrucciones para restablecer la contraseña.');
  };

  const handleHelpClick = () => {
    // Lógica para manejar la ayuda (podría redirigir a una página de soporte o mostrar más instrucciones)
    alert('Para más ayuda, contacta con el soporte o revisa las preguntas frecuentes en nuestra página de ayuda.');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      <h2>Restablecer Contraseña</h2>
      <p>Introduce tu dirección de correo electrónico o nombre de usuario, y te enviaremos un enlace para restablecer tu contraseña.</p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Enviar instrucciones
        </button>
      </form>
      {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default ResetPasswordPage;
