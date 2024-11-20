import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';

const ModPerfil = ({Accion, Navegacion}) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido:"",
    fecha_nacimiento: "",
    correo: "",
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
        const userData = response.data;

        // Formatear la fecha de nacimiento al formato YYYY-MM-DD
        const formattedDate = userData.fecha_nacimiento
          ? userData.fecha_nacimiento.split("T")[0]
          : "";

        setUsuario({ ...userData, fecha_nacimiento: formattedDate });
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
      navigate(Navegacion); // Redirige al perfil después de guardar
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Hubo un problema al actualizar el perfil");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">{Accion}</h1>
      <form className="login-form" onSubmit={handleUpdate}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          className="input-field"
          value={usuario.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
        />
        <br />
        
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          className="input-field"
          value={usuario.apellido}
          onChange={handleInputChange}
          placeholder="Apellido"
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
        <label className="label">Correo:</label>
        <input
          type="email"
          name="correo"
          className="input-field"
          value={usuario.email}
          onChange={handleInputChange}
          placeholder="Correo"
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
          onClick={() => navigate(Navegacion)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ModPerfil;
