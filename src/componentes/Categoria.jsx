import React from "react";  
import categoriaImage from "../imgs/cdmx-portada.jpg";  
import '../estilos/styCate.css';  

const Categoria = () => {  
  return (  
    <div className="container">  
      <div className="imagenContenedor">  
        <img src={categoriaImage} alt="Categoría" className="categoriaImagen" />  
        <div className="textoImagen">  
          <h2>Categoría</h2>  
          <h3>Info Categoría</h3>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default Categoria;
