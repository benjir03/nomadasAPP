import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/explora.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";
import FichaActividad from "../componentes/FichaActividad";
import CarrouselCategorias from "../componentes/CarrouselCategorias";


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
      imagen: Lugar1,
      categoria: [
        "gastronomia",

      ],
    },
    {
      titulo: "Cultura e Historia",
      contenido: "Descubre sitios históricos y culturales únicos.",
      imagen: Lugar2,
      categoria: ["Cultura", ],
    },
    {
      titulo: "Arte",
      contenido: "Vive experiencias de arte únicas.",
      imagen: Lugar3,
      categoria: ["ArteEntretenimiento", ],
    },
    {
      titulo: "Naturaleza y Aventura",
      contenido: "Conecta con la naturaleza y vive aventuras inolvidables.",
      imagen: Lugar1,
      categoria: ["Naturaleza",],
    },
    {
      titulo: "Vida Nocturna",
      contenido: "Explora los mejores lugares para disfrutar la noche.",
      imagen: Lugar2,
      categoria: ["VidaNocturna", ],
    },
    {
      titulo: "Compras",
      contenido: "Descubre los mejores lugares para ir de compras.",
      imagen: Lugar3,
      categoria: ["Compras", ],
    },
    {
      titulo: "Familia y Niños",
      contenido: "Actividades ideales para disfrutar en familia.",
      imagen: Lugar1,
      categoria: ["FamiliaNinos", ],
    },
    {
      titulo: "Deportes y Actividades Extremas",
      contenido: "Experimenta la adrenalina con actividades extremas.",
      imagen: Lugar2,
      categoria: ["Deportes", ],
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

      {/* Sección de lugares recomendados */}
      <section className="categoriasSec">
        <h2>Lugares</h2>
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
