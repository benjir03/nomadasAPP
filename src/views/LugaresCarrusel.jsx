import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../estilos/CarouselOptions.css';
import axios from 'axios';

const LugaresCarrusel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

   const categorias = {

    gastronomia :[
    "restaurant",
    "pizza_restaurant",
    "mexican_restaurant",
    "italian_restaurant",
    "chinese_restaurant",
    "indian_restaurant",
    "fast_food_restaurant",
    "vegan_restaurant",
    "vegetarian_restaurant",
    "seafood_restaurant",
    "hamburger_restaurant",
    "sushi_restaurant",
    "brunch_restaurant",
    "coffee_shop",
    "ice_cream_shop",
    "bakery",
    "bar",
    "wine_bar"],

  Cultura : [
    "art_gallery", "art_studio", "auditorium", "cultural_landmark", "historical_place", "monument", 
    "museum", "sculpture", "historical_landmark", "library"
  ],
  
  ArteEntretenimiento : [
    "art_gallery", "art_studio", "auditorium", "cultural_landmark", "museum", "performing_arts_theater", 
    "sculpture", "library", "karaoke", "movie_theater", "opera_house", "philharmonic_hall", "planetarium"
  ],
  
  Naturaleza: [
    "adventure_sports_", "adventure_sports_center", "aquarium", "botanical_garden", "cycling_park", 
    "dance_hall", "dog_park", "ferris_wheel", "garden", "hiking_area", "historical_landmark", "national_park", 
    "off_roading_area", "skateboard_park", "state_park", "tourist_attraction", "water_park", "wildlife_park", 
    "wildlife_refuge", "zoo", "park", "roller_coaster", "beach"
  ],
  
  VidaNocturna : [
    "karaoke", "night_club", "bar", "liquor_store", "cafe", "cafeteria", "diner", "wine_bar"
  ],
  
  Compras : [
    "acai_shop", "bagel_shop", "bakery", "candy_store", "chocolate_factory", "chocolate_shop", "coffee_shop", 
    "confectionery", "dessert_shop", "donut_shop", "food_court", "ice_cream_shop", "juice_shop", "sandwich_shop", 
    "florist", "food_delivery", "asian_grocery_store", "book_store", "clothing_store", "convenience store", 
    "department_store", "discount_store", "food_store", "jewelry_store", "market", "shopping_mall", "supermarket", 
    "plaza", "wine_bar"
  ],
  
  FamiliaNinos : [
    "childrens_camp", "movie_theater", "tourist_attraction", "water_park", "wildlife_park", "wildlife_refuge", 
    "zoo", "shopping_mall", "store", "cycling_park", "park", "planetarium", "plaza", "roller_coaster", "beach"
  ],
  
  Deportes : [
    "adventure_sports_", "adventure_sports_center", "aquarium", "bowling_alley", "casino", "comedy_club", 
    "ferris_wheel", "observation_deck", "off_roading_area", "skateboard_park", "tourist_attraction", "water_park", 
    "video_arcade", "yoga_studio", "sauna", "cycling_park", "dance_hall", "park", "picnic_ground", "planetarium", 
    "plaza", "roller_coaster", "swimming_pool", "sports_activity_location", "sports_club", "playground"
  ], };

  
  // Mapeo de las categorías en inglés a español para la visualización
  const categoriasTraduccion = {
    "restaurant": "Restaurantes",
    "pizza_restaurant": "Restaurantes de Pizza",
    "mexican_restaurant": "Restaurantes Mexicanos",
    "italian_restaurant": "Restaurantes Italianos",
    "chinese_restaurant": "Restaurantes Chinos",
    "indian_restaurant": "Restaurantes Indios",
    "fast_food_restaurant": "Comida Rápida",
    "vegan_restaurant": "Restaurantes Veganos",
    "vegetarian_restaurant": "Restaurantes Vegetarianos",
    "seafood_restaurant": "Restaurantes de Mariscos",
    "hamburger_restaurant": "Restaurantes de Hamburguesas",
    "sushi_restaurant": "Restaurantes de Sushi",
    "brunch_restaurant": "Restaurantes de Brunch",
    "coffee_shop": "Cafeterías",
    "ice_cream_shop": "Heladerías",
    "bakery": "Panaderías",
    "bar": "Bares",
    "wine_bar": "Bares de Vino",
     // Cultura e Historia
    "art_gallery": "Galería de Arte",
    "art_studio": "Estudio de Arte",
    "auditorium": "Auditorio",
    "cultural_landmark": "Hito Cultural",
    "historical_place": "Lugar Histórico",
    "monument": "Monumento",
    "museum": "Museo",
    "sculpture": "Escultura",
    "historical_landmark": "historical_landmark",
    "library": "Biblioteca",

    // Arte y Entretenimiento
    "performing_arts_theater": "Teatro de Artes Escénicas",
    "movie_theater": "Cine",
    "opera_house": "Teatro de Ópera",
    "philharmonic_hall": "Sala Sinfónica",
    "planetarium": "Planetario",
    
    // Naturaleza y Aventura
    "adventure_sports_": "Deportes de Aventura",
    "adventure_sports_center": "Centro de Deportes de Aventura",
    "aquarium": "Acuario",
    "botanical_garden": "Jardín Botánico",
    "cycling_park": "Parque de Ciclismo",
    "dance_hall": "Salón de Baile",
    "dog_park": "Parque para Perros",
    "ferris_wheel": "Rueda de la Fortuna",
    "garden": "Jardín",
    "hiking_area": "Zona de Senderismo",
    "historical_landmark": "Monumento Histórico",
    "national_park": "Parque Nacional",
    "off_roading_area": "Zona de Off-Roading",
    "skateboard_park": "Parque de Skateboard",
    "state_park": "Parque Estatal",
    "tourist_attraction": "Atractivo Turístico",
    "water_park": "Parque Acuático",
    "wildlife_park": "Parque de Vida Silvestre",
    "wildlife_refuge": "Refugio de Vida Silvestre",
    "zoo": "Zoológico",
    "park": "Parque",
    "roller_coaster": "Montaña Rusa",
    "beach": "Playa",

    // Vida Nocturna
    "karaoke" : "karaoke",
    "night_club": "Discoteca",
    "liquor_store": "Tienda de Licores",
    "wine_bar": "Bar de Vinos",

    // Compras
      "acai_shop": "Tienda de Acai",
      "bagel_shop": "Tienda de Bagels",
      "bakery": "Panadería",
      "candy_store": "Tienda de Golosinas",
      "chocolate_factory": "Fábrica de Chocolate",
      "chocolate_shop": "Tienda de Chocolate",
      "coffee_shop": "Cafetería",
      "confectionery": "Confitería",
      "dessert_shop": "Tienda de Postres",
      "donut_shop": "Tienda de Donas",
      "food_court": "Comedor de Comida Rápida",
      "ice_cream_shop": "Tienda de Helados",
      "juice_shop": "Tienda de Jugos",
      "sandwich_shop": "Tienda de Sandwiches",
      "florist": "Floristería",
      "food_delivery": "Servicio de Comida a Domicilio",
      "asian_grocery_store": "Tienda de Comestibles Asiáticos",
      "book_store": "Librería",
      "clothing_store": "Tienda de Ropa",
      "convenience_store": "Tienda de Conveniencia",
      "department_store": "Tienda Departamental",
      "discount_store": "Tienda de Descuentos",
      "food_store": "Tienda de Alimentos",
      "jewelry_store": "Joyería",
      "market": "Mercado",
      "shopping_mall": "Centro Comercial",
      "supermarket": "Supermercado",
      "plaza": "Plaza Comercial",
      "wine_bar": "Bar de Vinos",
      "adventure_sports_": "Deportes de Aventura",
      "adventure_sports_center": "Centro de Deportes de Aventura",
      "aquarium": "Acuario",
      "bowling_alley": "Bolera",
      "casino": "Casino",
      "comedy_club": "Club de Comedia",
      "ferris_wheel": "Rueda de la Fortuna",
      "observation_deck": "Plataforma de Observación",
      "off_roading_area": "Zona de Off-Roading",
      "skateboard_park": "Parque de Skateboarding",
      "tourist_attraction": "Atracción Turística",
      "water_park": "Parque Acuático",
      "video_arcade": "Arcade de Video",
      "yoga_studio": "Estudio de Yoga",
      "sauna": "Sauna",
      "cycling_park": "Parque de Ciclismo",
      "dance_hall": "Salón de Baile",
      "park": "Parque",
      "picnic_ground": "Zona de Picnic",
      "planetarium": "Planetario",
      "plaza": "Plaza",
      "roller_coaster": "Montaña Rusa",
      "swimming_pool": "Piscina",
      "sports_activity_location": "Ubicación de Actividades Deportivas",
      "sports_club": "Club Deportivo",
      "playground": "Parque Infantil"
    
    
  
  };

   // Estado para manejar las categorías seleccionadas
   const [selectedCategories, setSelectedCategories] = useState([]);
   const [showCheckboxes, setShowCheckboxes] = useState(false);
   const [availableCategories, setAvailableCategories] = useState([]); // Aquí inicializamos
 
  

  const [city, setCity] = useState(location.state?.ciudad || '');
  const [radius, setRadius] = useState('');
  const [categoria, setCategory] = useState(location.state?.categoria || '');
  const [keywords, setKeywords] = useState('');
  const [priceRange, setPriceRange] = useState(location.state?.presupuesto || '');
  const [rating, setRating] = useState(location.state?.calificacionMinima || '');
  const [ambiance, setAmbiance] = useState(location.state?.ambiente || '');
  const [lessKnown, setLessKnown] = useState(false);
  const [nonTourist, setNonTourist] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noResults, setNoResults] = useState(false);  // Agregar estado para verificar resultados vacíos

   // Detectar si la categoría es gastronómica y mostrar los checkboxes
   useEffect(() => {
    console.log("Categoria seleccionada:", categoria); // Verifica el valor de categoria
    if (categoria && categorias[categoria]) {
      console.log("Categorías disponibles:", categorias[categoria]); // Verifica las categorías disponibles
      setShowCheckboxes(true);
      setAvailableCategories(categorias[categoria]);
    } else {
      setShowCheckboxes(false);
      setAvailableCategories([]);
    }
  }, [categoria]);
  
  
