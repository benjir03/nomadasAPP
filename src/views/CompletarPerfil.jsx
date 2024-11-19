import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';

const CompletarPerfil = ({googlenombre, googleapellido}) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido:"",
    fecha_nacimiento: "",
    genero: "",
    telefono: "",
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/perfil", {
          withCredentials: true,
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    };
    fetchPerfil();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/auth/modificar", usuario, {
        withCredentials: true,
      });
      alert("Perfil actualizado exitosamente");
      navigate("/GustosPerfil"); // Redirige al perfil después de guardar
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Hubo un problema al actualizar el perfil");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Completar Perfil</h1>
      <form className="login-form" onSubmit={handleUpdate}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          className="input-field"
          value={usuario.nombre}
          onChange={handleInputChange}
          placeholder={googlenombre}
        />
        <br />
        
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          className="input-field"
          value={usuario.apellido}
          onChange={handleInputChange}
          placeholder={googleapellido}
        />
        <br />
        
        <label>Fecha de nacimiento:</label>
        <input
          type="date"
          name="fecha_nacimiento"
          className="input-field"
          value={usuario.fecha_nacimiento}
          onChange={handleInputChange}
        />
        <br />
        <label>Género:</label>
        <input
          type="text"
          name="genero"
          className="input-field"
          value={usuario.genero}
          onChange={handleInputChange}
          placeholder="Género"
        />
        <br />
        <label>Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          className="input-field"
          value={usuario.telefono}
          onChange={handleInputChange}
          placeholder="Teléfono"
        />
        <button type="submit" className="botonAccion">
          Guardar cambios
        </button>
        <button
          type="button"
          className="botonAccion3"
          onClick={() => navigate("/Perfil")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default CompletarPerfil;
