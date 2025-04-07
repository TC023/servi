import React from "react";
import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

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
        navigate("/exportar");
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
          position: "relative"
        }
      }}
    >
      {/*title*/}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <img src="/logoservicio.png" alt="Logo" style={{ height: 32 }} />
        <span style={{ fontWeight: "bold", fontSize: 18 }}>Servicio Social</span>
      </Box>

      {/*list elementos*/}
      <List>
        {["Proyectos Overview", "Respuestas Alumnos", "Proyectos a revisar", "Exportar"].map(
          (text) => (
            <ListItem button key={text} onClick={() => handleNavigation(text)}>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>


      <div className="sidebar-decorator" />
    </Drawer>
  );
};

export default Sidebar;
