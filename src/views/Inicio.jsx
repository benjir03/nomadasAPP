import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import "../estilos/carrouselCategorias.css";
import fondiInicio from "../imgs/fondoInicio.jpg";
import CarrouselCategorias from "../componentes/CarrouselCategorias";
import FichaCategoria from "../componentes/FichaCategoria";

import { Lugar1, Lugar2, Lugar3 } from "../imgs/ArchivoImgs";

function Inicio() {
  const categorias = [
    {
      titulo: "Gastronomía",
      contenido: "Disfruta de una amplia variedad de experiencias culinarias.",
      imagen: Lugar1,
      categoria: [
        "internet_cafe",
        "acai_shop",
        "bakery",
        "bar",
        "restaurant",
        "pizza_restaurant",
      ],
    },
    {
      titulo: "Cultura e Historia",
      contenido: "Descubre sitios históricos y culturales únicos.",
      imagen: Lugar2,
      categoria: ["museum", "cultural_landmark", "historical_place"],
    },
    {
      titulo: "Arte",
      contenido: "Vive experiencias de arte únicas.",
      imagen: Lugar3,
      categoria: ["art_gallery", "museum", "performing_arts_theater"],
    },
    {
      titulo: "Naturaleza y Aventura",
      contenido: "Conecta con la naturaleza y vive aventuras inolvidables.",
      imagen: Lugar1,
      categoria: ["national_park", "wildlife_park", "beach"],
    },
    {
      titulo: "Vida Nocturna",
      contenido: "Explora los mejores lugares para disfrutar la noche.",
      imagen: Lugar2,
      categoria: ["bar", "night_club", "karaoke"],
    },
    {
      titulo: "Compras",
      contenido: "Descubre los mejores lugares para ir de compras.",
      imagen: Lugar3,
      categoria: ["mall", "shopping_center", "market"],
    },
    {
      titulo: "Familia y Niños",
      contenido: "Actividades ideales para disfrutar en familia.",
      imagen: Lugar1,
      categoria: ["playground", "theme_park", "zoo"],
    },
    {
      titulo: "Deportes y Actividades Extremas",
      contenido: "Experimenta la adrenalina con actividades extremas.",
      imagen: Lugar2,
      categoria: ["climbing", "surfing", "paragliding"],
    },
  ];

  return (
    <div className="contenedorVista">
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
          <h1>Nómadas</h1>
          <p>
            Nos encargamos de diseñar y personalizar una experiencia de viaje
            como a ti te gusta.
          </p>
          <Link to="/ArmarPlan" className="botonAccion2">
            Comienza a crear un plan
          </Link>
        </div>
      </section>

      {/* Carrousel de categorías */}
      <section className="categoriasSec">
        <h2>¡Explora lugares fuera de lo común!</h2>
        <CarrouselCategorias categorias={categorias} />
      </section>

      {/* Sección de lugares recomendados */}
      <section className="categoriasSec">
        <h2>Lugares Recomendados</h2>
        <div className="categorias">
          <FichaCategoria
            titulo="Lugar1"
            contenido=""
            imagen={Lugar1}
            categoria={[]}
          />
          <FichaCategoria
            titulo="Lugar2"
            contenido=""
            imagen={Lugar2}
            categoria={[]}
          />
          <FichaCategoria
            titulo="Lugar3"
            contenido=""
            imagen={Lugar3}
            categoria={[]}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más lugares...
        </Link>
      </section>
    </div>
  );
}

export default Inicio;
