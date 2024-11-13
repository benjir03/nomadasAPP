// Actividad.js
import React from "react";
import { Link } from "react-router-dom";
import "../estilos/styActividad.css";
import ActividadPrincipal from "../componentes/Actividades"; // Asegúrate de que el nombre y la ruta sean correctos
import FichaCategoria from "../componentes/FichaCategoria";
import { chapultepec, biblioteca, bellasartes, monumentorevolucion, islamuñecas } from "../imgs/ArchivoImgs";

function Actividad() {
  return (
    <div className="Actividad">
      <ActividadPrincipal
        titulo="Isla de las Muñecas"
        descripcion="Una isla llena de cientos de muñecos colgados, en descomposición y decapitados."
        imagenFondo={islamuñecas}
        infoTitulo="La Isla de las Muñecas"
        infoPrecio="$$"
        infoDuracion="3-5 hr"
        infoDescripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        mapaSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.608948408533!2d-99.0986!3d19.2908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fe6d2f8d5b47%3A0x25e0f7b5b7e68a1b!2sParque%20Ecol%C3%B3gico%20de%20Xochimilco!5e0!3m2!1sen!2smx!4v1601234567890!5m2!1sen!2smx"
        mapaTitulo="Mapa Isla de las Muñecas"
        mapaUbicacion="Parque Ecológico De Xochimilco"
        mapaLink="https://www.kayak.com"
      />
      <section className="lugaresDestacados">
        <h3>Otras recomendaciones en Ciudad de México</h3>
        <div className="listaLugares">
          <FichaCategoria />
          <div className="lugar">
            <img src={chapultepec} alt="Lugar 1" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
          <div className="lugar">
            <img src={biblioteca} alt="Lugar 2" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
          <div className="lugar">
            <img src={bellasartes} alt="Lugar 3" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
          <div className="lugar">
            <img src={monumentorevolucion} alt="Lugar 4" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Actividad;
