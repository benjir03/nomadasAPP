import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../estilos/styActividad.css";
import ActividadPrincipal from "../componentes/Actividades";
import FichaActividad from "../componentes/FichaActividad";
import { chapultepec, biblioteca, bellasartes, monumentorevolucion } from "../imgs/ArchivoImgs";


function Actividad() {
  const location = useLocation();
  const lugar = location.state || {};
  const { place_id } = useParams();

  // Verifica si la categoría es "museo" y, en ese caso, establece el precio como "GRATIS"
  const precio = lugar?.category === "museo" ? "GRATIS" : lugar?.price || "$$";

  return (
    <div className="Actividad">
      {lugar ? (
        <>
          <ActividadPrincipal
            titulo={lugar.title}
            id={place_id}
            descripcion={lugar.descripcion_corta || "No disponible"}
            imagenFondo={lugar.image}
            infoTitulo={lugar.title}
            infoPrecio={precio} // Usa la variable `precio` con la condición aplicada
            infoCalificacion={lugar.rating}
            infoDescripcion={lugar.descripcion || "Descripción no disponible"}
            mapaSrc={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCEj5HsivhghX7r_o31Z9FKo7HaQblM6WU&q=place_id:${lugar.id}`}
            mapaLink={lugar.website || "#"}
          />
          
          {/* Contenedor para imágenes adicionales */}
          <section className="photos-containerAct">
            <h3>Imágenes</h3>
            {lugar.photos && lugar.photos.length > 0 ? (
              <div className="additional-images">
                {lugar.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:3002/place-photo?photo_reference=${photo.photo_reference}`}
                    alt="Imagen adicional"
                    className="additional-image"
                  />
                ))}
              </div>
            ) : (
              <p>No hay imágenes adicionales disponibles.</p>
            )}
          </section>
        </>
      ) : (
        <p>No se encontraron datos para esta actividad.</p>
      )}

       {/* Contenedor para reseñas */}
       <section className="reviews-containerAct">
            <h3>Reseñas</h3>
            {lugar.reviews && lugar.reviews.length > 0 ? (
              <ul>
                {lugar.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.author_name}:</strong> {review.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay reseñas disponibles.</p>
            )}
          </section>

      {/* Sección de actividades */}
      <section className="categoriasSec">
        <h2>Actividades relacionadas</h2>
        <div className="categorias">
          <FichaActividad
            titulo="Actividad1"
            contenido=""
            imagen={biblioteca}
          />
          <FichaActividad
            titulo="Actividad2"
            contenido=""
            imagen={bellasartes}
          />
          <FichaActividad
            titulo="Actividad3"
            contenido=""
            imagen={monumentorevolucion}
          />
        </div>
        <Link to="/Lugares" className="more-categories-link">
          Más actividades...
        </Link>
      </section>
      
    </div>
  );
}

export default Actividad;
