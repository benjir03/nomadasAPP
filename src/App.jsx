import "./App.css";
import BarraNav from "./components/BarraNav";
import Home from "./views/home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BarraNav />
      <Home />
      <Footer />
    </div>
  );
}
export default App;