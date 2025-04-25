import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Routes, Route, Link } from 'react-router'
import { BallProvider } from "./Contexts/BallContext";
import MainLayout from "./layouts/MainLayout";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import RespuestasAlumnos from "./tools/RespuestasAlumnos";
import ProjectDetail from "./pages/ProjectDetail";
import FormOSF from "./pages/FormOSF";
import Login from "./pages/Login";
import "./App.css";

export default function App() {
  return (
    <BallProvider>
      <Router>
        <Routes>
          {/* Rutas que usan el layout principal */}
          <Route path="/" element={ <MainLayout> <Projects /> </MainLayout> } />
          <Route path="/dashboard" element={ <MainLayout> <Dashboard /> </MainLayout> } />
          <Route path="/respuesta_alumnos" element={ <MainLayout> <RespuestasAlumnos /> </MainLayout> } />
          <Route path="/projects/:id" element={ <MainLayout> <ProjectDetail /> </MainLayout> } />
          <Route path="/FormOSF" element={ <MainLayout> <FormOSF /> </MainLayout> } />
          {/* Rutas sin layout */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </BallProvider>
  );
}
