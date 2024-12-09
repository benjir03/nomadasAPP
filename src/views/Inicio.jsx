import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import "../estilos/carrouselCategorias.css";
import "../estilos/carrouselLugares.css";
import fondiInicio from "../imgs/fondoInicio.jpg";
import CarrouselCategorias from "../componentes/CarrouselCategorias";
import CarrouselLugares from "../componentes/CarrouselLugares";
import {
  cat_art,
  cat_family,
  cat_food,
  cat_history,
  cat_nature,
  cat_night,
  cat_shop,
  cat_sport,
  Lugar1,
  Lugar2,
  Lugar3,
} from "../imgs/ArchivoImgs";

function Inicio() {
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

  const lugaresRecomendados = [
    {
      titulo: "Guanajuato",
      contenido: "Visita la ciudad de Guanajuato",
      imagen: Lugar1,
    },
    {
      titulo: "Guadalajara",
      contenido: "Visita la ciudad de Guadalajara",
      imagen: Lugar2,
    },
    {
      titulo: "Cancún",
      contenido: "Visita la ciudad de Cancún",
      imagen: Lugar3,
    },
    {
      titulo: "Madrid",
      contenido: "Visita la ciudad de Madrid",
      imagen: Lugar1,
    },
    {
      titulo: "Edimburgo",
      contenido: "Visita la ciudad de Edimburgo",
      imagen: Lugar2,
    },
    {
      titulo: "Sydney",
      contenido: "Visita la ciudad de Sydney",
      imagen: Lugar3,
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

      {/* Carrousel de lugares recomendados */}
      <section className="categoriasSec">
        <h2>Lugares Recomendados</h2>
        <CarrouselLugares lugares={lugaresRecomendados} />
      </section>
    </div>
  );
}

export default Inicio;
