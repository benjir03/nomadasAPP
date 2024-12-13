import React from "react";
import "../estilos/Alerta.css"; // Asegúrate de incluir los estilos para la alerta

const CustomAlert = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="alert-overlay">
      <div className="alert-container">
        <h3 className="alert-title">Confirmación</h3>
        <p className="alert-message">{message}</p>
        <div className="alert-buttons">
          <button className="btn-confirm" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;
