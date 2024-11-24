import React, { useState } from 'react';
import "../estilos/styGustosPerfil.css";
import OpcionCard from '../componentes/OpcionCard'; 
import { FaLandmark, FaHiking, FaSpa, FaWalking, FaBicycle, FaCar, FaUser, FaUsers, FaCamera, FaMapMarkedAlt, FaPaw, FaBan, FaLeaf, FaSun, FaTree, FaSnowflake, FaPlane, FaCalendarAlt, FaClock, FaHeart, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GustosPerfil = () => {
  const navigate = useNavigate();

  const preguntas = [
    {
      pregunta: "¿Qué medios de transporte prefieres usar?",
      opciones: [
        { texto: "A pie", icono: <FaWalking /> },
        { texto: "Bicicleta", icono: <FaBicycle /> },
        { texto: "Coche", icono: <FaCar /> },
      ],
    },
    {
      pregunta: "¿Regularmente cuanto duran tus viajes?",
      opciones: [
        { texto: "1 día", icono: <FaClock /> },
        { texto: "2 días", icono: <FaCalendarAlt /> },
        { texto: "Más de 3 días", icono: <FaPlane /> },
      ],
    },
    {
      pregunta: "¿Viajas solo o acompañado?",
      opciones: [
        { texto: "Solo", icono: <FaUser /> },
        { texto: "Con pareja", icono: <FaHeart /> },
        { texto: "Con familia o amigos", icono: <FaUsers /> },
      ],
    },
    {
      pregunta: "¿Prefieres visitar lugares turísticos o menos conocidos?",
      opciones: [
        { texto: "Turísticos", icono: <FaCamera /> },
        { texto: "Menos conocidos", icono: <FaMapMarkedAlt /> },
      ],
    },
    {
      pregunta: "¿Sueles llevar a tu mascota en los viajes?",
      opciones: [
        { texto: "Sí", icono: <FaPaw /> },
        { texto: "No", icono: <FaBan /> },
      ],
    },
    {
      pregunta: "¿Eres vegano/a o prefieres opciones veganas?",
      opciones: [
        { texto: "Sí", icono: <FaCheck /> },
        { texto: "No", icono: <FaBan /> },
      ],
    },
    {
      pregunta: "¿Te interesa que el lugar sea pet friendly?",
      opciones: [
        { texto: "Sí", icono: <FaCheck /> },
        { texto: "No", icono: <FaBan /> },
      ],
    },
    {
      pregunta: "¿Requieres asistencia para capacidades diferentes?",
      opciones: [
        { texto: "Sí", icono: <FaCheck /> },
        { texto: "No", icono: <FaBan /> },
      ],
    },
    {
      pregunta: "¿Eres mayor de edad (18+ años)?",
      opciones: [
        { texto: "Sí", icono: <FaCheck /> },
        { texto: "No", icono: <FaBan /> },
      ],
    },
    {
      pregunta: "¿En qué estaciones del año te gusta más viajar?",
      opciones: [
        { texto: "Primavera", icono: <FaTree /> },
        { texto: "Verano", icono: <FaSun /> },
        { texto: "Otoño", icono: <FaLeaf /> },
        { texto: "Invierno", icono: <FaSnowflake /> },
      ],
    },
    {
      pregunta: "Selecciona categorías de tu preferencia:",
      opciones: [
        { texto: "Gastronomía", icono: <FaLandmark /> },
        { texto: "Cultura e Historia", icono: <FaHiking /> },
        { texto: "Arte", icono: <FaSpa /> },
        { texto: "Naturaleza y Aventura", icono: <FaWalking /> },
        { texto: "Vida Nocturna", icono: <FaBicycle /> },
        { texto: "Compras", icono: <FaCar /> },
        { texto: "Familia y Niños", icono: <FaUser /> },
        { texto: "Deportes y Actividades Extremas", icono: <FaUsers /> },
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

  const manejarClickFinalizar = () => {
    navigate('/Perfil');
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
                  ? selecciones[indice]?.includes(opcion.texto)
                  : selecciones[indice] === opcion.texto
              }
              onClick={() => manejarClickOpcion(opcion.texto)}
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
