import React, { useState, useEffect } from "react";
// import { Link } from "react-router"
import { FaUserGraduate, FaChalkboardTeacher, FaHeart } from "react-icons/fa";

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
export function ProjectCard({project}){
    const [carreras, setCarreras] = useState([{}])
console.log(project.proyecto_id)
  useEffect(() => {
    fetch(`http://localhost:5000/proyecto_carrera/`+project.proyecto_id)
    .then((res)=> res.json())
    .then((data) => {
        console.log(data)
        setCarreras(data)}) 
  }, [project.proyecto_id]); 


    return(
      <div className='card'>
      <Box>
        <Grid container spacing={4}>
            <Fade in={true} timeout={500} key={project.id}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                //   onClick={() => navigate(`/projects/${project.id}`)}
                //   onMouseEnter={() => setHoveredId(project.id)}
                //   onMouseLeave={() => setHoveredId(null)}
                >
                  <Box sx={{ position: "relative" }}>
                    <img
                      src={"./public/logo.jpg"
                      }
                      alt={project.title}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
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
                      {project.nombre_proyecto}
                    </Typography>

                    {/*carreras filtro) */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {carreras.map((carrera, index) => (
                        <Box
                        key={index}
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
                        {carrera.nombre}
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

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#64748b",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                        }}
                      >
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Fade>

        </Grid>
      </Box>
    </div>
    )
  }
  
export function CardList({entries}){
    const cards = entries.map( entry => 
   <ProjectCard project={entry} key={entry.id_post}></ProjectCard>)
    return(
    <div className='cardList'>
        {cards}
    </div>
    )
}