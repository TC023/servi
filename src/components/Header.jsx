import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import appleLogo from "/logoservicio.png";
import lupi2 from "/lupi2.png";

const Header = ({ onMenuClick, toggleCharacter }) => {
  const buttons = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Perfil de usuario", link: "/perfil_usuario" },
    { text: "Botón 3" },
    { text: "Botón 4" },
    { text: "Botón 5" },
    { text: "Botón 6" }
  ];

  return (
    <header className="apple-header">
      <button className="menu-toggle" onClick={onMenuClick}>☰</button>
      <img src={appleLogo} alt="Logo" className="apple-logo" />
      
      <nav className="nav-buttons">
        {buttons.map((btn, index) => (
          btn.link ? (
            <Link to={btn.link} key={index}>
              <button className="nav-button">{btn.text}</button>
            </Link>
          ) : (
            <button key={index} className="nav-button">{btn.text}</button>
          )
        ))}
      </nav>

      {/* Botón para mostrar/ocultar el personaje */}
      <button
        className="sprite-toggle-button"
        title="Mostrar/Ocultar personaje"
        onClick={toggleCharacter}
      >
        <img src={lupi2} alt="Toggle Sprite" />
      </button>
    </header>
  );
};

export default Header;