// Manejador de cambios en los checkboxes
const handleCategoryChange = (e) => {
  const value = e.target.value;
  setSelectedCategories(prevState =>
    e.target.checked
      ? [...prevState, value]  // Agregar la categoría seleccionada
      : prevState.filter(cat => cat !== value)  // Eliminar la categoría deseleccionada
  );
};

  const handleSubmit = async (event) => {
    if (event) event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    setLoading(true);
    setError(null);
    setPackages([]);
    setNoResults(false);  // Reiniciar el estado de noResults al inicio de la búsqueda
  
    try {
      const categoriasParaBusqueda = selectedCategories.length > 0 ? selectedCategories : [categoria]; // Usamos las categorías seleccionadas
      // Comenzamos a construir la URL
      let url = `http://localhost:3002/search?city=${city}&category=${categoriasParaBusqueda.join(",")}&radius=${radius}&keywords=${keywords}`;
  
      // Verificar si la categoría seleccionada NO es 'museum' para incluir el precio
      if (categoria !== 'museum') {
        // Si el precio no es 4, lo añadimos a la URL
        if (priceRange && priceRange !== '4') {
          url += `&priceRange=${priceRange}`;
        }
      }
  
      // Verificar si hay calificación seleccionada
      if (rating) {
        if (rating === '4') {
          url += ``; // Si rating es 4, incluir todos los ratings
        } else {
          url += `&rating>=${rating}`;
        }
      }
  
      console.log("URL de búsqueda:", url); // Agregar log para verificar la URL
  
      const response = await axios.get(url);
  
      let fetchedPackages = response.data.results.map(result => ({
        id: result.place_id,
        title: result.name,
        category: categoria,
        recommendedTime: "Tiempo recomendado no disponible",
        openingTime: result.opening_hours ? (result.opening_hours.open_now ? "Abierto ahora" : "Cerrado") : "Horario no disponible",
        price: result.price_level !== undefined ? `Precio: ${result.price_level}` : "Precio no disponible",
        location: result.formatted_address || result.vicinity,
        image: getPhotoUrl(result.photo_reference),
        rating: result.rating || "Sin calificación",
        userRatingsTotal: result.user_ratings_total || 0
      }));
  
      // Si no hay resultados, actualizamos el estado para mostrar el mensaje
      if (fetchedPackages.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
  
      // Ordenar los lugares por calificación, en orden descendente (de mayor a menor)
      fetchedPackages.sort((a, b) => b.rating - a.rating);
  
      if (lessKnown) {
        fetchedPackages = fetchedPackages.filter(pkg => pkg.userRatingsTotal < 50);
      }
  
      if (nonTourist) {
        fetchedPackages = fetchedPackages.filter(pkg => !pkg.location.toLowerCase().includes("turístico"));
      }
  
      setPackages(fetchedPackages);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error); // Agregar log para errores
      setError('Ocurrió un error al realizar la búsqueda.');
    } finally {
      setLoading(false);
    }
  };
  
  // Hacer la búsqueda cada vez que las categorías seleccionadas cambian
