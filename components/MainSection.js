import React from 'react';
import './Navbar.css'; // Si tienes estilos específicos para Navbar

const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <a href="#">Nómadas</a>
        <a href="#" className="active">Itinerario</a>
        <a href="#">Lugares</a>
        <a href="#">Historias</a>
      </div>
      <div className="perfil">
        <img src="avatar.png" alt="Icono de perfil" />
        <a href="#">Mi perfil</a>
      </div>
    </div>
  );
};

export default Navbar;
