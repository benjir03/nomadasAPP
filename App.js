// App.js
import React from "react";
import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";
import TopPlaces from "./components/TopPlaces";
import Footer from "./components/Footer";
import "./styles/styles.css";

function App() {
  return (
    <div>
      <Navbar />
      <MainSection />
      <TopPlaces />
      <Footer />
    </div>
  );
}

export default App;
