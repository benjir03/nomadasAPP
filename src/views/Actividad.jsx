import React from "react";
import { useLocation } from "react-router-dom";
import "../estilos/styActividad.css";
import ActividadPrincipal from "../componentes/Actividades";
import FichaCategoria from "../componentes/FichaCategoria";
import { chapultepec, biblioteca, bellasartes, monumentorevolucion } from "../imgs/ArchivoImgs";

function Actividad() {
  const location = useLocation();
  const lugar = location.state;

  // Verifica si la categoría es "museo" y, en ese caso, establece el precio como "GRATIS"
  const precio = lugar.category === "museo" ? "GRATIS" : lugar.price || "$$";

  return (
    <div className="Actividad">
      {lugar ? (
        <>
          <ActividadPrincipal
            titulo={lugar.title}
            descripcion={lugar.descripcion_corta || "No disponible"}
            imagenFondo={lugar.image}
            infoTitulo={lugar.title}
            infoPrecio={precio} // Usa la variable `precio` con la condición aplicada
            infoDuracion={lugar.recommendedTime || "No disponible"}
            infoDescripcion={lugar.descripcion || "Descripción no disponible"}
            mapaSrc={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCEj5HsivhghX7r_o31Z9FKo7HaQblM6WU&q=place_id:${lugar.id}`}
            mapaLink={lugar.website || "#"}
          />
          {/* Contenedor para reseñas */}
          <section className="reviews-container">
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
          
          {/* Contenedor para imágenes adicionales */}
          <section className="photos-container">
            <h3>Imágenes adicionales</h3>
            {lugar.photos && lugar.photos.length > 0 ? (
              <div className="additional-images">
                {lugar.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/place-photo?photo_reference=${photo.photo_reference}`}
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
      
      <section className="lugaresDestacados">
        <h3>Otras recomendaciones en Ciudad de México</h3>
        <div className="listaLugares">
          <FichaCategoria />
          <div className="lugar">
            <img src={chapultepec} alt="Lugar 1" />
            <p>Lorem ipsum.</p>
          </div>
          <div className="lugar">
            <img src={biblioteca} alt="Lugar 2" />
            <p>Lorem ipsum.</p>
          </div>
          <div className="lugar">
            <img src={bellasartes} alt="Lugar 3" />
            <p>Lorem ipsum.</p>
          </div>
          <div className="lugar">
            <img src={monumentorevolucion} alt="Lugar 4" />
            <p>Lorem ipsum.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Actividad;
