import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./RightBar.css";
import { SessionContext } from "../Contexts/SessionContext";

const lupiFramesRight = [
  "lupi1.png", "lupi2.png", "lupi3.png", "lupi4.png", "lupi5.png", "lupi6.png",
];

// Rutas donde Teus no sale
const rutasTeusNoDisponible = [
  "/Faq",
  "/proyectos",

  "/perfil_usuario",


];

const RightBar = ({
  isOpen,
  onClose,
  setShowCharacter,
  setShowAICharacter,
  setShowPetMode
}) => {
  const [vista, setVista] = useState("usuario");
  const { sessionType, sessionId } = useContext(SessionContext);
  const [usuario, setUsuario] = useState(null);

  //current location
  const location = useLocation();
  // verifica si esta habilitado teusin
  const estaTeusDeshabilitado =
    sessionType === "alumno" &&
    rutasTeusNoDisponible.some(ruta => location.pathname.startsWith(ruta));

  // Cargar datos usuario
  useEffect(() => {
    if (!sessionType || !sessionId) return;
    const endpoint =
      sessionType === "alumno"
        ? `http://localhost:8000/alumnos/user/${sessionId}`
        : `http://localhost:8000/osf/${sessionId}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then(setUsuario)
      .catch((err) => console.error("Error al cargar perfil:", err));
  }, [sessionType, sessionId]);

  // animacion sprite teus
  const [frameIndex, setFrameIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % lupiFramesRight.length);
    }, 130);
    return () => clearInterval(interval);
  }, []);

  // Si no es alumno, forzar vista usuario
  useEffect(() => {
    if (sessionType !== "alumno") setVista("usuario");
  }, [sessionType]);

  const aplicarCambios = () => {
    if (estaTeusDeshabilitado) return; // si esta desahibilitado
    setShowCharacter(true);
    setShowAICharacter(false);
    setShowPetMode(false);
    onClose();
  };

  return (
    <div className={`rightbar-overlay ${isOpen ? "visible" : ""}`}>
      <div className="rightbar-panel">
        <button className="rightbar-close" onClick={onClose}>✕</button>
        <div className="rightbar-tabs">
          {sessionType === "alumno" && (
            <button
              className={`rightbar-tab ${vista === "teus" ? "active" : ""}`}
              onClick={() => setVista("teus")}
            >Teus</button>
          )}
          <button
            className={`rightbar-tab ${vista === "usuario" ? "active" : ""}`}
            onClick={() => setVista("usuario")}
          >Usuario</button>
        </div>

        <div style={{ marginTop: "2rem", width: "100%" }}>
          {/* solo sesion alumno acceso a vista teus */}
          {vista === "teus" && sessionType === "alumno" ? (
            <>
              <div className="lupi-container">
                <img
                  src={lupiFramesRight[frameIndex]}
                  alt="Lupi animado"
                  className="lupi-sprite"
                />
              </div>
              <ul className="rightbar-options">
                <li
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Seguir Cursor
                </li>
              </ul>
              {estaTeusDeshabilitado && (
                <div
                  style={{
                    color: "#f59e42",
                    margin: "1rem 0",
                    textAlign: "center",
                    fontWeight: 600,
                    fontSize: "1rem",
                    opacity: 0.95,
                    border: "1px solid #f59e42",
                    borderRadius: 8,
                    padding: "8px 12px",
                    background: "rgba(255, 245, 225, 0.15)"
                  }}
                >
                  Teus no disponible en esta vista
                </div>
              )}
              <button
                onClick={aplicarCambios}
                style={{
                  marginTop: "2rem",
                  padding: "0.7rem",
                  borderRadius: "12px",
                  width: "100%",
                  fontWeight: 600,
                  background: "#6366f1",
                  color: "white",
                  border: "none",
                  cursor: estaTeusDeshabilitado ? "not-allowed" : "pointer",
                  opacity: estaTeusDeshabilitado ? 0.5 : 1,
                  pointerEvents: estaTeusDeshabilitado ? "none" : "auto",
                  transition: "opacity 0.2s"
                }}
                disabled={estaTeusDeshabilitado}
              >
                Aplicar cambios
              </button>
              <button
  onClick={() => setShowCharacter(false)}
  style={{
    marginTop: "1rem",
    padding: "0.7rem",
    borderRadius: "12px",
    width: "100%",
    fontWeight: 600,
    background: "#f87171",
    color: "white",
    border: "none",
    cursor: "pointer",
    opacity: 1,
    transition: "opacity 0.2s"
  }}
>
  Quitar Teus
</button>


              
            </>
          ) : (
            <>
              <div className="perfil-avatar-circulo" style={{ margin: "1.5rem auto" }}>
                <div className="avatar-circle-border">
                  <img src="/avatar.png" alt="Avatar" />
                </div>
              </div>
              <ul className="user-menu">
                <li> Mi perfil</li>
           
                <li
                  style={{
                    color: "#f87171",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.href = "/login";
                  }}
                >
                  Cerrar sesión
                </li>
              </ul>
              <p className="user-info">
                Sesión activa como: <strong>
                  {sessionType === "alumno"
                    ? usuario?.nombre || "Nombre"
                    : sessionType === "ss"
                      ? "Servicio Social"
                      : "OSF"}
                </strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
