import React from "react";
import { Link, useParams } from "react-router-dom";
import "../estilos/DetalleLugar.css";
import fondiInicio from "../imgs/cdmx-portada.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";
import FichaActividad from "../componentes/FichaActividad";
import BotonRegresar from "../componentes/BotonRegresar";
import Cancun from "../imgs/citys/Cancun.png"
import Edimburgo from "../imgs/citys/Edimburgo.jpg"
import Guadalajara from "../imgs/citys/Guadalajara.png"
import Guanajuato from "../imgs/citys/Guanajuato.png"
import Madrid from "../imgs/citys/Madrid.png"
import Sydney from "../imgs/citys/Sydney.png"
import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01, Lugar1, Lugar2, Lugar3, Lugar4
} from "../imgs/ArchivoImgs";

const lugares = [
  {
    id: 1,
    nombre: "Guanajuato",
    descripcion:
      "Guanajuato, Ciudad Patrimonio de la Humanidad, es un destino mágico conocido por sus pintorescas callejuelas, coloridas fachadas y su rica historia minera. Entre sus atractivos destacan el Callejón del Beso, el Teatro Juárez, el Museo de las Momias, y la majestuosa Alhóndiga de Granaditas.",
    imagen: Guanajuato,
  },
  {
    id: 2,
    nombre: "Guadalajara",
    descripcion:
      "Guadalajara, la Perla Tapatía, es una ciudad vibrante y moderna con profundas raíces culturales. Es el hogar del mariachi y el tequila, símbolos icónicos de México. Entre sus principales atracciones destacan la imponente Catedral de Guadalajara, el histórico Teatro Degollado, y el dinámico Mercado San Juan de Dios.",
    imagen: Guadalajara,
  },
  {
    id: 3,
    nombre: "Cancún",
    descripcion:
      "Cancún, el paraíso del Caribe mexicano, es conocido por sus playas de arena blanca, aguas turquesa y vibrante vida nocturna. Este destino ofrece actividades para todos, desde explorar sitios arqueológicos mayas como El Rey y Tulum hasta disfrutar de resorts de clase mundial y emocionantes deportes acuáticos.",
    imagen: Cancun,
  },
  {
    id: 4,
    nombre: "Madrid",
    descripcion:
      "Madrid, el corazón vibrante de España, combina historia, cultura y modernidad en un solo lugar. La capital española es famosa por sus monumentos icónicos como el Palacio Real, la Puerta del Sol y la majestuosa Plaza Mayor. Sus museos de renombre mundial, como el Prado y el Reina Sofía, albergan obras maestras del arte.",
    imagen: Madrid,
  },
  {
    id: 5,
    nombre: "Edimburgo",
    descripcion:
      "la joya histórica de Escocia, es una ciudad de contrastes donde la majestuosidad medieval se encuentra con la elegancia georgiana. Dominada por el imponente Castillo de Edimburgo, la ciudad ofrece encantadores paseos por la Royal Mile y las misteriosas callejuelas del casco antiguo. Su vibrante vida cultural se destaca en festivales como el Edinburgh Festival Fringe. Con paisajes escénicos como el Arthur’s Seat y una rica herencia literaria, Edimburgo es un destino fascinante lleno de historia, arte y naturaleza.",
    imagen: Edimburgo,
  },
  {
    id: 6,
    nombre: "Sydney",
    descripcion:
      "la joya costera de Australia, es una ciudad icónica conocida por su deslumbrante puerto, hogar de la emblemática Ópera de Sídney y el majestuoso Puente del Puerto. Sus playas doradas, como Bondi y Manly, son perfectas para disfrutar del sol y el surf. Sídney combina modernidad y naturaleza con atracciones como los Jardines Botánicos Reales y la vasta Bahía de Sídney. Vibrante y multicultural, ofrece una rica gastronomía, vida nocturna y una experiencia urbana inolvidable en medio de paisajes espectaculares.",
    imagen: Sydney,
  },
];

const DetalleLugar = () => {
  const { id } = useParams(); // Ahora obtenemos el `id` desde la URL
  const lugar = lugares.find((lugar) => lugar.id === parseInt(id)); // Buscar por `id`

  if (!lugar) {
    return <p>Lugar no encontrado</p>;
  }

  return (
    <div className="contenedorVista">
      {/* Sección de bienvenida */}
      <section
        className="contenedorUno"
        style={{
          backgroundImage: `url(${lugar.imagen})`,
          height: `90vh`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 10 }}>
          <BotonRegresar />
        </div>
        <div className="contenedorDos">
          <h1>{lugar.nombre}</h1>
          <p>{lugar.descripcion}</p>
        </div>
      </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <h2>Actividades</h2>
        <div className="categorias">
          <FichaActividad titulo="Actividad1" contenido="" imagen={BackInicio} />
          <FichaActividad titulo="Actividad2" contenido="" imagen={BackInicio} />
          <FichaActividad titulo="Actividad3" contenido="" imagen={BackInicio} />
        </div>
      </section>

      {/* Más actividades */}
      <section className="categoriasSec">
        <div className="categorias">
          <FichaActividad titulo="Actividad4" contenido="" imagen={BackInicio} />
          <FichaActividad titulo="Actividad5" contenido="" imagen={BackInicio} />
          <FichaActividad titulo="Actividad6" contenido="" imagen={BackInicio} />
        </div>
      </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <div className="categorias">
          <FichaActividad titulo="Actividad7" contenido="" imagen={BackInicio} />
          <FichaActividad titulo="Actividad8" contenido="" imagen={BackInicio} />
          <FichaActividad titulo="Actividad9" contenido="" imagen={BackInicio} />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más actividades...
        </Link>
      </section>
    </div>
  );
};

export default DetalleLugar;
