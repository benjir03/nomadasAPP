import "./App.css";
import BarraNav from "./componentes/BarraNav";
import Footer from "./componentes/Footer"
import Inicio from "./views/Inicio";
import Registro from "./views/Registro";
import InicioSesion from "./views/InicioSesion";
import Destino from "./views/Destino";
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import CompShowBlogs from "./queries/mostrar";

function App() {
  return (
    <div className="App">
      <Router>
        <BarraNav />
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/InicioSesion" element={<InicioSesion />} />
          <Route path="/Destino" element={<Destino />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
