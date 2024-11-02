// ProfileView.js
import React, { useState } from 'react';
import '../styles/styProfile.css'; // Importa el archivo CSS

const ProfileView = () => {
  const [selectedSection, setSelectedSection] = useState('inicio');

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'inicio':
        return <h2>Inicio del perfil</h2>;
      case 'informacionPersonal':
        return <h2>Información Personal</h2>;
      case 'pago':
        return <h2>Opciones de Pago</h2>;
      case 'bitacoras':
        return <h2>Bitácoras</h2>;
      case 'sugerencias':
        return <h2>Sugerencias</h2>;
      default:
        return <h2>Inicio del perfil</h2>;
    }
  };

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <h3>Perfil</h3>
        <ul className="menu-list">
          <li className="menu-item" onClick={() => setSelectedSection('inicio')}>Inicio</li>
          <li className="menu-item" onClick={() => setSelectedSection('informacionPersonal')}>Información Personal</li>
          <li className="menu-item" onClick={() => setSelectedSection('pago')}>Pago</li>
          <li className="menu-item" onClick={() => setSelectedSection('bitacoras')}>Bitácoras</li>
          <li className="menu-item" onClick={() => setSelectedSection('sugerencias')}>Sugerencias</li>
        </ul>
      </aside>
      <main className="profile-content">
        {renderSectionContent()}
      </main>
    </div>
  );
};

export default ProfileView;
