import React, { useState } from 'react';

const Ruta = () => {
    const [placeIds, setPlaceIds] = useState(['', '', '', '', '']);
    const [matrixResponse, setMatrixResponse] = useState(null);
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
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const origins = placeIds[0];
      const destinations = placeIds.slice(1).join('|');
      const response = await fetch(`http://localhost:3002/route-matrix?origins=${origins}&destinations=${destinations}`);
      const data = await response.json();
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
            {placeIds.map((placeId, index) => (
              <div key={index}>
                <label>
                  Place ID {index === 0 ? 'Origen' : `Destino ${index}`}:
                  <input type="text" value={placeId} onChange={(e) => handleChange(index, e)} />
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
          {matrixResponse && matrixResponse.rows && matrixResponse.rows[0] && matrixResponse.rows[0].elements && (
            <div>
              <h3>Ruta Optimizada:</h3>
              {optimizedRoute.map((index, i) => (
                <p key={i}>
                  {i === 0 ? 'Origen' : `Destino ${i}`} ({matrixResponse.placeDetails[index].name}): {matrixResponse.rows[0].elements[index].duration.text} ({matrixResponse.rows[0].elements[index].distance.text})
                </p>
              ))}
              {mapsLink && (
                <div>
                  <h3>Enlace a Google Maps:</h3>
                  <a href={mapsLink} target="_blank" rel="noopener noreferrer">Ver Ruta en Google Maps</a>
                </div>
              )}
            </div>
          )}
        </div>

    );
  };
export default Ruta;