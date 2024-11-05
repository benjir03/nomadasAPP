import React from "react";
import backgroundImage from "../imgs/viajero.jpg";
import imgVilla from "../imgs/Imgvilla.jpg";
import imgApartamento from "../imgs/apartamento.jpg";
import imgResort from "../imgs/resort.jpg";
import imgCiudad from "../imgs/ciudad.jpg";
import "../estilos/styArmarPlan.css";

export default function ArmarPlan() {
  return (
    <div className="armarPlan">
      {/* Contenedor con imagen de fondo solo para la sección principal */}
      <div
        className="contenedorImagen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container">
          <h1>¡Busquemos actividades!</h1>
          {/* Selector principal con fondo azul claro */}
          <div className="selector-principal">
            <div className="selector-row">
              <div className="selector-item">
                <label>Destino</label>
                <button className="find-destination">Encontrar destino</button>
              </div>
              <div className="selector-item">
                <label>Tiempo estimado de estancia</label>
                <select className="select-field">
                  <option>Medio día</option>
                  <option>1 día</option>
                  <option>Fin de semana</option>
                </select>
              </div>
              <div className="selector-item">
                <label>Acompañantes</label>
                <select className="select-field">
                  <option>Voy solo</option>
                  <option>Con amigos</option>
                  <option>Familia</option>
                </select>
              </div>
              <div className="selector-item">
                <label>Presupuesto</label>
                <input type="range" className="range-field" />
              </div>
            </div>
            <div className="button-container">
              <button className="search-button">BUSCAR AVENTURAS</button>
            </div>
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
            <img src={imgVilla} className="card-img" alt="Villa" />
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
            <img src={imgApartamento} className="card-img" alt="Apartamento" />
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
            <img src={imgResort} className="card-img" alt="Resort" />
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
            <img src={imgCiudad} className="card-img" alt="Ciudad" />
          </div>
        </div>
      </div>
    </div>
  );
}
