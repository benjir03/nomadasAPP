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

const navigate = useNavigate();
  
  useEffect(() => {
    const fetchGustos = async () => {
        try {
            const response = await axios.get("http://localhost:3001/auth/gustos", {
                withCredentials: true,
            });
            const gustosData = response.data;
            setGustos({
                ...gustosData,
                ID_categoria: gustosData.ID_categoria || [],
            }); // Prellenar formulario
        } catch (error) {
            console.error('Error al obtener preferencias:', error);
        }
    };

    fetchGustos();
  }, []);
  
// Manejar cambios en el formulario
const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGustos((prevGustos) => ({
      ...prevGustos,
      [name]: type === "checkbox" ? checked : value,
    }));
};

const handleCategoryChange = (category) => {
    setGustos((prevGustos) => {
      const updatedCategories = prevGustos.ID_categoria.includes(category)
        ? prevGustos.ID_categoria.filter((cat) => cat !== category)
        : [...prevGustos.ID_categoria, category];
      return { ...prevGustos, ID_categoria: updatedCategories };
    });
};

// Enviar actualización de gustos
const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        await axios.put("http://localhost:3001/auth/modificar-gustos", gustos, {
        withCredentials: true,
        });
        alert('Preferencias actualizadas correctamente');
        navigate(Navegacion); // Redirige al perfil después de guardar
    } catch (error) {
        console.error('Error al actualizar Preferencias:', error);
        alert('Error al actualizar preferencias');
    }
};

  const preguntas = [
    {
      pregunta: "¿Qué medios de transporte prefieres usar?",
      opciones: [
        { texto: "A pie", icono: <FaWalking />, valor: "W" },
        { texto: "Bicicleta", icono: <FaBicycle />, valor: "B" },
        { texto: "Coche", icono: <FaCar />, valor: "C" },
      ],
    },
    {
      pregunta: "¿Regularmente cuánto duran tus viajes?",
      opciones: [
        { texto: "1 día", icono: <FaClock />, valor: "1" },
        { texto: "2 días", icono: <FaCalendarAlt />, valor: "2" },
        { texto: "Más de 3 días", icono: <FaPlane />, valor: "M" },
      ],
    },
    {
      pregunta: "¿Viajas solo o acompañado?",
      opciones: [
        { texto: "Solo", icono: <FaUser />, valor: "A" },
        { texto: "Con pareja", icono: <FaHeart />, valor: "C" },
        { texto: "Con familia o amigos", icono: <FaUsers />, valor: "F" },
      ],
    },
    {
        pregunta: "¿Prefieres visitar lugares turísticos o menos conocidos?",
        opciones: [
          { texto: "Turísticos", icono: <FaCamera />, valor:"S" },
          { texto: "Menos conocidos", icono: <FaMapMarkedAlt />, valor:"N" },
        ],
      },
      {
        pregunta: "¿Sueles llevar a tu mascota en los viajes?",
        opciones: [
          { texto: "Sí", icono: <FaPaw />, valor:"S" },
          { texto: "No", icono: <FaBan />, valor:"N" },
        ],
      },
      {
        pregunta: "¿Eres vegano/a o prefieres opciones veganas?",
        opciones: [
          { texto: "Sí", icono: <FaCheck />, valor:"S" },
          { texto: "No", icono: <FaBan />, valor:"N" },
        ],
      },
      {
        pregunta: "¿Te interesa que el lugar sea pet friendly?",
        opciones: [
          { texto: "Sí", icono: <FaPaw />, valor:"S" },
          { texto: "No", icono: <FaBan />, valor:"N" },
        ],
      },
      {
        pregunta: "¿Requieres asistencia para capacidades diferentes?",
        opciones: [
          { texto: "Sí", icono: <FaCheck />, valor:"S" },
          { texto: "No", icono: <FaBan />, valor:"N" },
        ],
      },
      {
        pregunta: "¿Eres mayor de edad (18+ años)?",
        opciones: [
          { texto: "Sí", icono: <FaCheck />,valor:"S" },
          { texto: "No", icono: <FaBan />,valor:"N" },
        ],
      },
      {
        pregunta: "¿En qué estaciones del año te gusta más viajar?",
        opciones: [
          { texto: "Primavera", icono: <FaTree />, valor:1 },
          { texto: "Verano", icono: <FaSun />, valor:2 },
          { texto: "Otoño", icono: <FaLeaf />, valor:3 },
          { texto: "Invierno", icono: <FaSnowflake />, valor:4 },
        ],
      },
  ];
  

  return (
    <div className="login-container">
        <h1 className="login-title">Modificar Preferencias</h1>
        <form className="login-form" onSubmit={handleUpdate}>
        {preguntas.map((pregunta, index) => (
          <div key={index} className="pregunta">
            <h3>{pregunta.pregunta}</h3>
            <div className="opciones">
              {pregunta.opciones.map((opcion, idx) => (
                <label key={idx} className="opcion">
                  <input
                    type="radio"
                    name={pregunta.name}
                    value={opcion.valor}
                    checked={gustos[pregunta.name] === opcion.valor}
                    onChange={handleInputChange}
                  />
                  {opcion.icono} {opcion.texto}
                </label>
              ))}
            </div>
          </div>
        ))}
        <h3>Selecciona categorías favoritas:</h3>
          {[
            { id: 1, label: "Gastronomía", icono: <FaLandmark /> },
            { id: 2, label: "Cultura e Historia", icono: <FaHiking /> },
            { id: 3, label: "Naturaleza y Aventura", icono: <FaTree /> },
            { id: 4, label: "Vida Nocturna", icono: <FaBicycle /> },
            { id: 5, label: "Compras", icono: <FaCar /> },
            { id: 6, label: "Familia y Niños", icono: <FaUsers /> },
            { id: 7, label: "Deportes y Actividades Extema", icono: <FaSpa /> },
          ].map((category) => (
            <label key={category.id} className="opcion">
              <input
                type="checkbox"
                checked={gustos.ID_categoria.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              {category.label}
            </label>
          ))}
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

export default ModGustos;
