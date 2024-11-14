import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/explora.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";
import ListaActividad from "../componentes/listaactividad";
import DescripLugar from "../componentes/DescripLugar";

import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01,
} from "../imgs/ArchivoImgs";

const lugares = [
  { nombre: "Lugar 1", imagen: explora01 },
  { nombre: "Lugar 2", imagen: explora01 },
  { nombre: "Lugar 3", imagen: explora01 },
  { nombre: "Lugar 4", imagen: explora01 },
];

function Inicio() {
  return (
    <div className="contenedorVista">
      {/* Sección de bienvenida */}
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${fondiInicio})`,
          height: `90vh`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="contenedorDos">
          <h1>Explora</h1>
          <p>¡Encuentra lugares fuera de lo común!</p>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="categoriasSec">
        <h2>Categorías</h2>
        <div className="categorias">
          <FichaCategoria titulo="Historia" contenido="" imagen={historiaImage} />
          <FichaCategoria titulo="Arte" contenido="" imagen={arteImage} />
          <FichaCategoria titulo="Gastronomía" contenido="" imagen={gastronomiaImage} />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más categorías...
        </Link>
      </section>

      {/* Sección de actividades */}
      <section className="actividadesSec">
        <DescripLugar /> {/* Agrega el componente ListaActividad aquí */}
      </section>

      {/* Sección de actividades */}
      <section className="actividadesSec">
        <ListaActividad /> {/* Agrega el componente ListaActividad aquí */}
      </section>
    </div>
  );
}

export default Inicio;
