import React from "react";
import { Link } from "react-router-dom";
import "../estilos/styActividad.css";

// Importación directa de imágenes
import imgChapultepec from "../imgs/chapultepec.jpeg";
import imgBiblioteca from "../imgs/Biblioteca.jpg";
import imgBellasArtes from "../imgs/ImgBellasArtes.jpeg";
import imgMonuRevolucion from "../imgs/ImgMonuRevolucion.jpeg";
import fondiActividad from "../imgs/ImgIslaMuñecas.jpg";
import FichaCategoria from "../componentes/FichaCategoria";

function Actividad() {
  return (
    <div className="Actividad">
      {/* Sección de bienvenida */}
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${fondiActividad})`,
          height: `88vh`,
          backgroundSize: "cover", // Asegura que la imagen cubra todo el contenedor
          backgroundPosition: "center", // Centra la imagen,
        }}
      >
        <div className="contenedorDos">
          <h1>Isla de las muñecas</h1>
          <p>
            Una isla llena de cientos de muñecos colgados, en descomposición y
            decapitados.
          </p>
          <Link className="botonAccion2">Agregar al plan</Link>
        </div>
      </section>

      {/* Sección de información de la actividad */}
      <section className="actividadInfo">
        <div className="descripcion">
          <h2>La Isla de las Muñecas</h2>
          <p>Precio $$ Duración 3-5 hr</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
            lacus non augue auctor imperdiet sit amet nec metus.
          </p>
        </div>
        <div className="mapa">
          <iframe
            title="mapa"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.608948408533!2d-99.0986!3d19.2908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fe6d2f8d5b47%3A0x25e0f7b5b7e68a1b!2sParque%20Ecol%C3%B3gico%20de%20Xochimilco!5e0!3m2!1sen!2smx!4v1601234567890!5m2!1sen!2smx"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <p>Parque Ecológico De Xochimilco</p>
          <p>19.2908, -99.0986</p>
          <Link to="https://www.kayak.com">Ver en Google Maps</Link>
        </div>
      </section>

      {/* Sección de lugares destacados */}
      <section className="lugaresDestacados">
        <h3>Otras recomendaciones en Ciudad de México</h3>
        <div className="listaLugares">
          <FichaCategoria />
          <div className="lugar">
            <img src={imgChapultepec} alt="Lugar 1" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
          <div className="lugar">
            <img src={imgBiblioteca} alt="Lugar 2" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
          <div className="lugar">
            <img src={imgBellasArtes} alt="Lugar 3" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
          <div className="lugar">
            <img src={imgMonuRevolucion} alt="Lugar 4" />
            <p>Lorem ipsum.</p>
            <Link to="#">Más...</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Actividad;
