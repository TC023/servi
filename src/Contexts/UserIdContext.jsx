import React, { createContext, useState, useEffect } from "react";

export const UserIdContext = createContext();

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState({});

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
        if (data.tipo === "alumno") {
          setUserId({"user_id": data.user_id, "special_id": data.info.alumno_id})
        } else if (data.tipo === "osf") {
          setUserId({"user_id": data.user_id, "special_id": data.info.osf_id})
        }
      })
      .catch((error) => {
        console.error("Error al verificar la sesión:", error);
        setUserId(null);
      });
  }, []);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};