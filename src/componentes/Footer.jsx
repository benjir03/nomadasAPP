import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#f1f1f1', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      <p>&copy; {new Date().getFullYear()} Nómadas. Todos los derechos reservados.</p>
      <div style={{ marginTop: '10px' }}>
        <a href="/about" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Acerca de</a>
        <a href="/contact" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Contacto</a>
        <a href="/privacy" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Política de Privacidad</a>
      </div>
    </footer>
  );
}

export default Footer;