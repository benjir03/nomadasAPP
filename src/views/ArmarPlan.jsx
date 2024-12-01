import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fondiArmarPlan from "../imgs/piramid.jpg";
import "../estilos/styArmarPlan.css";
import FichaLugares from "../componentes/FichaLugares";
import Lugar1 from "../imgs/explora01.jpg";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendar, FaPlus, FaUser, FaUserFriends, FaUsers } from 'react-icons/fa';

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
      setAmbiente("tranquilo");
    } else if (acompanantes === "Con pareja") {
      setAmbiente("romántico");
    } else if (acompanantes === "Familia/Amigos") {
      setAmbiente("familiar");
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
              <div className="input-container">
                <input
                  type="text"
                  className="text-field"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Ingresa una ciudad"
                />
                <FaMapMarkerAlt className="input-icon" />
              </div>
            </div>
            <div className="selector-item">
              <label>Tiempo estimado de estancia</label>
              <div className="button-group">
                <button
                  className={`button-field ${estancia === "Unas cuantas horas" ? "active" : ""}`}
                  onClick={() => setEstancia("Unas cuantas horas")}
                >
                  <FaClock />
                </button>
                <button
                  className={`button-field ${estancia === "Un día" ? "active" : ""}`}
                  onClick={() => setEstancia("Un día")}
                >
                  <FaCalendar />
                </button>
                <button
                  className={`button-field ${estancia === "Fin de semana" ? "active" : ""}`}
                  onClick={() => setEstancia("Fin de semana")}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="selector-item">
              <label>Acompañantes</label>
              <div className="button-group">
                <button
                  className={`button-field ${acompanantes === "Voy solo" ? "active" : ""}`}
                  onClick={() => setAcompanantes("Voy solo")}
                >
                  <FaUser />
                </button>
                <button
                  className={`button-field ${acompanantes === "Con pareja" ? "active" : ""}`}
                  onClick={() => setAcompanantes("Con pareja")}
                >
                  <FaUserFriends />
                </button>
                <button
                  className={`button-field ${acompanantes === "Familia/Amigos" ? "active" : ""}`}
                  onClick={() => setAcompanantes("Familia/Amigos")}
                >
                  <FaUsers />
                </button>
              </div>
            </div>
            <div className="selector-item">
              <label>Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="select-field"
              >
                <option value="all">Todas las Categorias</option>
                <option value="art">Arte</option>
                <option value="shop">Compras</option>
                <option value="history">Cultura e Historia</option>
                <option value="sport">Deportes y Actividades Extremas</option>
                <option value="family">Familia y Niños</option>
                <option value="food">Gastronomia</option>
                <option value="nature">Naturaleza y Aventura</option>
                <option value="night">Vida Nocturna</option>
              </select>
            </div>
            <div className="selector-item">
              <label>Presupuesto</label>
              <div className="range-container">
                <span className="range-label range-label-left">$</span>
                <input
                  type="range"
                  className="range-field"
                  value={presupuesto}
                  min="0"
                  max="3000"
                  onChange={(e) => setPresupuesto(e.target.value)}
                />
                <span className="range-label range-label-right">$$$</span>
              </div>
              <span>{presupuesto >= 3000 ? "$3000 o más" : `$${presupuesto}`}</span>
            </div>
          </div>
          <div className="button-container">
            <button className="botAccion" onClick={handleExploraActividades}>
              Explora Actividades
            </button>
            <button className="botAccion" onClick={handleAgregarCiudad}>
              Agregar Ciudad
            </button>
          </div>
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
