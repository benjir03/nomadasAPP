import React from "react";
import { Link } from "react-router-dom";
import "../estilos/estiloInicio.css";
import fondiInicio from "../imgs/fondoInicio.jpg";
import FichaCategoria from "../componentes/FichaCategoria";
import FichaLugares from "../componentes/FichaLugares";


import {
  historiaImage,
  BackInicio,
  gastronomiaImage,
  arteImage,
  explora01,Lugar1,Lugar2,Lugar3,Lugar4
} from "../imgs/ArchivoImgs";


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

      {/* Sección de categorías */}
      <section className="categoriasSec">
      <h2>¡Explora lugares fuera de lo común!</h2>
      <div className="categorias">
        <FichaCategoria
          titulo="Gastronomía"
          contenido="Disfruta de una amplia variedad de experiencias culinarias."
          imagen={Lugar1}
          categoria={[
            "internet_cafe",
            "acai_shop",
            "bakery",
            "bar",
            "restaurant",
            "pizza_restaurant",
            "wine_bar",
            "cafe",
            "fast_food_restaurant",
            "mexican_restaurant",
            "seafood_restaurant",
          ]}
        />
        <FichaCategoria
          titulo="Cultura e Historia"
          contenido="Descubre sitios históricos y culturales únicos."
          imagen={Lugar1}
          categoria={[
            "museum",
            "cultural_landmark",
            "historical_place",
            "art_gallery",
            "library",
            "monument",
            "sculpture",
          ]}
        />
        <FichaCategoria
          titulo="Arte y Entretenimiento"
          contenido="Vive experiencias de arte y diversión."
          imagen={Lugar1}
          categoria={[
            "art_gallery",
            "museum",
            "performing_arts_theater",
            "movie_theater",
            "karaoke",
            "opera_house",
            "planetarium",
          ]}
        />
        <FichaCategoria
          titulo="Naturaleza y Aventura"
          contenido="Conecta con la naturaleza y vive aventuras inolvidables."
          imagen={Lugar1}
          categoria={[
            "national_park",
            "wildlife_park",
            "zoo",
            "beach",
            "park",
            "hiking_area",
            "state_park",
          ]}
        />
        <FichaCategoria
          titulo="Vida Nocturna"
          contenido="Explora los mejores lugares para disfrutar la noche."
          imagen={Lugar1}
          categoria={[
            "bar",
            "night_club",
            "karaoke",
            "cafe",
            "diner",
            "wine_bar",
          ]}
        />
        <FichaCategoria
          titulo="Compras"
          contenido="Descubre los mejores lugares para comprar."
          imagen={Lugar1}
          categoria={[
            "shopping_mall",
            "book_store",
            "clothing_store",
            "supermarket",
            "plaza",
            "market",
          ]}
        />
        <FichaCategoria
          titulo="Familia y Niños"
          contenido="Actividades y lugares ideales para toda la familia."
          imagen={Lugar1}
          categoria={[
            "zoo",
            "water_park",
            "tourist_attraction",
            "movie_theater",
            "park",
            "planetarium",
          ]}
        />
        <FichaCategoria
          titulo="Deportes y Actividades"
          contenido="Practica tus deportes y actividades favoritas."
          imagen={Lugar1}
          categoria={[
            "aquarium",
            "bowling_alley",
            "roller_coaster",
            "skateboard_park",
            "sports_activity_location",
            "swimming_pool",
          ]}
        />
      </div>
    </section>

 {/* Sección de lugares recomendados */}
 <section className="categoriasSec">
        <h2>Lugares Recomendados</h2>
        <div className="categorias">
          <FichaLugares
            titulo="Lugar1"
            contenido=""
            imagen={Lugar1}
          />
          <FichaLugares
            titulo="Lugar2"
            contenido=""
            imagen={Lugar2}
          />
          <FichaLugares
            titulo="Lugar3"
            contenido=""
            imagen={Lugar3}
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
