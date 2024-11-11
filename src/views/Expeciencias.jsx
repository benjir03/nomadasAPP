import React, { useState } from 'react';
import historia from "../imgs/historia.jpg"; // Asegúrate de que la ruta sea correcta

// Componente para calificar con estrellas
function StarRating({ rating, onRate }) {
  const stars = Array(5).fill(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {stars.map((_, index) => (
        <span
          key={index}
          style={{
            cursor: 'pointer',
            color: index < rating ? '#FFD700' : '#ccc',
            fontSize: '20px',
          }}
          onClick={() => onRate(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// Componente principal de Experiencias
export default function Experiencias() {
  const [opiniones, setOpiniones] = useState([]);
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState(0);

  // Función para agregar una nueva opinión
  const agregarOpinion = () => {
    if (nombre && comentario) {
      const nuevaOpinion = {
        id: Date.now(),
        nombre,
        comentario,
        rating,
      };
      setOpiniones([...opiniones, nuevaOpinion]);
      setNombre('');
      setComentario('');
      setRating(0);
    }
  };

  return (
    <div style={{
      display: 'flex',
      padding: '20px',
      maxWidth: '1000px',
      margin: '0 auto',
      color: '#00363A',
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      
      {/* Imagen de fondo de toda la sección */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${historia})`, // Usa la imagen importada
        backgroundSize: 'cover', // Ajusta la imagen para que cubra sin recortes
        backgroundPosition: 'center',
        opacity: 0.2, // Ajusta la opacidad sin desenfoque
        zIndex: 1,
      }}></div>

      {/* Contenido de la sección con opiniones y formulario */}
      <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Sección de opiniones */}
        <div style={{ flex: 1, marginRight: '20px' }}>
          <h2 style={{ color: '#00363A' }}>Opiniones de otros usuarios</h2>
          {opiniones.length > 0 ? (
            opiniones.map((opinion) => (
              <div key={opinion.id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <h4>{opinion.nombre}</h4>
                <p>{opinion.comentario}</p>
                <StarRating rating={opinion.rating} onRate={() => {}} />
              </div>
            ))
          ) : (
            <p>No hay opiniones aún.</p>
          )}
        </div>
        
        {/* Formulario de opinión */}
        <div style={{
          flex: 1,
          padding: '20px',
          backgroundColor: 'rgba(0, 109, 119, 0.7)', // Fondo del formulario
          borderRadius: '8px',
        }}>
          <h2 style={{ color: '#ffffff' }}>Agrega tu opinión</h2>
          
          <div style={{ width: '80%', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '10px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #8FB8B8',
              }}
            />
            <textarea
              placeholder="Escribe tu opinión"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              style={{
                display: 'block',
                width: '100%',
                marginBottom: '10px',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #8FB8B8',
              }}
            />
            <StarRating rating={rating} onRate={setRating} />
          </div>

          <button
            onClick={agregarOpinion}
            style={{
              marginTop: '10px',
              padding: '10px 15px',
              backgroundColor: '#006D77',
              color: '#FFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold', // Texto en negritas
            }}
          >
            Enviar opinión
          </button>
        </div>
      </div>
    </div>
  );
}
