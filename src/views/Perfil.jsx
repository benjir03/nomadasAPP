import React, { useState, useEffect } from 'react';
import '../estilos/styPerfil.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const [activeSection, setActiveSection] = useState('info');
  const [usuario, setUsuario] = useState({
    nombre: '',
    fecha_nacimiento: '',
    correo: '',
    genero: '',
    telefono: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/perfil', { withCredentials: true });
        setUsuario(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/auth/logout', {}, { withCredentials: true });
      navigate('/Inicio'); // Redirige a la página de inicio de sesión después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'info':
        return (
          <div>
            <h3>Información Personal</h3>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Fecha de Nacimiento:</strong> {usuario.fecha_nacimiento}</p>
            <p><strong>Correo Electrónico:</strong> {usuario.correo}</p>
            <p><strong>Género:</strong> {usuario.genero}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h3>Información Personal</h3>
            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Fecha de Nacimiento:</strong> {usuario.fecha_nacimiento}</p>
            <p><strong>Correo Electrónico:</strong> {usuario.correo}</p>
            <p><strong>Género:</strong> {usuario.genero}</p>
            <p><strong>Teléfono:</strong> {usuario.telefono}</p>
          </div>
        );
      case 'security':
        return <div>Seguridad</div>;
      case 'notifications':
        return <div>Notificaciones</div>;
      case 'logout':
        handleLogout(); // Llama a handleLogout al seleccionar "Cerrar sesión"
        return null;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div className="perfil-container">
      <aside className="sidebar">
        <h2 className="perfil-nombre">{`Bienvenido, ${usuario.nombre}`}</h2>
        <ul>
          <li
            className={activeSection === 'info' ? 'active' : ''}
            onClick={() => setActiveSection('info')}
          >
            Información personal
          </li>
          <li
            className={activeSection === 'settings' ? 'active' : ''}
            onClick={() => setActiveSection('settings')}
          >
            Configuración de cuenta
          </li>
          <li
            className={activeSection === 'security' ? 'active' : ''}
            onClick={() => setActiveSection('security')}
          >
            Seguridad
          </li>
          <li
            className={activeSection === 'notifications' ? 'active' : ''}
            onClick={() => setActiveSection('notifications')}
          >
            Notificaciones
          </li>
          <li
            className={activeSection === 'logout' ? 'active' : ''}
            onClick={() => setActiveSection('logout')}
          >
            Cerrar sesión
          </li>
        </ul>
      </aside>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
};

export default Perfil;
