import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import "./ProjectDetail.css";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaPersonBooth,
  FaStar,
  FaHeart,
} from "react-icons/fa";

const dummyComments = [
  { name: "Josefina", text: "Muy buen proyecto, aprendí mucho." },
  { name: "Luis", text: "Gran experiencia, ¡recomiendo participar!" },
  { name: "Soin", text: "El equipo fue muy amable y el impacto real." },
  { name: "Miguel", text: "Volvería a participar sin duda." },
  { name: "Valeria", text: "Conecté con muchas personas increíbles." },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) return <div>Proyecto no encontrado.</div>;

  const relatedProjects = projects.filter(
    (p) => p.categoria === project.categoria && p.id !== project.id
  );

  const randomProject = projects.find((p) => p.id !== project.id);

  return (
    <div className="project-detail-container">
      {/*ceccion principal */}
      <div className="main-project-section">
        {/* Carta principal */}
        <div className="main-card">
          <img src={project.images[0]} alt={project.title} className="main-img" />

          <div className="main-info">
            <h2>{project.title}</h2>

            <div className="project-meta">
              <span className="badge modalidad">
                {project.modalidad === "Presencial" ? <FaPersonBooth /> : <FaChalkboardTeacher />}
                {project.modalidad}
              </span>
              {project.carreras.map((c) => (
                <span key={c} className="badge">
                  <FaUserGraduate size={11} />
                  {c}
                </span>
              ))}
            </div>

            <p className="project-description">{project.descripcion}</p>

            <div className="project-features">
              <span>Duración: 3 meses</span>
              <span>Horas requeridas: 100 hrs</span>
              <span>Ubicación: {project.modalidad === "Presencial" ? "Campus" : "Virtual"}</span>
            </div>

            {/*botones glass*/}
            <div className="project-actions">
              <button className="glass-button">
                <FaHeart size={14} style={{ marginRight: 6 }} />
                Favorito
              </button>
              <button className="glass-button">Agregar a lista</button>
              <button className="glass-button">Postularme</button>
            </div>
          </div>
        </div>

        {/* columna lateral */}
        <div className="side-column">
          {/*proyecto aleatorio */}
          <div className="highlight-project">
            <h4>Proyecto Destacado</h4>
            <img src={randomProject.images[0]} alt={randomProject.title} />
            <h5>{randomProject.title}</h5>
            <button onClick={() => navigate(`/projects/${randomProject.id}`)}>Ir a ver →</button>
          </div>

          {/* Comentarios recientes */}
          <div className="recent-comments">
            <h4>Comentarios recientes</h4>
            {dummyComments.slice(0, 5).map((c, i) => (
              <div key={i} className="comment-item">
                <img src={`https://i.pravatar.cc/36?img=${i + 5}`} alt={c.name} />
                <div>
                  <strong>{c.name}</strong>
                  <p>{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Proyectos relacionados */}
      {relatedProjects.length > 0 && (
        <div className="related-section">
          <h3>Explora más proyectos de esta categoría</h3>
          <div className="related-scroll">
            {relatedProjects.map((p) => (
              <div
                key={p.id}
                className="related-card"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <img src={p.images[0]} alt={p.title} />
                <strong>{p.title}</strong>
                <div style={{ fontSize: "0.8rem", color: "#555" }}>
                  <FaStar size={12} color="#facc15" /> {(Math.random() * 1 + 4).toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
