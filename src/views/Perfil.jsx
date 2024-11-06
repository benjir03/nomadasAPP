import React, { useState } from 'react';
import '../estilos/styPerfil.css';

const Perfil = () => {
  const [activeSection, setActiveSection] = useState('info');

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
