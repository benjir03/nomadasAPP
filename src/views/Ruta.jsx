import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Ruta = () => {
    const [placeIds, setPlaceIds] = useState(['', '', '', '', '']);
    const [matrixResponse, setMatrixResponse] = useState(null);
    const [plan, setPlan] = useState([]);
    const [optimizedRoute, setOptimizedRoute] = useState([]);
    const [mapsLink, setMapsLink] = useState('');
    const [travelMode, setTravelMode] = useState('driving');
  
    const handleChange = (index, event) => {
      const newPlaceIds = [...placeIds];
      newPlaceIds[index] = event.target.value;
      setPlaceIds(newPlaceIds);
    };
  
    const handleModeChange = (event) => {
      setTravelMode(event.target.value);
    };
    
    useEffect(() => {
      const fetchPlan = async () => {
        try {
          const response = await axios.get('http://localhost:3001/plan/obtenerPlan', {
            withCredentials: true,
          });
          console.log(response);
          const planData = response.data;
          setPlan(planData);
          const initialPlaceIds = planData.map((item) => item.ID_google || ""); // Ajusta según tus datos
          setPlaceIds(initialPlaceIds);
        } catch (error) {
          console.error("Error al obtener el plan del usuario:", error);
        }
      };
      
      fetchPlan();
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(placeIds);
      const origins = placeIds[0];
      const destinations = placeIds.slice(1).join('|');
      const response = await fetch(`http://localhost:3002/route-matrix?origins=${origins}&destinations=${destinations}`);
      const data = await response.json();
      console.log(data);
      setMatrixResponse(data);
      if (data.rows && data.rows[0] && data.rows[0].elements) {
        const route = optimizeRoute(data.rows[0].elements);
        setOptimizedRoute(route);
        generateMapsLink(route, data.placeDetails);
      }
    };
  
    const optimizeRoute = (elements) => {
      const numDestinations = elements.length;
      const visited = Array(numDestinations).fill(false);
      const route = [0]; // Start from the origin
      visited[0] = true;
  
      for (let i = 0; i < numDestinations - 1; i++) {
        let last = route[route.length - 1];
        let nearest = -1;
        let minTime = Infinity;
  
        for (let j = 0; j < numDestinations; j++) {
          if (!visited[j] && elements[last].duration.value < minTime) {
            nearest = j;
            minTime = elements[last].duration.value;
          }
        }
  
        route.push(nearest);
        visited[nearest] = true;
      }
  
      return route;
    };
  
    const generateMapsLink = (route, placeDetails) => {
      const origin = encodeURIComponent(placeDetails[route[0]].formatted_address);
      const destination = encodeURIComponent(placeDetails[route[route.length - 1]].formatted_address);
      const waypoints = route.slice(1, -1).map(index => encodeURIComponent(placeDetails[index].formatted_address)).join('|');
      const link = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=${travelMode}`;
      setMapsLink(link);
    };
  
    return (

        <div>
          <form onSubmit={handleSubmit}>
            {plan.map((placeId, index) => (
              <div key={index}>
                <label>
                  {index === 0 ? `Origen ${placeId.nombre_actividad}` : `Destino ${placeId.nombre_actividad}`}:
                  <input type="text" value={placeId.ID_google} onChange={(event) => handleChange(index, event)}/>
                </label>
              </div>
            ))}
            <label>
              Modo de Transporte:
              <select value={travelMode} onChange={handleModeChange}>
                <option value="driving">Conducción</option>
                <option value="walking">Caminando</option>
                <option value="bicycling">Bicicleta</option>
                <option value="transit">Transporte Público</option>
              </select>
            </label>
            <button type="submit">Calcular Ruta</button>
          </form>
          {matrixResponse && matrixResponse.rows && matrixResponse.rows[0] && matrixResponse.rows[0].elements ? (
  <div>
    <h3>Ruta Optimizada:</h3>
    {optimizedRoute.map((index, i) => {
      const element = matrixResponse.rows[0].elements[index];
      const placeDetail = matrixResponse.placeDetails?.[index];
      
      // Validamos que element y sus propiedades existan
      if (element && element.duration && element.distance) {
        return (
          <p key={i}>
            {i === 0 ? 'Origen' : `Destino ${i}`} ({placeDetail?.name || 'Lugar desconocido'}): 
            {element.duration.text} ({element.distance.text})
          </p>
        );
      }
      return <p key={i}>Información no disponible para el lugar {i}</p>;
    })}
    {mapsLink && (
      <div>
        <h3>Enlace a Google Maps:</h3>
        <a href={mapsLink} target="_blank" rel="noopener noreferrer">Ver Ruta en Google Maps</a>
      </div>
    )}
  </div>
) : (
  <p>No hay datos disponibles para calcular la ruta.</p>
)}

        </div>

    );
  };
export default Ruta;