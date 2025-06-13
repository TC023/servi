import React from "react";
import { Button } from "@mui/material";
import "./Hero.css";

const Hero = ({ searchText, setSearchText }) => {
  return (
    <div className="hero-container">
      <video autoPlay muted loop className="hero-video">
        <source src="/videoserviciosocial.mp4" type="video/mp4" />
        Tu navegador no soporta video.
      </video>
      <div className="hero-overlay">
        <h1>Explora proyectos solidarios</h1>
        <input
          className="hero-search"
          type="text"
          placeholder="¿A dónde quieres postularte?"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

      </div>
    </div>
  );
};

export default Hero;
