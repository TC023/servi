import React,{useEffect, useState, useContext} from "react";
import { SessionContext } from "../Contexts/SessionContext";
import { UserIdContext } from "../Contexts/UserIdContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children }) => {
  const {sessionType, setSessionType} = useContext(SessionContext);
  const { setUserId } = useContext(UserIdContext);
  useEffect(() => {
    fetch("http://localhost:8000/session/detail", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los detalles de la sesión");
        }
        return res.json();
      })
      .then((data) => {
        setSessionType(data.tipo)
        if (data.tipo === "alumno") {
          setUserId({"user_id": data.user_id, "special_id": data.info.alumno_id})
        } else if (data.tipo === "osf") {
          setUserId({"user_id": data.user_id, "special_id": data.info.osf_id})
        }
      })
      .catch((error) => {
        console.error("Error al verificar la sesión:", error);
        setSessionType(null);
      });
  }, []);
  
  console.log("TIPO DE LA SESIÓN:");
  console.log(sessionType);

  if (sessionType === '') {
    // Estado de carga mientras se verifica la sesión
    return <div>Cargando...</div>;
  }

  if (!sessionType) {
    // Si no hay sesión activa, redirigir al login
    return <Navigate to="/login" />;
  }

  // Si hay sesión activa, renderizar los hijos
  return children;
};

export default ProtectedRoute;