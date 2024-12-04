import React, { useState } from 'react';
import "../estilos/styGustosPerfil.css";
import OpcionCard from '../componentes/OpcionCard'; 
import { FaLandmark, FaHiking, FaSpa, FaWalking, FaBicycle, FaCar, FaUser, FaUsers, FaCamera, FaMapMarkedAlt, FaPaw, FaBan, FaLeaf, FaSun, FaTree, FaSnowflake, FaPlane, FaCalendarAlt, FaClock, FaHeart, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GustosPerfil = () => {
  const navigate = useNavigate();

  const preguntas = [
    {
      pregunta: "¿Qué medios de transporte prefieres usar?",
      opciones: [
        { texto: "A pie", icono: <FaWalking />, valor:"W"},
        { texto: "Bicicleta", icono: <FaBicycle />, valor:"B" },
        { texto: "Coche", icono: <FaCar />, valor:"C" },
      ],
    },
    {
      pregunta: "¿Regularmente cuanto duran tus viajes?",
      opciones: [
        { texto: "1 día", icono: <FaClock />, valor:"1" },
        { texto: "2 días", icono: <FaCalendarAlt />, valor:"2" },
        { texto: "Más de 3 días", icono: <FaPlane />, valor:"M"},
      ],
    },
    {
      pregunta: "¿Viajas solo o acompañado?",
      opciones: [
        { texto: "Solo", icono: <FaUser />, valor:"A" },
        { texto: "Con pareja", icono: <FaHeart />, valor:"C" },
        { texto: "Con familia o amigos", icono: <FaUsers />, valor:"F" },
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
        { texto: "Sí", icono: <FaCheck />, valor:"S" },
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
    {
      pregunta: "Selecciona categorías de tu preferencia:",
      opciones: [
        { texto: "Gastronomía", icono: <FaLandmark />, valor:1 },
        { texto: "Cultura e Historia", icono: <FaHiking />, valor:2 },
        { texto: "Arte", icono: <FaSpa />, valor:8 },
        { texto: "Naturaleza y Aventura", icono: <FaWalking />, valor:3 },
        { texto: "Vida Nocturna", icono: <FaBicycle />, valor:4 },
        { texto: "Compras", icono: <FaCar />, valor:5 },
        { texto: "Familia y Niños", icono: <FaUser />, valor:6 },
        { texto: "Deportes y Actividades Extremas", icono: <FaUsers />, valor:7 },
      ],
    },
  ];

  const [indice, setIndice] = useState(0);
  const [selecciones, setSelecciones] = useState(Array(preguntas.length).fill(null));

  const manejarClickOpcion = (opcion) => {
    const nuevasSelecciones = [...selecciones];

    if (indice === preguntas.length - 1) {
      if (!nuevasSelecciones[indice]) {
        nuevasSelecciones[indice] = [];
      }
      if (nuevasSelecciones[indice].includes(opcion)) {
        nuevasSelecciones[indice] = nuevasSelecciones[indice].filter(
          (item) => item !== opcion
        );
      } else {
        nuevasSelecciones[indice].push(opcion);
      }
    } else {
      nuevasSelecciones[indice] = opcion;
    }

    setSelecciones(nuevasSelecciones);
  };

  const manejarClickSiguiente = () => {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
    }
  };

  const manejarClickRegresar = () => {
    if (indice > 0) {
      setIndice(indice - 1);
    }
  };

  const manejarClickFinalizar = async () => {
    try {
    // Desestructurar las respuestas directamente desde el array de selecciones
    const [
      transporte,
        duracion,
        compañia,
        turistico,
        pets,
        vegano,
        pet_friendly,
        capacidades_diferentes,
        mayoria_edad,
        ID_estacion,
        ID_categoria,
    ] = selecciones;

    // Crear el objeto con el formato esperado por el backend
    const requestData = {
      transporte: transporte,
      duracion: duracion,
      compañia: compañia,
      turistico: turistico,
      pets: pets,
      vegano: vegano,
      pet_friendly: pet_friendly,
      capacidades_diferentes: capacidades_diferentes,
      mayoria_edad: mayoria_edad,
      ID_estacion: ID_estacion,
      ID_categoria: ID_categoria,
    };

    console.log("Datos enviados al backend:", requestData);

      const response = await axios.post(
        'http://localhost:3001/gustos/registrar', // Endpoint del backend
        requestData, // Datos enviados
        { withCredentials: true } // Incluir cookies si son necesarias
      );
      console.log(response.data.message); // Mensaje del servidor
      alert("Gustos enviadas exitosamente");
      navigate("/Completar");
    } catch (error) {
      console.error("Error al enviar Gustos:", error);
      alert("Hubo un problema al enviar tus Gustos.");
    }
  };

  const todasRespondidas = selecciones.every((seleccion, i) => {
    if (i === preguntas.length - 1) {
      return seleccion && seleccion.length > 0;
    }
    return seleccion !== null;
  });

  return (
    <div className="gustosPerfil-contenedor">
      {/* Imagen de fondo */}
      <div className="gustosPerfil-background"></div>

      {/* Contenido principal */}
      <h1 className="gustosPerfil-title">Queremos conocerte más</h1>
      <div>
        <h2 className="gustosPerfil-pregunta">{preguntas[indice].pregunta}</h2>
        <div className="opciones-contenedor horizontal">
          {preguntas[indice].opciones.map((opcion, idx) => (
            <OpcionCard
              key={idx}
              icono={opcion.icono}
              texto={opcion.texto}
              seleccionado={
                indice === preguntas.length - 1
                  ? selecciones[indice]?.includes(opcion.valor)
                  : selecciones[indice] === opcion.valor
              }
              onClick={() => manejarClickOpcion(opcion.valor)}
            />
          ))}
        </div>
      </div>
      <div className="accion-botones">
        <button className="botonAccion" onClick={manejarClickRegresar} disabled={indice === 0}>
          Regresar
        </button>
        {indice < preguntas.length - 1 ? (
          <button
          className="botonAccion"
          onClick={manejarClickSiguiente}
          disabled={!selecciones[indice]} // Deshabilitado si no hay selección
          >
            Siguiente Pregunta
          </button>
        ) : (
          <button
            className="botonAccion"
            onClick={manejarClickFinalizar}
            disabled={!todasRespondidas}
            style={{ backgroundColor: todasRespondidas ? "var(--primary-color)" : "gray" }}
          >
            Finalizar
          </button>
        )}
      </div>
    </div>
  );
};

export default GustosPerfil;
