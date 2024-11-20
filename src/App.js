import "./App.css";
import BarraNav from "./componentes/BarraNav";
import Footer from "./componentes/Footer";
import Inicio from "./views/Inicio";
import Perfil from "./views/Perfil";
import Registro from "./views/Registro";
import InicioSesion from "./views/InicioSesion";
import RecuperarC from "./views/RecuperarC";
import Experiencias from "./views/Experiencias";
import Modificar from "./views/ModificarPerfil";
import ArmarPlan from "./views/ArmarPlan";
import Actividad from "./views/Actividad";
import Explora from "./views/Explora";
import DescripLugar from "./componentes/DescripLugar";
import GustosPerfil from "./views/GustosPerfil";
import ListaActividad from "./componentes/listaactividad"; // Importa ListaActividad
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Verificacion from "./componentes/Verificacion";
import CompletarPerfil from "./views/CompletarPerfil";
import LugaresCarrusel from "./views/LugaresCarrusel";
import Verificar from "./views/Verificar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RevisarPlan from "./views/RevisarPlan";
import MetaLogin from "./componentes/MetaLogin";
import ModPerfil from "./componentes/ModPerfil";

function App() {
  return (
    <div className="App">
      <Router>
        <BarraNav />
        <Routes>
          <Route path="/Inicio" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/InicioSesion" element={<InicioSesion />} />
          <Route path="/RecuperarC" element={<RecuperarC />} />
          <Route path="/ArmarPlan" element={<ArmarPlan />} />
          <Route path="/Actividad" element={<Actividad />} />
          <Route path="/Experiencias" element={<Experiencias />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Completar" element={<CompletarPerfil />} />
          <Route path="/Modificar" element={<Modificar />} />
          <Route path="/Explora" element={<Explora />} />
          <Route path="/DescripLugar" element={<DescripLugar />} />
          <Route path="/LugaresCarrusel" element={<LugaresCarrusel />} />
          <Route path="/Verificar" element={<Verificar />} />
          <Route path="/GustosPerfil" element={<GustosPerfil />} />
          <Route path="/MetaLogin" element={<MetaLogin />} />
          <Route path="/ModPerfil" element={<ModPerfil />} />
          <Route path="/Actividades" element={<ListaActividad />} /> {/* Nueva ruta para ListaActividad */}
          {/* Rutas protegidas para verificacion */}
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/RevisarPlan" element={<RevisarPlan />} />

          {/* Rutas protegidas */}
          <Route element={<Verificacion />}>
            <Route path="/Perfil" element={<Perfil />} />
            <Route path="/Modificar" element={<Modificar />} />
            <Route path="/Completar" element={<CompletarPerfil />} />
          </Route>
          {/* Ruta de inicio */}
          <Route path="/" element={<Inicio />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
