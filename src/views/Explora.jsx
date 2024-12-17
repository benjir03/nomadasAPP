import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import "../estilos/carrouselCategorias.css";
import "../estilos/carrouselLugares.css";
import fondiInicio from "../imgs/explora.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";
import FichaActividad from "../componentes/FichaActividad";
import CarrouselCategorias from "../componentes/CarrouselCategorias";
import CarrouselLugares from "../componentes/CarrouselLugares";
import Cancun from "../imgs/citys/Cancun.png"
import Edimburgo from "../imgs/citys/Edimburgo.jpg"
import Guadalajara from "../imgs/citys/Guadalajara.png"
import Guanajuato from "../imgs/citys/Guanajuato.png"
import Madrid from "../imgs/citys/Madrid.png"
import Sydney from "../imgs/citys/Sydney.png"
import {
  cat_art,
  cat_family,
  cat_food,
  cat_history,
  cat_nature,
  cat_night,
  cat_shop,
  cat_sport,
} from "../imgs/ArchivoImgs";


import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01, Lugar1, Lugar2, Lugar3, Lugar4
} from "../imgs/ArchivoImgs";

function Explora() {

  
  const categorias = [
    {
      titulo: "Gastronomía",
      contenido: "Disfruta de una amplia variedad de experiencias culinarias.",
      imagen: cat_food,
      categoria: ["gastronomia"],
    },
    {
      titulo: "Cultura e Historia",
      contenido: "Descubre sitios históricos y culturales únicos.",
      imagen: cat_history,
      categoria: ["Cultura"],
    },
    {
      titulo: "Arte",
      contenido: "Vive experiencias de arte únicas.",
      imagen: cat_art,
      categoria: ["ArteEntretenimiento"],
    },
    {
      titulo: "Naturaleza y Aventura",
      contenido: "Conecta con la naturaleza y vive aventuras inolvidables.",
      imagen: cat_nature,
      categoria: ["Naturaleza"],
    },
    {
      titulo: "Vida Nocturna",
      contenido: "Explora los mejores lugares para disfrutar la noche.",
      imagen: cat_night,
      categoria: ["VidaNocturna"],
    },
    {
      titulo: "Compras",
      contenido: "Descubre los mejores lugares para ir de compras.",
      imagen: cat_shop,
      categoria: ["Compras"],
    },
    {
      titulo: "Familia y Niños",
      contenido: "Actividades ideales para disfrutar en familia.",
      imagen: cat_family,
      categoria: ["FamiliaNinos"],
    },
    {
      titulo: "Deportes y Actividades Extremas",
      contenido: "Experimenta la adrenalina con actividades extremas.",
      imagen: cat_sport,
      categoria: ["Deportes"],
    },
  ];

  const lugares = [
    {
      id: 1,
      titulo: "Guanajuato",
      contenido: "Visita la ciudad de Guanajuato",
      imagen: Guanajuato,
      descripcion:
      "Guanajuato, Ciudad Patrimonio de la Humanidad, es un destino mágico conocido por sus pintorescas callejuelas, coloridas fachadas y su rica historia minera. Entre sus atractivos destacan el Callejón del Beso, el Teatro Juárez, el Museo de las Momias, y la majestuosa Alhóndiga de Granaditas.",
    
    },
    {
      id: 2,
      titulo: "Guadalajara",
      contenido: "Visita la ciudad de Guadalajara",
      imagen: Guadalajara,
      descripcion:
      "Guadalajara, la Perla Tapatía, es una ciudad vibrante y moderna con profundas raíces culturales. Es el hogar del mariachi y el tequila, símbolos icónicos de México. Entre sus principales atracciones destacan la imponente Catedral de Guadalajara, el histórico Teatro Degollado, y el dinámico Mercado San Juan de Dios.",
    
    },
    {
      id: 3,
      titulo: "Cancún",
      contenido: "Visita la ciudad de Cancún",
      imagen: Cancun,
      descripcion:
      "Cancún, el paraíso del Caribe mexicano, es conocido por sus playas de arena blanca, aguas turquesa y vibrante vida nocturna. Este destino ofrece actividades para todos, desde explorar sitios arqueológicos mayas como El Rey y Tulum hasta disfrutar de resorts de clase mundial y emocionantes deportes acuáticos.",
    
    },
    {
      id: 4,
      titulo: "Madrid",
      contenido: "Visita la ciudad de Madrid",
      imagen: Madrid,
      escripcion:
      "Madrid, el corazón vibrante de España, combina historia, cultura y modernidad en un solo lugar. La capital española es famosa por sus monumentos icónicos como el Palacio Real, la Puerta del Sol y la majestuosa Plaza Mayor. Sus museos de renombre mundial, como el Prado y el Reina Sofía, albergan obras maestras del arte.",
    
    },
    {
      id: 5,
      titulo: "Edimburgo",
      contenido: "Visita la ciudad de Edimburgo",
      imagen: Edimburgo,
      descripcion:
      "la joya histórica de Escocia, es una ciudad de contrastes donde la majestuosidad medieval se encuentra con la elegancia georgiana. Dominada por el imponente Castillo de Edimburgo, la ciudad ofrece encantadores paseos por la Royal Mile y las misteriosas callejuelas del casco antiguo. Su vibrante vida cultural se destaca en festivales como el Edinburgh Festival Fringe. Con paisajes escénicos como el Arthur’s Seat y una rica herencia literaria, Edimburgo es un destino fascinante lleno de historia, arte y naturaleza.",
    
    },
    {
      id: 6,
      titulo: "Sydney",
      contenido: "Visita la ciudad de Sydney",
      imagen: Sydney,
      descripcion:
      "la joya costera de Australia, es una ciudad icónica conocida por su deslumbrante puerto, hogar de la emblemática Ópera de Sídney y el majestuoso Puente del Puerto. Sus playas doradas, como Bondi y Manly, son perfectas para disfrutar del sol y el surf. Sídney combina modernidad y naturaleza con atracciones como los Jardines Botánicos Reales y la vasta Bahía de Sídney. Vibrante y multicultural, ofrece una rica gastronomía, vida nocturna y una experiencia urbana inolvidable en medio de paisajes espectaculares.",
    
    },
  ];
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

     {/* Carrousel de categorías */}
     <section className="categoriasSec">
        <h2>¡Explora lugares fuera de lo común!</h2>
        <CarrouselCategorias categorias={categorias} />
      </section>

      {/* Carrousel de lugares recomendados */}
      <section className="categoriasSec">
        <h2>Lugares Recomendados</h2>
        <CarrouselLugares lugares={lugares} />
      </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <h2>Actividades</h2>
        <div className="categorias">
          <FichaActividad
            titulo="Actividad1"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad2"
            contenido=""
            imagen={BackInicio}
          />
          <FichaActividad
            titulo="Actividad3"
            contenido=""
            imagen={BackInicio}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más actividades...
        </Link>
      </section>


    </div>
  );
}

export default Explora;
