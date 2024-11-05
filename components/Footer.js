import React from 'react';
import './Footer.css'; // Si tienes estilos específicos para Footer

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <p>Acerca de nosotros</p>
        <a href="#">Equipo</a>
      </div>
      <div>
        <p>Síguenos</p>
        <a href="#">Instagram</a>
        <a href="#">Youtube</a>
      </div>
      <div>
        <p>¿Necesitas ayuda?</p>
        <a href="#">Contáctanos</a>
      </div>
    </div>
  );
};

export default Footer;
