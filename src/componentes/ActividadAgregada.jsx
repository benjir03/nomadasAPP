import React, { useState } from 'react';
import "../estilos/RevisarPlan.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ActividadAgregada = ({ nombre, ubicacion, horario, imagen, onDelete, ID_actividad}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar esta actividad de tu plan?"
    );
    if (confirmDelete) {
      try {
        const requestData = {
          ID_actividad: ID_actividad,
        };
        console.log("Datos enviados:", requestData);
        await axios.delete("http://localhost:3001/plan/deleteActividad", {
          data: requestData, // Pasa los datos aquí
          withCredentials: true, // Si necesitas enviar cookies o credenciales
        });
        onDelete(nombre);
      } catch (error) {
        console.error("Error al eliminar la actividad:", error);
      }
    }
  };  
  
  return (
    <div className="contenedorLugar">
      <img className="imagenLugar" src={imagen} alt="Lugar" />
      <div className="informacionLugar">
        <p className="nombreLugar">{nombre}</p>
        <p className="ubicacionLugar">{ubicacion}</p>
        <p className="horarioLugar">{horario}</p>
      </div>
      <div className="botonesAccion">
        {/*
        <button className="botonAccion2">Ver</button> 
        */}
        <button className="botonAccion3" onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default ActividadAgregada;
