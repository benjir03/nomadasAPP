import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import BarraNav from "./componentes/BarraNav";
import Footer from "./componentes/Footer";
import Button from "./componentes/Button";
import Cambiodecontraseña from './componentes/Cambiodecontraseña';
import Lugares from './componentes/Lugares';
import HomePage from './componentes/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <BarraNav />
        <Routes>
          <Route path="/cambio-de-contraseña" element={<Cambiodecontraseña />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/lugares" element={<Lugares />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
