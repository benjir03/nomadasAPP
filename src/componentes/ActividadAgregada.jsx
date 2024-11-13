import React from 'react';
import "../estilos/RevisarPlan.css";

const ActividadAgregada = ({ nombre, ubicacion, horario }) => {
  return (
    <div className="contenedorLugar">
      <img className="imagenLugar" src="ruta_de_tu_imagen.jpg" alt="Lugar" />
      <div className="informacionLugar">
        <p className="nombreLugar">{nombre}</p>
        <p className="ubicacionLugar">{ubicacion}</p>
        <p className="horarioLugar">{horario}</p>
      </div>
      <div className="botonesAccion">
        <button className="botonAccion2">Ver</button>
        <button className="botonAccion3">Eliminar</button>
      </div>
    </div>
  );
};

export default ActividadAgregada;
