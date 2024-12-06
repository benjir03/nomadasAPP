import React from "react";
import "../estilos/BotonRegresar2.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importa el ícono

const BotonRegresar2 = () => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <button onClick={handleRegresar} className="btn-regresar2">
      <FaArrowLeft className="btn-regresar2-icon" />
      Regresar
    </button>
  );
};

export default BotonRegresar2;
