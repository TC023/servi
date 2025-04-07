import React, { useState, useEffect } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  Avatar,
  AvatarGroup,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { FaUserGraduate, FaChalkboardTeacher, FaHeart } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

const Projects = () => {
  const [modalidadFilter, setModalidadFilter] = useState("Todos");
  const [carreraFilter, setCarreraFilter] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});
  const navigate = useNavigate();

  const handleModalidadChange = (event) => {
    setModalidadFilter(event.target.value);
  };

  const handleCarreraClick = (carrera) => {
    setCarreraFilter(carrera === carreraFilter ? "" : carrera);
  };

  const filteredProjects = projects.filter((project) => {
    const matchModalidad =
      modalidadFilter === "Todos" || project.modalidad === modalidadFilter;
    const matchCarrera =
      carreraFilter === "" || project.carreras.includes(carreraFilter);
    return matchModalidad && matchCarrera;
  });

  useEffect(() => {
    let interval;
    if (hoveredId !== null) {
      interval = setInterval(() => {
        setImageIndexes((prev) => {
          const currentProject = projects.find((p) => p.id === hoveredId);
          if (!currentProject) return prev;
          const currentIndex = prev[hoveredId] || 0;
          const nextIndex = (currentIndex + 1) % currentProject.images.length;
          return { ...prev, [hoveredId]: nextIndex };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [hoveredId]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 4,
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(135deg, #f0f4f8 0%, #e0e7ff 100%)",
        minHeight: "100vh",
      }}

      
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 700, color: "#1e293b", mb: 3 }}
      >
        Proyectos Solidarios
      </Typography>

      {/* Filtros */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
  <Box
    className="notch-elevated"
    sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 2,
      px: 3,
      py: 2,
    }}
  >
   <Button
  className={`glass-button ${modalidadFilter === "Todos" ? "active" : ""}`}
  onClick={() => setModalidadFilter("Todos")}
>
  TODOS
</Button>


<Select
  value={modalidadFilter}
  onChange={handleModalidadChange}
  displayEmpty
  className={`glass-select ${modalidadFilter !== "Todos" ? "active" : ""}`}
>
  <MenuItem value="Todos">Todos</MenuItem>
  <MenuItem value="Presencial">Presencial</MenuItem>
  <MenuItem value="En línea">En línea</MenuItem>
</Select>


    {["ARQ", "LAD", "ISC", "MKT", "DER", "PSI"].map((carrera, idx) => (
  <Button
    key={carrera}
    className={`glass-button ${carreraFilter === carrera ? "active" : ""}`}
    onClick={() => handleCarreraClick(carrera)}
    sx={{ "--hue": idx * 45 }}
  >
    {carrera}
  </Button>
))}


  </Box>
</Box>



      {/* contenedor de las tarjetas */}
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 5,
          p: 3,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Grid container spacing={4}>
          {filteredProjects.map((project, index) => (
            <Fade in={true} timeout={500 + index * 100} key={project.id}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  onClick={() => navigate(`/projects/${project.id}`)}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  sx={{
                    borderRadius: 5,
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(8px)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 16px 30px rgba(0,0,0,0.1)",
                      transform: "translateY(-5px)",
                    },
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={
                        hoveredId === project.id
                          ? project.images[imageIndexes[project.id] || 0]
                          : project.images[0]
                      }
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    {project.nuevo && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          backgroundColor: "#ff3b83",
                          color: "#fff",
                          px: 1.4,
                          py: "3px",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          borderRadius: "999px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        }}
                      >
                        Nuevo
                      </Box>
                    )}
                  </Box>

                  <CardContent>
                    {/* icono modalidad */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: "#e0f2fe",
                          color: "#0284c7",
                          fontSize: "14px",
                        }}
                      >
                        {project.modalidad === "Presencial" ? (
                          <FaPerson />
                        ) : (
                          <FaChalkboardTeacher />
                        )}
                      </Avatar>
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        {project.modalidad}
                      </Typography>
                    </Box>

                    {/*title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        mb: 1,
                        color: "#1e293b",
                      }}
                    >
                      {project.title}
                    </Typography>

                    {/*carreras filtro) */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                      {project.carreras.map((carrera) => (
                        <Box
                          key={carrera}
                          sx={{
                            fontSize: "0.7rem",
                            px: 1.4,
                            py: "4px",
                            borderRadius: "999px",
                            backgroundColor: "#f3f4f6",
                            color: "#334155",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <FaUserGraduate size={11} />
                          {carrera}
                        </Box>
                      ))}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <AvatarGroup
                        max={4}
                        sx={{ "& .MuiAvatar-root": { width: 28, height: 28 } }}
                      >
                        <Avatar alt="A" src="https://i.pravatar.cc/30?img=1" />
                        <Avatar alt="B" src="https://i.pravatar.cc/30?img=2" />
                        <Avatar alt="C" src="https://i.pravatar.cc/30?img=3" />
                        <Avatar alt="D" src="https://i.pravatar.cc/30?img=4" />
                      </AvatarGroup>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#64748b",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                        <FaHeart size={12} style={{ marginRight: 4 }} />
                        {Math.floor(Math.random() * 100) + 20}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Fade>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Projects;
