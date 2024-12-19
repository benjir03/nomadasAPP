import React, { useState } from 'react';
import "../estilos/RevisarPlan.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ActividadAgregada = ({ nombre, ubicacion, horario, imagen, onDelete, ID_actividad, ID_google}) => {
  const navigate = useNavigate();
  
  const VerActividad = async (id) => {
    try {
      const detailsUrl = `http://localhost:3002/place-details?place_id=${id}`;
      const detailsResponse = await axios.get(detailsUrl);
      const shortDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(
        nombre
      )}&exchars=100`;
      const shortDescResponse = await axios.get(shortDescUrl);

      const detailedDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(
        nombre
      )}&exchars=300`;
      const detailedDescResponse = await axios.get(detailedDescUrl);

      const placeData = {
        ...detailsResponse.data,
        id: id,
        imagen: imagen,
        descripcion_corta: shortDescResponse.data.description,
        descripcion: detailedDescResponse.data.description,
      };
      console.log({message: "Placedata ", placeData});
      navigate("/actividad", { state: placeData });
    } catch (error) {
      console.error("Error al obtener detalles del lugar:", error);
    }
  };
  
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
        <button className="botonAccion2" onClick={() => VerActividad(ID_google)}>Ver</button>
        <button className="botonAccion3" onClick={handleDelete}>Eliminar</button>
      </div>
    </div>
  );
};

export default ActividadAgregada;
