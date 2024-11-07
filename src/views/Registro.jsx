import React, { useState } from 'react';
import InicioRegistro from '../componentes/InicioRegistro';

const Registro = () => {
    return (
      <InicioRegistro ruta = "/usuario/insertar" accion="store" boton="Quiero ser un nomada"/>
    );
};

export default Registro;
