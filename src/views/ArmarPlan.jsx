import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import fondiArmarPlan from "../imgs/fondoArmarPlan.jpg";
import "../estilos/styArmarPlan.css";
import { villa, apartamento, resort, ciudad, } from "../imgs/ArchivoImgs";

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
          backgroundPosition: "center", // Centra la imagen,
        }}
      >
        <div className="contenedorDosDos">
          <div className="contenidoImagenPlan">
            <h1>Busquemos algo increíble</h1>
            <div className="selector-item"> 
              <label>Agregar Ciudad</label>
              <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)}></input>
            </div>
            <div className="selector-item">
              <label>Tiempo estimado de estancia</label>
              <select className="select-field" value={estancia} onChange={(e) => setEstancia(e.target.value)}>
                <option>Unas cuantas horas</option>
                <option>Un día</option>
                <option>Fin de semana</option>
              </select>
            </div>
            <div className="selector-item">
              <label>Acompañantes</label>
              <select className="select-field" value={acompanantes} onChange={(e) => setAcompanantes(e.target.value)}>
                <option>Voy solo</option>
                <option>Con pareja</option>
                <option>Familia/Amigos</option>
              </select>
            </div>
            <div className="selector-item">
              <label>Presupuesto</label>
              <input type="range" className="range-field" value={presupuesto} min="1" max="4" onChange={(e) => setPresupuesto(e.target.value)}/>
            </div>
            <button className="search-button" onClick={handleExploraActividades}>Explora actividades</button>
            <div className="button-container"></div>
          </div>
        </div>
      </div>

      {/* Sección de destinos */}
      <div className="container mt-5">
        <h2>Descubre tu destino</h2>
        <p>Dale un vistazo a los lugares que hemos seleccionado para ti</p>

        <div className="card-row">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Villas</h5>
              <p className="card-text">12,000 disponibles</p>
              <p className="card-text">
                <small className="text-secondary">
                  Última actualización hace 3 minutos
                </small>
              </p>
            </div>
            <img src={villa} className="card-img" alt="Villa" />
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Apartamentos</h5>
              <p className="card-text">3,700 disponibles</p>
              <p className="card-text">
                <small className="text-secondary">
                  Última actualización hace 5 minutos
                </small>
              </p>
            </div>
            <img src={apartamento} className="card-img" alt="Apartamento" />
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resorts</h5>
              <p className="card-text">1,700 disponibles</p>
              <p className="card-text">
                <small className="text-secondary">
                  Última actualización hace 10 minutos
                </small>
              </p>
            </div>
            <img src={resort} className="card-img" alt="Resort" />
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ciudades</h5>
              <p className="card-text">57 disponibles</p>
              <p className="card-text">
                <small className="text-secondary">
                  Última actualización hace 15 minutos
                </small>
              </p>
            </div>
            <img src={ciudad} className="card-img" alt="Ciudad" />
          </div>
        </div>
      </div>
    </div>
  );
}
