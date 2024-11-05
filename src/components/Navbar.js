// components/Navbar.js
import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <a href="#">Nómadas</a>
        <a href="#" className="active">Itinerario</a>
        <a href="#">Lugares</a>
        <a href="#">Historias</a>
      </div>
      <div className="perfil">
        <img src="avatar.png" alt="Icono de perfil" style={{ width: "30px", height: "30px", marginRight: "5px" }} />
        <a href="#">Mi perfil</a>
      </div>
    </div>
  );
}

export default Navbar;
