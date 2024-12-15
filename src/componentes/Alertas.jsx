import React from "react";
import "../estilos/styAlertas.css"; // Opcional para estilos personalizados

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog">
            <div className="dialog-content">
                <p>{message}</p>
                <div className="dialog-buttons">
                    <button onClick={onConfirm}>Nuevo Plan</button>
                    <button onClick={onCancel}>Agregar al ultimo plan</button>
                </div>
            </div>
        </div>    
    );
};

export default ConfirmationDialog;
