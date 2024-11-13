function Footer() {
  return (
    <footer style={{ backgroundColor: '#f1f1f1', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <p>&copy; {new Date().getFullYear()} Nómadas. Todos los derechos reservados.</p>
        <p>Nómadas y el logo de NómadasApp son marcas registradas o marcas comerciales de Nómadas, Inc.</p>

       

        {/* Social Media */}
        <div style={{ marginTop: '20px' }}>
          <h4>Social Media</h4>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <img src={require('../imgs/facebook.png')} alt="Facebook" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <img src={require('../imgs/twitter.png')} alt="Twitter" style={{ width: '24px', height: '24px' }} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <img src={require('../imgs/instagram.png')} alt="Instagram" style={{ width: '24px', height: '24px' }} />
          </a>
        </div>
         {/* Enlaces de navegación */}
         <div style={{ marginTop: '10px' }}>
          <a href="/about" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Acerca de</a>
          <a href="/contact" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Contacto</a>
          <a href="/privacy" style={{ margin: '0 10px', color: '#007bff', textDecoration: 'none' }}>Política de Privacidad</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
