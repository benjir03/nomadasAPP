import React, { useState, useEffect } from "react";
import "../estilos/styPerfil.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

const NotFound = () => {
    return (
    <div className="perfil-centrado">
        <div className="perfil-centrado">
            <div className="login-container" >
                <h2 className="login-title">Error: demasiada temperatura ambiente</h2>
                <h2 className="login-title">Pagina no encontrada</h2>
            </div>
            </div>
    </div>
    );
};

export default NotFound;