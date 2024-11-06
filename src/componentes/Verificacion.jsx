import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

const Verificacion = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Verificar autenticación enviando solicitud al backend
                await axios.get('http://localhost:3001/auth/perfil', { withCredentials: true });
                setIsAuthenticated(true); // Usuario autenticado
            } catch (error) {
                setIsAuthenticated(false); // Usuario no autenticado
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) return <div>Loading...</div>;

    // Si está autenticado, muestra el contenido de la ruta; si no, redirige a /login
    return isAuthenticated ? <Outlet /> : <Navigate to="login" />;
};

export default Verificacion;
