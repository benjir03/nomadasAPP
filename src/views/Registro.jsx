import React from 'react';
import InicioRegistro,{store} from '../componentes/InicioRegistro';

const Registro = () => {
    return (
      <InicioRegistro
      accion="store" 
      boton="Quiero ser un nomada"
      mensaje="Registrate"/>
    );
};

export default Registro;
