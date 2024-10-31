import React from "react";
import "../styles/styFooter.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-5">
        <div className="container">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <h4 className="mb-3">
                    Nómadas
                    </h4>
                </div>
                <div className="col-md-3 mb-4">
                    <h4 className="mb-3">Productos</h4>
                    <ul className="list-unstyled">
                    <li>Experiencias</li>
                    <li>Viajes</li>
                    <li>Comodidad</li>
                    <li>Union</li>
                    </ul>
                </div>
                <div className="col-md-3 mb-4">
                    <h4 className="mb-3">Ayuda</h4>
                    <ul className="list-unstyled">
                        <li>Soporte</li>
                        <li>Comunidad</li>
                        <li>Cuenta</li>
                        <li>Viajjes</li>
                    </ul>
                </div>
                <div className="col-md-2 mb-4">
                    <h4 className="mb-3">Contacto</h4>
                    <ul className="list-unstyled">
                        <li>
                            <i className="fas fa-home" /> New York, NY 10012, US
                        </li>
                        <li>
                            <i className="fas fa-envelope" /> info@example.com
                        </li>
                        <li>
                            <i className="fas fa-phone" /> + 01 234 567 88
                        </li>
                        <li>
                            <i className="fas fa-fax" /> + 01 234 567 89
                        </li>
                    </ul>
            </div>
        </div>
        <div className="text-centerp-3">
            <p>&copy; 2022 Copyright:</p>
        </div>
        </div>
    </footer>
    );
};

export default Footer;