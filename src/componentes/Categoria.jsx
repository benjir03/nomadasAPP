import React, { useState } from "react";
import "../estilos/styCate.css";  // Cambié el nombre del archivo CSS
import BotonRegresar from "../componentes/BotonRegresar";
import FichaActividad from "../componentes/FichaActividad"; // Asegúrate de que esta ruta sea correcta

function Categoria({ titulo, descripcion }) {
  const [ciudad, setCiudad] = useState("");

  const handleFiltrar = () => {
    // Aquí puedes agregar la lógica para filtrar según la ciudad
    console.log("Filtrando por ciudad:", ciudad);
  };

  const actividades = [
    { titulo: "Actividad 1", descripcion: "Descripción de actividad 1" },
    { titulo: "Actividad 2", descripcion: "Descripción de actividad 2" },
    { titulo: "Actividad 3", descripcion: "Descripción de actividad 3" },
    { titulo: "Actividad 4", descripcion: "Descripción de actividad 4" },
    { titulo: "Actividad 5", descripcion: "Descripción de actividad 5" },
    { titulo: "Actividad 6", descripcion: "Descripción de actividad 6" },
    { titulo: "Actividad 7", descripcion: "Descripción de actividad 7" },
    { titulo: "Actividad 8", descripcion: "Descripción de actividad 8" },
    { titulo: "Actividad 9", descripcion: "Descripción de actividad 9" },
  ];

  return (
    <div>
      {/* Sección de bienvenida */}
      <section className="contenedorUno">
        {/* Botón de regresar en la esquina superior izquierda */}
        <div className="botonRegresar">
          <BotonRegresar />
        </div>

        {/* Contenedor principal */}
        <div className="contenedorDos">
          <h1>{titulo}</h1>
          <p>{descripcion}</p>
        </div>

        {/* Sección inferior izquierda dentro de la imagen */}
        <div className="infoCategoria">
          <h2>Categoria</h2>
          <p>info categoria</p>
        </div>
      </section>

      {/* Sección para ingresar la ciudad y filtrar */}
      <section className="filtrarCiudad">
        <h3>Ingresa una ciudad</h3>
        <div className="inputCiudad">
          <input
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Escribe el nombre de la ciudad"
            className="inputText"
          />
          <button
            onClick={handleFiltrar}
            className="botonFiltrar"
          >
            Filtrar
          </button>
        </div>
      </section>

      {/* Contenedor de FichaActividad para 9 elementos (3 por fila) */}
      <section className="fichaContenedor">
        {actividades.map((actividad, index) => (
          <FichaActividad
            key={index}
            titulo={actividad.titulo}
            descripcion={actividad.descripcion}
          />
        ))}
      </section>

      {/* Texto de "Mas actividades" al final */}
      <section className="masActividades">
        <p className="textoMasActividades">Mas actividades</p>
      </section>
    </div>
  );
}

export default Categoria;
