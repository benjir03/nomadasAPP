import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../estilos/CarouselOptions.css';

import imgFrida from '../imgs/imgfrida.jpg';
import imgSanMiguel from '../imgs/imgsanmiguel.jpg';
import imgPiramides from '../imgs/imgpiramides.jpg';
import imgCascada from '../imgs/imgcascadas.jpg';
import imgZoochapu from '../imgs/imgzoochapu.jpg';
import imgKill from '../imgs/imgkil.jpg';

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "10px", zIndex: "1" }}
      onClick={onClick}
    >
      →
    </div>
  );
};

const LugaresCarrusel = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    { 
      id: 1, 
      title: "Museo Frida KK", 
      category: "Museo", 
      recommendedTime: "2 horas", 
      openingTime: "10:00 AM", 
      closingTime: "5:45 PM", 
      price: "MXN$250", 
      location: "Ciudad de México", 
      image: imgFrida,
      description: "El Museo Frida Kahlo, también conocido como la Casa Azul, es el lugar donde Frida Kahlo nació, vivió y murió. Contiene sus obras, efectos personales y una profunda historia de su vida."
    },
    { 
      id: 2, 
      title: "Pueblo Mágico de San Miguel de Allende", 
      category: "Pueblo Mágico", 
      recommendedTime: "Día completo", 
      openingTime: "Todo el día", 
      closingTime: "Todo el día", 
      price: "Gratis", 
      location: "Guanajuato", 
      image: imgSanMiguel,
      description: "San Miguel de Allende es una ciudad colonial conocida por su arquitectura barroca española, arte y vibrante cultura mexicana. Un destino turístico imperdible en México."
    },
    { 
      id: 3, 
      title: "Pirámides de Teotihuacán", 
      category: "Zona Arqueológica", 
      recommendedTime: "Medio día", 
      openingTime: "9:00 AM", 
      closingTime: "5:00 PM", 
      price: "MXN$90", 
      location: "Estado de México", 
      image: imgPiramides,
      description: "Teotihuacán, la ciudad de los dioses, es uno de los sitios arqueológicos más importantes de México y alberga las imponentes pirámides del Sol y la Luna."
    },
    { 
      id: 4, 
      title: "Cascadas de Agua Azul", 
      category: "Cascadas", 
      recommendedTime: "3 horas", 
      openingTime: "8:00 AM", 
      closingTime: "5:00 PM", 
      price: "MXN$50", 
      location: "Chiapas", 
      image: imgCascada,
      description: "Las Cascadas de Agua Azul son conocidas por sus vibrantes tonos azul turquesa y su impresionante belleza natural en medio de la selva de Chiapas."
    },
    { 
      id: 5, 
      title: "Zoológico de Chapultepec", 
      category: "Zoológico", 
      recommendedTime: "4 horas", 
      openingTime: "9:00 AM", 
      closingTime: "4:30 PM", 
      price: "Gratis", 
      location: "Ciudad de México", 
      image: imgZoochapu,
      description: "El Zoológico de Chapultepec es uno de los más importantes de América Latina y alberga una gran variedad de especies en un entorno natural."
    },
    { 
      id: 6, 
      title: "Cenote Ik Kil", 
      category: "Cenote", 
      recommendedTime: "2 horas", 
      openingTime: "9:00 AM", 
      closingTime: "5:00 PM", 
      price: "MXN$150", 
      location: "Yucatán", 
      image: imgKill,
      description: "El Cenote Ik Kil es un hermoso cenote en Yucatán, rodeado de vegetación y lianas. Es un lugar perfecto para nadar y disfrutar de la naturaleza."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ]
  };

  const openModal = (pkg) => setSelectedPackage(pkg);
  const closeModal = () => setSelectedPackage(null);

  return (
    <div className="carousel-container">
      <div className="carousel-box">
        <Slider {...settings}>
          {packages.map(pkg => (
            <div key={pkg.id} style={{ padding: "10px" }}>
              <div className="package-card">
                <img src={pkg.image} alt={pkg.title} className="package-image" />
                <h3>{pkg.title}</h3>
                <p><strong>Categoría:</strong> {pkg.category}</p>
                <p><strong>Tiempo recomendado:</strong> {pkg.recommendedTime}</p>
                <p><strong>Horario:</strong> {pkg.openingTime} - {pkg.closingTime}</p>
                <p><strong>Ubicación:</strong> {pkg.location}</p>
                <p><strong>Precio:</strong> {pkg.price}</p>
                <button className="view-more-btn" onClick={() => openModal(pkg)}>Ver más</button>
              </div>
            </div>
          ))}
        </Slider>

        {selectedPackage && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedPackage.title}</h2>
              <p><strong>Categoría:</strong> {selectedPackage.category}</p>
              <p><strong>Tiempo recomendado:</strong> {selectedPackage.recommendedTime}</p>
              <p><strong>Horario:</strong> {selectedPackage.openingTime} - {selectedPackage.closingTime}</p>
              <p><strong>Ubicación:</strong> {selectedPackage.location}</p>
              <p><strong>Precio:</strong> {selectedPackage.price}</p>
              <p><strong>Descripción:</strong> {selectedPackage.description}</p>
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LugaresCarrusel;
