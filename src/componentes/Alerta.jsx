// AlertBox.jsx
import React from "react";
import "../estilos/Alerta.css"; // Estilos personalizados para la alerta

function AlertBox({ message, onClose }) {
  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default AlertBox;
