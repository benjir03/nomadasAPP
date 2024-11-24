import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondiArmarPlan from "../imgs/fondoArmarPlan.jpg";
import "../estilos/styArmarPlan.css";
import DescripLugar from "../componentes/DescripLugar"; // Importa el componente DescripLugar

export default function ArmarPlan() {
  const navigate = useNavigate();
  const [ciudad, setCiudad] = useState("");
  const [estancia, setEstancia] = useState("Unas cuantas horas");
  const [acompanantes, setAcompanantes] = useState("Voy solo");
  const [presupuesto, setPresupuesto] = useState(2)
  const handleExploraActividades = () => {
    navigate("/LugaresCarrusel", {
      state: { ciudad, estancia, acompanantes, presupuesto },
    });
  };

  return (
    <div className="contenedorVista">
      {/* Contenedor con imagen de fondo solo para la sección principal */}
      <div
        className="contenedorUno"
        style={{
          backgroundImage: `url(${fondiArmarPlan})`,
          height: `80vh`,
          backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
          backgroundPosition: "center", // Centra la imagen
        }}
      >
        <div className="contenedorDosDos">
          <div className="contenidoImagenPlan">
            <h1>Busquemos algo increíble</h1>
            <div className="selector-item">
              <label>Agregar Ciudad</label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              ></input>
            </div>
            <div className="selector-item">
              <label>Tiempo estimado de estancia</label>
              <select
                className="select-field"
                value={estancia}
                onChange={(e) => setEstancia(e.target.value)}
              >
                <option>Unas cuantas horas</option>
                <option>Un día</option>
                <option>Fin de semana</option>
              </select>
            </div>
            <div className="selector-item">
              <label>Acompañantes</label>
              <select
                className="select-field"
                value={acompanantes}
                onChange={(e) => setAcompanantes(e.target.value)}
              >
                <option>Voy solo</option>
                <option>Con pareja</option>
                <option>Familia/Amigos</option>
              </select>
            </div>
            <div className="selector-item">
              <label>Presupuesto</label>
              <input
                type="range"
                className="range-field"
                value={presupuesto}
                min="0"
                max="4"
                onChange={(e) => setPresupuesto(e.target.value)}
              />
            </div>
            <button
              className="search-button"
              onClick={handleExploraActividades}
            >
              Explora actividades
            </button>
            <div className="button-container"></div>
          </div>
        </div>
      </div>

      {/* Componente DescripLugar */}
      <DescripLugar /> {/* Agrega el componente DescripLugar aquí */}
    </div>
  );
}
