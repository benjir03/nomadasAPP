import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fondiArmarPlan from "../imgs/piramid.jpg"; 
import "../estilos/styArmarPlan.css";
import FichaLugares from "../componentes/FichaLugares";
import Lugar1 from '../imgs/explora01.jpg';
import { Link } from "react-router-dom";

export default function ArmarPlan() {
  const navigate = useNavigate();
  const [ciudad, setCiudad] = useState("");
  const [estancia, setEstancia] = useState("Unas cuantas horas");
  const [acompanantes, setAcompanantes] = useState("Voy solo");
  const [presupuesto, setPresupuesto] = useState(2);
  const [categoria, setCategoria] = useState("");
  const [calificacionMinima, setCalificacionMinima] = useState("");
  const [ambiente, setAmbiente] = useState("");
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
        <div className="contenidoImagenPlan">
          <h1>Busquemos algo increíble</h1>
          <div className="selector-item">
            <label>Agregar Ciudad</label>
            <input
              type="text"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>
          <div className="selector-item">
            <label>Tiempo estimado de estancia</label>
            <select value={estancia} onChange={(e) => setEstancia(e.target.value)}>
              <option>Unas cuantas horas</option>
              <option>Un día</option>
              <option>Fin de semana</option>
            </select>
          </div>
          <div className="selector-item">
            <label>Acompañantes</label>
            <select
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
              value={presupuesto}
              min="0"
              max="4"
              onChange={(e) => setPresupuesto(e.target.value)}
            />
          </div>
          <div className="selector-item">
            <label>Categoría</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
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
            <label>Calificación mínima</label>
            <input
              type="number"
              value={calificacionMinima}
              min="1"
              max="5"
              step="0.1"
              onChange={(e) => setCalificacionMinima(e.target.value)}
            />
          </div>
          <div className="selector-item">
            <label>Ambiente</label>
            <select value={ambiente} onChange={(e) => setAmbiente(e.target.value)}>
              <option value="tranquilo">Tranquilo</option>
              <option value="familiar">Familiar</option>
              <option value="romántico">Romántico</option>
            </select>
          </div>
          <button onClick={handleExploraActividades}>Explora actividades</button>
        </div>
      </div>

      <section className="categoriasSec">
        <h2>Lugares Recomendados</h2>
        <div className="categorias">
          <FichaLugares
            titulo="Lugar1"
            contenido=""
            imagen={Lugar1}
          />
          <FichaLugares
            titulo="Lugar2"
            contenido=""
            imagen={Lugar1}
          />
          <FichaLugares
            titulo="Lugar3"
            contenido=""
            imagen={Lugar1}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más lugares...
        </Link>
      </section>
    </div>
  );
}
