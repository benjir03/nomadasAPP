import axios from 'axios';

// Función para calcular la ruta óptima y devolver el enlace de Google Maps
export const calcularRuta = async (placeIds, travelMode = 'driving') => {
  if (!placeIds.length) return null;
  const origins = placeIds[0];
  const destinations = placeIds.slice(1).join('|');
  try {
    const response = await axios.get(`http://localhost:3002/route-matrix?origins=${origins}&destinations=${destinations}`);
    const data = response.data;
    if (data.rows && data.rows[0] && data.rows[0].elements) {
      const route = optimizeRoute(data.rows[0].elements);
      return generateMapsLink(route, data.placeDetails, travelMode);
    }
    return null;
  } catch (error) {
    console.error("Error al obtener la matriz de rutas:", error);
    return null;
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

const generateMapsLink = (route, placeDetails, travelMode) => {
  const origin = encodeURIComponent(placeDetails[route[0]].formatted_address);
  const destination = encodeURIComponent(placeDetails[route[route.length - 1]].formatted_address);
  const waypoints = route.slice(1, -1).map(index => encodeURIComponent(placeDetails[index].formatted_address)).join('|');
  const link = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=${travelMode}`;
  return link;
};
