import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BarraNav from "./componentes/BarraNav";
import Registro from "./views/Registro";
import InicioSesion from "./views/InicioSesion";
import Destino from "./views/Destino";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Destino/>
      
    </div>
  );
}
export default App;
