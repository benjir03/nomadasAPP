import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Destino() {
  return (
    <div className="container mt-5">
      
      {/* Selector principal */}
      <div className="p-4 mb-4 rounded" style={{ backgroundColor: '#f7f7f7', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div className="row text-center">
          <div className="col-md-3">
            <label>Destino</label>
            <button className="btn btn-outline-secondary w-100">Encontrar destino</button>
          </div>
          <div className="col-md-3">
            <label>Tiempo estimado de estancia</label>
            <select className="form-select">
              <option>Medio día</option>
              <option>1 día</option>
              <option>Fin de semana</option>
            </select>
          </div>
          <div className="col-md-3">
            <label>Acompañantes</label>
            <select className="form-select">
              <option>Voy solo</option>
              <option>Con amigos</option>
              <option>Familia</option>
            </select>
          </div>
          <div className="col-md-3">
            <label>Presupuesto</label>
            <input type="range" className="form-range" />
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary">BUSCAR AVENTURAS</button>
        </div>
      </div>

      {/* Sección de destinos */}
      <h2>Descubre tu destino</h2>
      <p>Dale un vistazo a los lugares que hemos seleccionado para ti</p>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Villas</h5>
              <p className="card-text">12,000 disponibles</p>
              <p className="card-text"><small className="text-body-secondary">Última actualización hace 3 minutos</small></p>
            </div>
            <img src="villa.jpg" className="card-img-bottom" alt="Villa" />
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Apartamentos</h5>
              <p className="card-text">3,700 disponibles</p>
              <p className="card-text"><small className="text-body-secondary">Última actualización hace 5 minutos</small></p>
            </div>
            <img src="apartamento.jpg" className="card-img-bottom" alt="Apartamento" />
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resorts</h5>
              <p className="card-text">1,700 disponibles</p>
              <p className="card-text"><small className="text-body-secondary">Última actualización hace 10 minutos</small></p>
            </div>
            <img src="resort.jpg" className="card-img-bottom" alt="Resort" />
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ciudades</h5>
              <p className="card-text">57 disponibles</p>
              <p className="card-text"><small className="text-body-secondary">Última actualización hace 15 minutos</small></p>
            </div>
            <img src="ciudad.jpg" className="card-img-bottom" alt="Ciudad" />
          </div>
        </div>
      </div>
    </div>
  );
}
