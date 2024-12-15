import React from "react";
import "./ConfirmationDialog.css"; // Opcional para estilos personalizados

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirmation-dialog">
            <div className="dialog-content">
                <p>{message}</p>
                <div className="dialog-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>    
    );
};

export default ConfirmationDialog;
