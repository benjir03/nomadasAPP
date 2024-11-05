import "./App.css";
import BarraNav from "./componentes/BarraNav";
import Footer from "./componentes/Footer"
import Inicio from "./views/Inicio";
import Registro from "./views/Registro";
import InicioSesion from "./views/InicioSesion";
import ArmarPlan from "./views/ArmarPlan";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <BarraNav />
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/InicioSesion" element={<InicioSesion />} />
          <Route path="/ArmarPlan" element={<ArmarPlan />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
