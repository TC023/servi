import React, { useContext, useEffect, useState } from "react";
import {
  FiMapPin,
  FiClock,
  FiUser,
  FiCalendar,
  FiHeart,
  FiStar,
  FiUsers,

} from "react-icons/fi";
import { SessionContext } from "../Contexts/SessionContext";
import "./Perfil_usuario.css";

const Perfil_usuario = () => {
  const { sessionType, sessionId, sessionName } = useContext(SessionContext);
  const [usuario, setUsuario] = useState(null);
  const [carreras, setCarreras] = useState([]); // CARRERAS

  // depurar
  console.log("Perfil_usuario montado");
  console.log("sessionType:", sessionType, "sessionId:", sessionId);

  useEffect(() => {
    if (!sessionType || !sessionId) return;

    const endpoint =
      sessionType === "alumno"
        ? `http://localhost:8000/alumnos/user/${sessionId}` // El sessionId es el user_id
        : `http://localhost:8000/osf/${sessionId}`;

    console.log("LLAMANDO ENDPOINT: ", endpoint);

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log("usuario recibido:", data);
        setUsuario(data);
      })
      .catch((err) => console.error("Error al cargar perfil:", err));
  }, [sessionType, sessionId]);

  //hace fetch a las carreras
  useEffect(() => {
    fetch("http://localhost:8000/carreras")
      .then((res) => res.json())
      .then(setCarreras)
      .catch((err) => console.error("Error al cargar carreras:", err));
  }, []);

  // busca la carrera
  const carrera = carreras.find((c) => c.carrera_id === usuario?.carrera_id);

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Perfil</h1>
      <p className="perfil-subtitle">Resumen de tu información</p>




      <div className="perfil-card glass">
        <div className="perfil-header">
  <div className="perfil-avatar">
    <FiUser size={56} color="#64748b" />
  </div>
  <div>
    {sessionType === "alumno" && (
      <h2 className="perfil-nombre">
        {usuario ? usuario.nombre : "Nombre"}
      </h2>
    )}
    <p className="perfil-rol">
  {sessionType === "alumno"
    ? "Estudiante"
    : sessionType === "ss"
      ? "Servicio Social"
      : "OSF"}
</p>

  </div>
</div>





        <div className="perfil-info-grid">
          <div className="perfil-info-item">
            <strong>Matrícula:</strong> {usuario?.alumno_id || "No disponible"}
          </div>
          <div className="perfil-info-item">
            <strong>Teléfono:</strong> {usuario?.telefono || "No disponible"}
          </div>
          <div className="perfil-info-item">
            <strong>Carrera:</strong>{" "}
            {carrera
              ? `${carrera.nombre} (${carrera.nombre_completo})`
              : usuario?.carrera_id
                ? `ID ${usuario.carrera_id}`
                : "No disponible"}
          </div>
        </div>

       

        <hr className="perfil-divider" />

       <div className="perfil-info-grid">
  <div className="perfil-info-item">
    {sessionType === "alumno" && (
      <>
        Gracias por elegir ser parte de un proyecto solidario.<br />
        ¡Una sola acción puede marcar la diferencia!
      </>
    )}
    {sessionType === "osf" && (
      <>
        Gracias por impulsar el cambio subiendo proyectos.<br />
        Cada oportunidad abre una puerta hacer un cambio.
      </>
    )}
    {sessionType === "ss" && (
      <>
        Bienvenido a la sesión de Servicio Social.<br />
        Tu labor es fundamental para vincular a los alumnos con proyectos solidarios.
      </>
    )}
  </div>
</div>

     
      </div>
    </div>
  );
};

export default Perfil_usuario;
