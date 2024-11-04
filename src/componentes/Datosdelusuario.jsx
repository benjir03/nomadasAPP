import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import "../estilos/styDatosdelusuario.css";
import historiaImg from '../imgs/historia.jpg';
import gastronomiaImg from '../imgs/gastronomia.webp';
import arteImg from '../imgs/arte.JPG';
import naturalezaImg from '../imgs/naturaleza.jpg';

function Datos() {
    const [location, setLocation] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [guests, setGuests] = useState(null);
    const [budget, setBudget] = useState(50); // Presupuesto inicial
    const [selectedCategories, setSelectedCategories] = useState([]);

    const options = [
        { value: "cdmx", label: "Ciudad de México, México" },
        { value: "cancun", label: "Cancún, Quintana Roo" },
        { value: "puertoVallarta", label: "Puerto Vallarta, Jalisco" },
        { value: "losCabos", label: "Los Cabos, Baja California Sur" },
        { value: "guadalajara", label: "Guadalajara, Jalisco" },
    ];

    const categories = [
        { id: 1, name: "Historia", image: historiaImg },
        { id: 2, name: "Gastronomía", image: gastronomiaImg },
        { id: 3, name: "Arte", image: arteImg },
        { id: 4, name: "Naturaleza", image: naturalezaImg },
    ];

    const handleLocationChange = (selectedOption) => {
        setLocation(selectedOption);
    };

    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((c) => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleGenerateItinerary = () => {
        // Aquí puedes agregar la lógica para generar el itinerario
        console.log("Generando itinerario con los siguientes datos:", {
            location,
            startDate,
            endDate,
            guests,
            budget,
            selectedCategories,
        });
    };

    return (
        <div className="user-data">
            {/* Sección de bienvenida */}
            <section className="user-welcome-section">
                <div className="user-welcome-content">
                    <h1>Queremos conocerte un poco más.</h1>
                    <p>Completa la información para personalizar tu experiencia.</p>
                </div>
            </section>

            {/* Formulario de búsqueda */}
            <form className="search-form">
                {/* Selector de destino */}
                <div className="form-group">
                    <label className="form-label">¿A dónde quieres ir?</label>
                    <div className="input-container">
                        <FaMapMarkerAlt className="icon" />
                        <Select
                            options={options}
                            value={location}
                            onChange={handleLocationChange}
                            placeholder="Ciudad de México, México"
                            className="select-location"
                            isClearable
                        />
                    </div>
                </div>

                {/* Selector de fechas */}
                <div className="form-group">
                    <label className="form-label">Fechas</label>
                    <div className="input-container">
                        <FaCalendarAlt className="icon" />
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy" // Formato de fecha en día/mes/año
                            placeholderText="Llegada"
                            className="date-input"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy" // Formato de fecha en día/mes/año
                            placeholderText="Ida"
                            className="date-input"
                        />
                    </div>
                </div>

                {/* Selector de número de viajeros */}
                <div className="form-group">
                    <label className="form-label">Viajeros</label>
                    <div className="input-container">
                        <FaUser className="icon" />
                        <input
                            type="number"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="guests-input"
                            placeholder="Número de viajeros"
                        />
                    </div>
                </div>
            </form>

            {/* Nueva Sección de Preguntas */}
            <section className="additional-info-section">
                <h2>Ingresa el presupuesto aproximado de tu viaje</h2>
                <div className="budget-input-container">
                    <div className="budget-value">MXN {budget}</div> {/* Recuadro para mostrar el valor */}
                    <span>$</span>
                    <input
                        type="range"
                        min="0"
                        max="10000"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="budget-slider"
                    />
                    <span>$$$</span>
                </div>
                <h2>Selecciona al menos 3 categorías de lugares a los que te gustaría visitar</h2>
                <div className="category-selection">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`category-item ${selectedCategories.includes(category.name) ? "selected" : ""
                                }`}
                            onClick={() => handleCategorySelect(category.name)}
                        >
                            <img src={category.image} alt={category.name} />
                            <span>{category.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Botón para generar itinerario */}
            <button className="generate-itinerary-button" onClick={handleGenerateItinerary}>
                Generar Itinerario
            </button>
        </div>
    );
}

export default Datos;
