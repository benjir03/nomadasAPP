import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ModificarPerfil = () => {
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
        const userData = response.data;

        // Formatear la fecha de nacimiento al formato YYYY-MM-DD
        const formattedDate = userData.fecha_nacimiento ? userData.fecha_nacimiento.split('T')[0] : '';
        
        setUsuario({ ...userData, fecha_nacimiento: formattedDate });
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };

    fetchPerfil();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:3001/auth/modificar', usuario, { withCredentials: true });
      alert('Perfil actualizado exitosamente');
      navigate('/Perfil'); // Redirige al perfil después de guardar
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un problema al actualizar el perfil');
    }
  };

  return (
    <div>
      <h3>Modificar Perfil</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={usuario.fecha_nacimiento}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="correo"
          value={usuario.correo}
          onChange={handleInputChange}
          placeholder="Correo"
        />
        <input
          type="text"
          name="genero"
          value={usuario.genero}
          onChange={handleInputChange}
          placeholder="Género"
        />
        <input
          type="tel"
          name="telefono"
          value={usuario.telefono}
          onChange={handleInputChange}
          placeholder="Teléfono"
        />
        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={() => navigate('/Perfil')}>Cancelar</button>
      </form>
    </div>
  );
};

export default ModificarPerfil;
