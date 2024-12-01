import React from "react";
import "../estilos/BotonRegresar.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Importa el ícono

const BotonRegresar = () => {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate(-1); // Regresa a la página anterior
  };

  return (
    <button onClick={handleRegresar} className="btn-regresar">
      <FaArrowLeft className="btn-regresar-icon" />
      Regresar
    </button>
  );
};

export default BotonRegresar;
