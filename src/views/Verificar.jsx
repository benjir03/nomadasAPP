import React, {useState} from 'react'
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Verificar = () => {
    const [verificado, setVerificado] = useState(null);
    const navigate = useNavigate();
    
    const verificacion = async (e) => {
        e.preventDefault();
        try {
            const URI = "http://localhost:3001/auth/verificar";
                const requestData = {
                    verificado: 1,
                };
            const response = await axios.post(URI, requestData, { withCredentials: true });
            
            console.log(response.data.message);
            navigate('/Completar');
            
        } catch (error) {
            console.error('Error al verificiar usuario:', error);
            alert('Hubo un problema con la verificacion. Inténtalo de nuevo.');
        }
    };
    
    return (
        <div className="login-container">
                <h1 className="login-title">Verifica tu correo</h1>
            <form className="login-form" a onSubmit={verificacion}>
                <button type="submit" className="login-button">Verificar</button>
                <div className='btn'>
                </div>
            </form>
        </div>
    )
}

export default Verificar;