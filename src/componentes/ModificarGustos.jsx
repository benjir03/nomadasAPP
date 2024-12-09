import React, { useState, useEffect } from "react";
import { FaLandmark, FaHiking, FaSpa, FaWalking, FaBicycle, FaCar, FaUser, FaUsers, FaCamera, FaMapMarkedAlt, FaPaw, FaBan, FaLeaf, FaSun, FaTree, FaSnowflake, FaPlane, FaCalendarAlt, FaClock, FaHeart, FaCheck } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import "../estilos/styInicioRegistro.css";
import '../estilos/styGeneral.css';
import axios from "axios";

const ModGustos = ({Accion, Navegacion}) => {
    const [gustos, setGustos] = useState({
        transporte: "",
        duracion: "",
        compañia: "",
        turistico: "",
        pets: "",
        vegano: "",
        capacidades_diferentes: "",
        ID_estacion: "",
        ID_categoria: [],
    });

const categoriasDisponibles = [
    { texto: "Gastronomía", icono: <FaLandmark />, valor: 1 },
    { texto: "Cultura e Historia", icono: <FaHiking />, valor: 2 },
    { texto: "Arte", icono: <FaSpa />, valor: 8 },
    { texto: "Naturaleza y Aventura", icono: <FaWalking />, valor: 3 },
    { texto: "Vida Nocturna", icono: <FaBicycle />, valor: 4 },
    { texto: "Compras", icono: <FaCar />, valor: 5 },
    { texto: "Familia y Niños", icono: <FaUser />, valor: 6 },
    { texto: "Deportes y Actividades Extremas", icono: <FaUsers />, valor: 7 },
      ]; // Cambia estos valores según las opciones reales

const navigate = useNavigate();
  
  useEffect(() => {
    const fetchGustos = async () => {
        try {
            const response = await axios.get("http://localhost:3001/auth/gustos/gustos", {
                withCredentials: true,
            });
            const gustosData = response.data;
            console.log("Datos de gustos obtenidos:", gustosData);
            setGustos(gustosData); // Prellenar formulario
        } catch (error) {
            console.error('Error al obtener preferencias:', error);
        }
    };

    fetchGustos();
  }, []);
  
// Manejar cambios en el formulario
const handleChange = (e) => {
    const { name, value } = e.target;
    setGustos({ ...gustos, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setGustos((prevState) => {
      const selectedCategories = prevState.ID_categoria;
      if (checked) {
        return { ...prevState, ID_categoria: [...selectedCategories, parseInt(value)] };
      } else {
        return {
          ...prevState,
          ID_categoria: selectedCategories.filter((item) => item !== parseInt(value)),
        };
      }
    });
  };

// Enviar actualización de gustos
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:3001/gustos/modificar", gustos, {
        withCredentials: true,
      });
      alert("Gustos modificados exitosamente");
      navigate(Navegacion || "/");
    } catch (error) {
      console.error("Error al modificar los gustos:", error);
      alert("Hubo un error al modificar los gustos");
    }
}; 

  return (
    <div className="login-container">
        <h1 className="login-title">Modificar Preferencias</h1>
        <form className="login-form" onSubmit={handleSubmit}>
        <label>¿Qué medios de transporte prefieres usar?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="transporte"
            className="radio-input"
            value="W"
            checked={gustos.transporte === "W"}
            onChange={handleChange}
          />
          A pie <FaWalking />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="transporte"
            className="radio-input"
            value="C"
            checked={gustos.transporte === "C"}
            onChange={handleChange}
          />
            Auto   <FaCar />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="transporte"
            className="radio-input"
            value="B"
            checked={gustos.transporte === "B"}
            onChange={handleChange}
          />
          Bicicleta  <FaBicycle />
        </label>
        <label>¿Regularmente cuanto duran tus viajes?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="duracion"
            className="radio-input"
            value="1"
            checked={gustos.duracion === "1"}
            onChange={handleChange}
          />
          1 día  <FaClock />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="duracion"
            className="radio-input"
            value="2"
            checked={gustos.duracion === "2"}
            onChange={handleChange}
          />
          2 días  <FaCalendarAlt />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="duracion"
            className="radio-input"
            value="M"
            checked={gustos.duracion === "M"}
            onChange={handleChange}
          />
          Más de 3 días  <FaPlane />
        </label>
        <label>¿Viajas solo o acompañado?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="compañia"
            className="radio-input"
            value="A"
            checked={gustos.compañia === "A"}
            onChange={handleChange}
          />
          Solo  <FaUser />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="compañia"
            className="radio-input"
            value="C"
            checked={gustos.compañia === "C"}
            onChange={handleChange}
          />
          Con pareja  <FaHeart />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="compañia"
            className="radio-input"
            value="C"
            checked={gustos.compañia === "F"}
            onChange={handleChange}
          />
          Con familia o amigos <FaUsers />
        </label>
        <label>¿Prefieres visitar lugares turísticos o menos conocidos?</label>
        <label className="radio-label">  
          <input
            type="radio"
            name="turistico"
            className="radio-input"
            value="S"
            checked={gustos.turistico === "S"}
            onChange={handleChange}
          />
          Turísticos <FaCamera />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="turistico"
            className="radio-input"
            value="N"
            checked={gustos.turistico === "N"}
            onChange={handleChange}
          />
          Menos conocidos <FaMapMarkedAlt />
        </label>
        <label>¿Sueles llevar a tu mascota en los viajes?</label>
        <label className="radio-label">
          <input
            type="radio"
            className="radio-input"
            name="pets"
            value="S"
            checked={gustos.pets === "S"}
            onChange={handleChange}
          />
          Sí  <FaPaw />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="pets"
            className="radio-input"
            value="N"
            checked={gustos.pets === "N"}
            onChange={handleChange}
          />
          No  <FaBan />
        </label>
        <label>¿Eres vegano/a o prefieres opciones veganas?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="vegano"
            className="radio-input"
            value="S"
            checked={gustos.vegano === "S"}
            onChange={handleChange}
          />
          Sí  <FaCheck /> 
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="vegano"
            className="radio-input"
            value="N"
            checked={gustos.vegano === "N"}
            onChange={handleChange}
          />
          No  <FaBan />
        </label>
        <label>¿Te interesa que el lugar sea pet friendly?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="pet_friendly"
            className="radio-input"
            value="S"
            checked={gustos.pet_friendly === "S"}
            onChange={handleChange}
          />
          Sí  <FaCheck />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="pet_friendly"
            className="radio-input"
            value="N"
            checked={gustos.pet_friendly === "N"}
            onChange={handleChange}
          />
          No  <FaBan />
        </label>
        <label>¿Requieres asistencia para capacidades diferentes?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="capacidades_diferentes"
            className="radio-input"
            value="S"
            checked={gustos.capacidades_diferentes === "S"}
            onChange={handleChange}
          />
          Sí  <FaCheck />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="capacidades_diferentes"
            className="radio-input"
            value="N"
            checked={gustos.capacidades_diferentes === "N"}
            onChange={handleChange}
          />
          No  <FaBan />
        </label>
        <label>¿Eres mayor de edad (18+ años)?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="mayoria_edad"
            className="radio-input"
            value="S"
            checked={gustos.mayoria_edad === "S"}
            onChange={handleChange}
          />
          Sí  <FaCheck />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="mayoria_edad"
            className="radio-input"
            value="N"
            checked={gustos.mayoria_edad === "N"}
            onChange={handleChange}
          />
          No  <FaBan />
        </label>
        <label>¿En qué estaciones del año te gusta más viajar?</label>
        <label className="radio-label">
          <input
            type="radio"
            name="ID_estacion"
            className="radio-input"
            value="1"
            checked={gustos.ID_estacion === "1"}
            onChange={handleChange}
          />
          Primavera   <FaTree />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="ID_estacion"
            className="radio-input"
            value="2"
            checked={gustos.ID_estacion === "2"}
            onChange={handleChange}
          />
          Verano  <FaSun />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="ID_estacion"
            className="radio-input"
            value="3"
            checked={gustos.ID_estacion === "3"}
            onChange={handleChange}
          />
          Otoño  <FaLeaf />
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="ID_estacion"
            className="radio-input"
            value="4"
            checked={gustos.ID_estacion === "4"}
            onChange={handleChange}
          />
          Invierno <FaSnowflake />
        </label>
        <label>Selecciona categorías de tu preferencia:</label>
        <label /*className="radio-label"*/>
          {categoriasDisponibles.map((categoria) => (
            <div key={categoria.valor}>
              <input
                type="checkbox"
                value={categoria.valor}
                className="checkbox-input"
                checked={gustos.ID_categoria.includes(categoria.valor)}
                onChange={handleCheckboxChange}
              />
              {categoria.icono}  {categoria.texto}
            </div>
          ))}
        </label>
        <button type="submit" className="botonAccion">
            Guardar cambios
            </button>
            <button
            type="button"
            className="botonAccion3"
            onClick={() => navigate("../Perfil")}
            >
            Cancelar
            </button>
        </form>
    </div>
  );
};

export default ModGustos;
