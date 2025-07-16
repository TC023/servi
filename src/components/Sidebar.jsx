import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { SessionContext } from "../Contexts/SessionContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const {sessionType} = useContext(SessionContext)

  const handleNavigation = (text) => {
    switch (text) {
      case "Proyectos Overview":
        navigate("/");
        break;
      case "Respuestas Alumnos":
        navigate("/respuesta_alumnos");
        break;
      case "Proyectos a revisar":
        navigate("/proyectos_revisar");
        break;
      case "Exportar":
        navigate("/export");
        break;
      case "Crear Proyecto":
        navigate("/projects/new")
        break
      case "Mis Postulaciones":
        navigate("/mis_postulaciones")
        break
      case "Ver Postulaciones":
        navigate("/mis_postulaciones")
        break
      case "Dashboard":
        navigate("/dashboard")
        break
      default:
        break;
    }
  };

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <img src="/logoservicio.png" alt="Logo" className="sidebar-logo" />
        <span className="sidebar-title">Servicio Social</span>
      </div>

      {/* Navigation List */}
      {console.log(sessionType)}
      {sessionType === "ss" && (
      <ul className="sidebar-list">
        {["Dashboard", "Proyectos Overview", "Respuestas Alumnos", "Proyectos a revisar", "Exportar"].map(
          (text) => (
            <li
              key={text}
              className="sidebar-item"
              onClick={() => handleNavigation(text)}
            >
              {text}
            </li>
          )
        )}
      </ul>
      )}

      {sessionType === "osf" && (
      <ul className="sidebar-list">
        {["Proyectos Overview", "Crear Proyecto", "Ver Postulaciones"].map(
          (text) => (
            <li
              key={text}
              className="sidebar-item"
              onClick={() => handleNavigation(text)}
            >
              {text}
            </li>
          )
        )}
      </ul>
      )}


      {sessionType === "alumno" && (
      <ul className="sidebar-list">
        {["Proyectos Overview", "Mis Postulaciones"].map(
          (text) => (
            <li
              key={text}
              className="sidebar-item"
              onClick={() => handleNavigation(text)}
            >
              {text}
            </li>
          )
        )}
      </ul>
      )}

      {/* Decorative Element */}
      <div className="sidebar-decorator" />
    </div>
  );
};

export default Sidebar;
