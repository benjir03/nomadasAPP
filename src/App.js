import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import BarraNav from "./componentes/BarraNav";
import Footer from "./componentes/Footer";
import Button from "./componentes/Button";
import RecuperarContraseña from './componentes/RecuperarContraseña';
import Lugares from './componentes/Lugares';
import HomePage from './componentes/HomePage';
import Datosdelusuario from './componentes/Datosdelusuario';

function App() {
  return (
    <Router>
      <div className="App">
        <BarraNav />
        <Routes>
          <Route path="/RecuperarContraseña" element={<RecuperarContraseña />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/lugares" element={<Lugares />} />
          <Route path="/Datosdelusuario" element={<Datosdelusuario />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
