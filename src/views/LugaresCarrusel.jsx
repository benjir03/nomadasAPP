import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import '../estilos/CarouselOptions.css';

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
  const packages = [ 
    { 
        id: 1, 
        title: "Museo Frida Kahlo", 
        category: "Museo", 
        recommendedTime: "2 horas", 
        openingTime: "10:00 AM", 
        closingTime: "5:45 PM", 
        price: "MXN$250", 
        location: "Ciudad de México", 
        image: "../imgs/imgfrida.jpg"
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
        image: "../imgs/ImgIkKil.jpg" 
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
        image: "https://via.placeholder.com/300x200?text=Teotihuacan" 
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
        image: "https://via.placeholder.com/300x200?text=Cascadas+de+Agua+Azul" 
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
        image: "../imgs/imgzoochapu.jpg" 
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
        image: "../imgs/ImgIkKil.jpg" 
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

  return (
    <div className="carousel-container">
      <div className="carousel-box">
        <Slider {...settings}>
          {packages.map(pkg => (
            <div key={pkg.id} style={{ padding: "10px" }}>
              <div className="package-card">
                <img src={pkg.image} alt={pkg.title} className="package-image" />
                <h3>{pkg.title}</h3>
                <p><strong>Categoria:</strong> {pkg.category}</p>
                <p><strong>Tiempo recomendado:</strong> {pkg.recommendedTime}</p>
                <p><strong>Horario:</strong> {pkg.openingTime} - {pkg.closingTime}</p>
                <p><strong>Ubicación:</strong> {pkg.location}</p>
                <p>{pkg.price} <span className="discounted-price">{pkg.discount}</span></p>
                <button className="view-more-btn">Ver más</button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LugaresCarrusel;
