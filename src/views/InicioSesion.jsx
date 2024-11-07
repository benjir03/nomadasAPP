import React from 'react';
import InicioRegistro from '../componentes/InicioRegistro';

const InicioSesion = () => {
  return (
    <InicioRegistro 
    accion="enviar" 
    boton="Iniciar sesion"
    mensaje="Iniciar sesion"/>
  );
};

export default InicioSesion;