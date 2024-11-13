import React, { useState } from 'react';
import "../estilos/styGustosPerfil.css";
import OpcionCard from '../componentes/OpcionCard'; 
import { FaLandmark, FaHiking, FaSpa, FaWalking, FaBicycle, FaCar, FaUser, FaUsers, FaCamera, FaMapMarkedAlt, FaPaw, FaBan, FaLeaf, FaSun, FaTree, FaSnowflake, FaPlane, FaCalendarAlt, FaClock, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GustosPerfil = () => {
  const navigate = useNavigate();

  const preguntas = [
    {
      pregunta: "¿Qué tipo de experiencias prefieres?",
      opciones: [
        { texto: "Cultural", icono: <FaLandmark /> },
        { texto: "Aventura", icono: <FaHiking /> },
        { texto: "Relajación", icono: <FaSpa /> },
      ],
    },
    {
      pregunta: "¿Qué medios de transporte prefieres usar?",
      opciones: [
        { texto: "A pie", icono: <FaWalking /> },
        { texto: "Bicicleta", icono: <FaBicycle /> },
        { texto: "Coche", icono: <FaCar /> },
      ],
    },
    {
      pregunta: "¿Regularmente cuanto duran tus viajes ?",
      opciones: [
        { texto: "Meses", icono: <FaPlane /> },
        { texto: "Semanas", icono: <FaCalendarAlt /> },
        { texto: "Dias", icono: <FaClock /> },
      ],
    },
    {
      pregunta: "¿Viajas solo o acompañado?",
      opciones: [
        { texto: "Solo", icono: <FaUser /> },
        { texto: "Con familia", icono: <FaUsers /> },
        { texto: "Con pareja", icono: <FaHeart /> },    
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
      pregunta: "¿En qué estaciones del año te gusta más viajar?",
      opciones: [
        { texto: "Primavera", icono: <FaLeaf /> },
        { texto: "Verano", icono: <FaSun /> },
        { texto: "Otoño", icono: <FaTree /> },
        { texto: "Invierno", icono: <FaSnowflake /> },
      ],
    },
  ];


  const [indice, setIndice] = useState(0);
  const [selecciones, setSelecciones] = useState(Array(preguntas.length).fill(null));

  const manejarClickOpcion = (opcion) => {
    const nuevasSelecciones = [...selecciones];
    nuevasSelecciones[indice] = opcion;
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
    navigate('/ruta-final'); // Reemplaza '/ruta-final' con la ruta deseada
  };

  const todasRespondidas = selecciones.every((seleccion) => seleccion !== null);

  return (
    <div>
      <h1 className="gustosPerfil-title">Queremos conocerte más</h1>
      <div>
        <h2>{preguntas[indice].pregunta}</h2>
        <div className="opciones-contenedor horizontal">
          {preguntas[indice].opciones.map((opcion, idx) => (
            <OpcionCard
              key={idx}
              icono={opcion.icono}
              texto={opcion.texto}
              seleccionado={selecciones[indice] === opcion.texto}
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
            disabled={!selecciones[indice]}
            style={{ backgroundColor: selecciones[indice] ? "var(--primary-color)" : "gray" }}
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
