import React from "react";
import InicioRegistro from "../componentes/InicioRegistro";

const InicioSesion = () => {
  return (
    <InicioRegistro
      accion="enviar"
      boton="Inicia sesión"
      mensaje="Iniciar sesión"
    />
  );
};

export default InicioSesion;
