// App.js
import React from "react";
import Navbar from "./components/Navbar";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";
import "./styles/styles.css";

function App() {
  return (
    <div>
      <Navbar />
      <MainContainer />
      <Footer />
    </div>
  );
}

export default App;
