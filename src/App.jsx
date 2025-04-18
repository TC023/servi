import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import Hero from "./components/Hero";
import Header from "./components/Header";
import PixelCharacter from "./components/PixelCharacter";
import RespuestasAlumnos from "./tools/RespuestasAlumnos";
import { BallProvider } from "./Contexts/BallContext";
import ProjectDetail from "./pages/ProjectDetail";
import FormOSF from "./pages/FormOSF";
import "./App.css";
import { useLocation as useReactRouterLocation } from "react-router-dom";



function AppWrapper() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showCharacter, setShowCharacter] = useState(false); 

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleCharacter = () => setShowCharacter((prev) => !prev);

  const location = useReactRouterLocation(); // 👈 aquí

  return (
    <div className="app">
      {showSidebar && <Sidebar />}
      <div className="content">
        {showCharacter && <PixelCharacter />}
        <Header onMenuClick={toggleSidebar} toggleCharacter={toggleCharacter} />

        {/* Video solo aparezca en Projectos */}
        {location.pathname === "/" && <Hero />}

        {/* - <div style={{ position: "relative", height: "100px", zIndex: -1 }} /> */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Projects />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/respuesta_alumnos" element={<RespuestasAlumnos />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/FormOSF" element={<FormOSF></FormOSF>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BallProvider>
      <Router>
        <AppWrapper />
      </Router>
    </BallProvider>
  );
}