useEffect(() => {
  handleSubmit();
}, [selectedCategories]);

useEffect(() => {
  console.log("Mostrar checkboxes:", showCheckboxes); // Verifica si los checkboxes deben mostrarse
}, [showCheckboxes]);

  // useEffect para inicializar los filtros desde location.state
  useEffect(() => {
    const {
      ciudad,
      presupuesto,
      categoria,
      calificacionMinima,
      ambiente,
    } = location.state || {};
  
    if (ciudad || presupuesto || categoria || calificacionMinima || ambiente) {
      setCity(ciudad || '');
      setPriceRange(presupuesto || '');
      setCategory(categoria || '');
      setRating(calificacionMinima || '');
      setAmbiance(ambiente || '');
    }
  }, [location.state]);
  
  // useEffect para realizar la búsqueda cuando los filtros cambien
  useEffect(() => {
    const performSearch = async () => {
      await handleSubmit();
    };
  
    if (city || categoria || priceRange || rating || keywords || ambiance) {
      performSearch();
    }
  }, [city, categoria, priceRange, rating, keywords, ambiance]);


  const getPhotoUrl = (photoReference) => {
    if (!photoReference) {
      return 'https://via.placeholder.com/400';
    }
    return `http://localhost:3002/place-photo?photo_reference=${photoReference}`;
  };

  const handleViewMoreClick = async (pkg) => {
    try {
      const detailsUrl = `http://localhost:3002/place-details?place_id=${pkg.id}`;
      const detailsResponse = await axios.get(detailsUrl);

      const shortDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=100`;
      const shortDescResponse = await axios.get(shortDescUrl);

      const detailedDescUrl = `http://localhost:3002/place-description?place_name=${encodeURIComponent(pkg.title)}&exchars=300`;
      const detailedDescResponse = await axios.get(detailedDescUrl);

      console.log("Descripción corta recibida del servidor:", shortDescResponse.data.description);
      console.log("Descripción detallada recibida del servidor:", detailedDescResponse.data.description);

      const placeData = { 
        ...pkg, 
        ...detailsResponse.data, 
        descripcion_corta: shortDescResponse.data.description,
        descripcion: detailedDescResponse.data.description,
        category: pkg.category
      };

      navigate('/actividad', { state: placeData });
    } catch (error) {
      console.error('Error al obtener detalles del lugar:', error);
    }
  };

  return (
    <div className="carousel-container">
      <form onSubmit={handleSubmit}>
        <h2>Busca tu lugar favorito</h2>
        <div>
          <label htmlFor="city">Lugar:</label>
          <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label htmlFor="categoria">Categoría:</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Todas las Categorias</option>
            <option value="ArteEntretenimiento">Arte</option>
            <option value="Compras">Compras</option>
            <option value="Cultura">Cultura e Historia</option>
            <option value="Deportes">Deportes y Actividades Extremas</option>
            <option value="FamiliaNinos">Familia y Niños</option>
            <option value="gastronomia">Gastronomia</option>
            <option value="Naturaleza">Naturaleza y Aventura</option>
            <option value="VidaNocturna">Vida Nocturna</option>
          </select>
        </div>
        <div>
          <label htmlFor="keywords">Palabras clave:</label>
          <input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </div>
        <div>
          <label htmlFor="priceRange">Precio (0-4):</label>
          <select 
            id="priceRange" 
            value={priceRange} 
            onChange={e => setPriceRange(e.target.value)}
          >
            <option value="">Todos los rangos</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div>
          <label htmlFor="rating">Calificación mínima:</label>
          <input type="number" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="5" step="0.1" />
        </div>
       {/*  <div>
          <label htmlFor="ambiance">Ambiente:</label>
          <select id="ambiance" value={ambiance} onChange={(e) => setAmbiance(e.target.value)}>
            <option value="tranquilo">Tranquilo</option>
            <option value="familiar">Familiar</option>
            <option value="romántico">Romántico</option>
          </select>
        </div> */}

{showCheckboxes && (
          <div className="categories-column">
            <h3>Selecciona las categorías:</h3>
            <div className="checkbox-group">
              {availableCategories.map((categoria) => (
                <label key={categoria}>
                  <input
                    type="checkbox"
                    value={categoria}
                    onChange={handleCategoryChange}
                    checked={selectedCategories.includes(categoria)}
                  />
                  {categoriasTraduccion[categoria]}
                </label>
              ))}
            </div>
          </div>
        )}
        <button type="submit" disabled={loading}>Buscar</button>
      </form>
      {loading && <p>Buscando...</p>}
      {error && <p>{error}</p>}
      {packages.length > 0 ? (
        <div className="list-container">
          {packages.map(pkg => (
            <div key={pkg.id} className="list-item">
              <img src={pkg.image} alt={pkg.title} className="package-image" />
              <h3>{pkg.title}</h3>
             {/* <p><strong>Categoría:</strong> {pkg.category}</p>*/}
              <p><strong>Calificación:</strong> {pkg.rating}</p>
              <p><strong>Ubicación:</strong> {pkg.location}</p>
              <button className="view-more-btn" onClick={() => handleViewMoreClick(pkg)}>Ver más</button>
            </div>
          ))}
        </div>
        
      ) : null}
      {noResults && <h1>No se encontraron resultados para tu búsqueda:(</h1>}
    </div>
  );
};

export default LugaresCarrusel;