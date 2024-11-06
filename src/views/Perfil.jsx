import React, { useState, useEffect } from 'react';
import '../estilos/styPerfil.css';
import axios from 'axios';

const Perfil = () => {
  const [activeSection, setActiveSection] = useState('info');
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/perfil', { withCredentials: true });
        setNombreUsuario(response.data.nombre);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    fetchPerfil();
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'info':
        return <div>Información personal</div>;
      case 'settings':
        return <div>Configuración de cuenta</div>;
      case 'security':
        return <div>Seguridad</div>;
      case 'notifications':
        return <div>Notificaciones</div>;
      case 'logout':
        return <div>Cerrar sesión</div>;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div className="perfil-container">
      <aside className="sidebar">
        <h2 className="perfil-nombre">{`Bienvenido, ${nombreUsuario}`}</h2>
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
