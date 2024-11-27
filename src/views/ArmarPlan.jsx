import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fondiArmarPlan from "../imgs/piramid.jpg"; 
import "../estilos/styArmarPlan.css";
import FichaLugares from "../componentes/FichaLugares";
import Lugar1 from "../imgs/explora01.jpg";
import { Link } from "react-router-dom";

export default function ArmarPlan() {
  const navigate = useNavigate();
  const [ciudad, setCiudad] = useState("");
  const [estancia, setEstancia] = useState("Unas cuantas horas");
  const [acompanantes, setAcompanantes] = useState("Voy solo");
  const [presupuesto, setPresupuesto] = useState(1);
  const [categoria, setCategoria] = useState("");
  const [calificacionMinima, setCalificacionMinima] = useState("");
  const [ambiente, setAmbiente] = useState("");

  useEffect(() => {
    if (acompanantes === "Voy solo") {
      setAmbiente("Tranquilo");
    } else if (acompanantes === "Con pareja") {
      setAmbiente("Romántico");
    } else if (acompanantes === "Familia/Amigos") {
      setAmbiente("Familiar/Amistoso");
    }
  }, [acompanantes]);

  const handleAgregarCiudad = () => {
    navigate("/AgregarCiudad", {
      state: {
        ciudad,
      },
    });
  };

  const handleExploraActividades = () => {
    navigate("/LugaresCarrusel", {
      state: {
        ciudad,
        estancia,
        acompanantes,
        presupuesto,
        categoria,
        calificacionMinima,
        ambiente,
      },
    });
  };

  return (
    <div className="contenedorVistaAP">
      <div
        className="contenedorUnoAP"
        style={{
          backgroundImage: `url(${fondiArmarPlan})`,
        }}
      >
        <div className="contenedorDos">
          <h1>Busquemos algo increíble</h1>
          <div className="contenidoImagenPlan">
            <div className="selector-item">
              <label>Buscar ciudad</label>
              <select
                className="select-field"
                value={ciudad}  
                onChange={(e) => setCiudad(e.target.value)}
              >
                <option>Ubicación actual</option>
                <option>Ciudad de México</option>
                <option>Jalisco</option>
                <option>Toluca de Lerdo</option>
                <option>Chilpancingo</option>
              </select>
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
              <label>Categoría</label>
              <select
                className="select-field"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="restaurant">Restaurantes</option>
                <option value="bar">Bares</option>
                <option value="cafe">Cafeterías</option>
                <option value="store">Tiendas</option>
                <option value="museum">Museos</option>
                <option value="park">Parques</option>
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
            <div className="button-container"></div>
          </div>
          <button className="botonAccion" onClick={handleExploraActividades}>
            Explora actividades
          </button>
          <button className="botonAccion" onClick={handleAgregarCiudad}>
            Agregar Ciudad
          </button>
        </div>
        
      </div>

      {/* Sección de lugares recomendados */}
      <section className="categoriasSec">
        <h2>Lugares Recomendados</h2>
        <div className="categorias">
          <FichaLugares titulo="Lugar1" contenido="" imagen={Lugar1} />
          <FichaLugares titulo="Lugar2" contenido="" imagen={Lugar1} />
          <FichaLugares titulo="Lugar3" contenido="" imagen={Lugar1} />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más lugares...
        </Link>
      </section>
    </div>
  );
}
