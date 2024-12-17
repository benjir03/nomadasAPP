import React from "react";  
import categoriaImage from "../imgs/cat_art.jpg";  
import '../estilos/styCate.css';  

const Categoria = ({ titulo, contenido, imagen }) => {  
  return (  
    <div className="container">  
      <div className="imagenContenedor">  
        <img src={imagen || categoriaImage} alt="Categoría" className="categoriaImagen" />  
        <div className="textoImagen">
          <h2>{titulo || "Categoría"}</h2> {/* Mostrar el título recibido */}
          <p>{contenido || "Info Categoría"}</p> {/* Mostrar el contenido recibido */}
        </div> 
      </div>  
    </div>  
  );  
};  

export default Categoria;
