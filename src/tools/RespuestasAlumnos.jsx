import React, { useState, useEffect, useRef, useContext } from "react";
import "./RespuestasAlumnos.css";
import { FiArrowLeft, FiEdit3, FiCheck, FiX } from "react-icons/fi";
import { BallContext } from "../Contexts/BallContext";

const dummyData = [
  { carrera: "IMT", matricula: "A01736813", telefono: "2311535986", dispuesto: false },
  { carrera: "ITC", matricula: "A01736813", telefono: "2311535986", dispuesto: true },
  { carrera: "ITC", matricula: "A01736813", telefono: "2311535986", dispuesto: true },
  { carrera: "IMT", matricula: "A01736813", telefono: "2311535986", dispuesto: false },
  { carrera: "ITC", matricula: "A01736813", telefono: "2311535986", dispuesto: true },
  { carrera: "IMT", matricula: "A01736813", telefono: "2311535986", dispuesto: false },
];

const RespuestasAlumnos = () => {
  const [filtroCarrera, setFiltroCarrera] = useState("Todas");
  const [filtroDispuesto, setFiltroDispuesto] = useState("Todos");
  const [postulaciones, setPostulaciones] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [carrerasArr, setCarrerasArr] = useState([]);
  const estados = ['POSTULADX', 'ACEPTADX', 'RECHAZADX', 'DECLINADX']
  const [savedPostulaciones, setSavedPostulaciones] = useState({})
  const [currEdit, setCurrEdit] = useState(null)
  const [changes, setChanges] = useState({})
  
  const {
    ballPos,
    setBallPos,
    ballStartY,
    setBallStartY,
    depositPoint,
    setDepositPoint,
    setEntregando,
    setBallLanded,
  } = useContext(BallContext);

  const ballRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
  fetch('http://localhost:8000/postulaciones')
    .then(res => res.json())
    .then((data) => {
      // console.log(data)
      const temp = {}
      data.forEach(e => {
        temp[e.id_postulacion] = e
      });
      setPostulaciones(temp)
      setSavedPostulaciones(temp)

      console.log(temp)
    })

  fetch("http://localhost:8000/carreras")
    .then((res) => res.json())
    .then((data) => setCarrerasArr(data));
    
  },[])
  
  const carreras = ["Todas", ...Array.from(new Set(Object.values(postulaciones).map((a) => a.carrera)))];

  const dataFiltrada = Object.values(postulaciones).filter((alumno) => {
    const coincideCarrera = filtroCarrera === "Todas" || alumno.carrera === filtroCarrera;
    const coincideDispuesto =
      filtroDispuesto === "Todos" ||
      (filtroDispuesto === "Sí" && alumno.dispuesto) ||
      (filtroDispuesto === "No" && !alumno.dispuesto);
    return coincideCarrera && coincideDispuesto;
  });

  // logica pelota
  useEffect(() => {
    if (!ballRef.current) return;

    setBallLanded(false); //si no cae aun

    let y = ballStartY;
    let velocity = 0;
    const gravity = 1;
    const bounce = 0.7;

    const tableTop = document.querySelector(".respuestas-tabla table").getBoundingClientRect().top;
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const maxY = tableTop - containerTop - 24;

    const animate = () => {
      velocity += gravity;
      y += velocity;

      if (y >= maxY) {
        y = maxY;
        velocity *= -bounce;
        if (Math.abs(velocity) < 1.5) {
          velocity = 0;
          setBallLanded(true); //si cayo
        }
      }

      if (ballRef.current) {
        ballRef.current.style.top = `${y}px`;
      }

      if (velocity !== 0 || y < maxY) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  }, [ballStartY]);

  const handleSave = async () => {
    console.log("holi")
    setSavedPostulaciones(postulaciones)
    setIsEditing(false)
    setCurrEdit(null)
    console.log(changes)
    
  }

  const handleCancel = () => {
    setPostulaciones(savedPostulaciones)
    setIsEditing(false)
    setCurrEdit(null)
  }

  const handleChange = (e) => {
    const {value, name, id} = e.target
    console.log(value, name, id)
    const newPos = {...postulaciones[id], [name]: value}
    setPostulaciones({...postulaciones, [id]: newPos})
    setChanges(prev => ({
      ...prev,
      [name]: value
    }))
  }
  

  const handleClick = (e) => {
    const x = e.clientX;
    const y = e.clientY - containerRef.current.getBoundingClientRect().top;
    setBallPos({ x });
    setBallStartY(y);
  };

  return (
    <div className="respuestas-container" onClick={handleClick} ref={containerRef}>
      <div className="respuestas-header">
        <FiArrowLeft />
        <h1>Respuestas Alumnos</h1>
      </div>

      {isEditing && (
        <div className="edit-buttons-container">
          <button className="edit-button" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            <FiEdit3 /> {isEditing ? "Guardar" : "Editar"}
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            <FiX /> Cancelar
          </button>
        </div>
      )}

      <div className="respuestas-filtros">
        <label>
          Carrera:
          <select value={filtroCarrera} onChange={(e) => setFiltroCarrera(e.target.value)}>
            {carreras.map((carrera) => (
              <option key={carrera} value={carrera}>{carrera}</option>
            ))}
          </select>
        </label>

        <label>
          Dispuesto:
          <select value={filtroDispuesto} onChange={(e) => setFiltroDispuesto(e.target.value)}>
            <option value="Todos">Todos</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </label>

        <div className="deposito" />
        <div className="respuestas-contador">
          Mostrando <strong>{dataFiltrada.length}</strong> resultados
        </div>
      </div>

      <div className="respuestas-tabla">
        <table>
          <thead>
            <tr>
              <th>Marca temporal</th>
              <th>Nombre completo</th>
              <th>Matrícula</th>
              <th>Estado</th>
              <th>Proyecto</th>
              <th>Carrera</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>¿Qué queremos?</th>
              <th>¿Por qué deberíamos elegirte?</th>
              <th>Pregunta descarte</th>
              <th>Comentarios</th>
            </tr>
          </thead>
          <tbody>
            {dataFiltrada.map((postulacion, idx) => (
              <tr
                key={idx}
                id={postulacion.id_postulacion}
                onDoubleClick={() => {
                  if (!isEditing) {
                    setCurrEdit(postulacion.id_postulacion);
                    setChanges({"id_postulacion": postulacion.id_postulacion})
                    setIsEditing(true);
                  }
                }}
              >
                {currEdit !== postulacion.id_postulacion && (
                  <>
                    <td>{postulacion.lastupdate}</td>
                    <td>{postulacion.nombre}</td>
                    <td>{postulacion.alumno_id}</td>
                    <td>{postulacion.estado}</td>
                    <td>{postulacion.proyecto}</td>
                    <td>{postulacion.carrera}</td>
                    <td>{`${postulacion.alumno_id}@tec.mx`}</td>
                    <td>{postulacion.telefono}</td>
                    <td>{postulacion.confirmacion_lectura}</td>
                    <td>{postulacion.respuesta_habilidades}</td>
                    <td>{postulacion.respuesta_descarte || ''}</td>
                    <td>{postulacion.comentario}</td>
                  </>
                )}
                {currEdit === postulacion.id_postulacion && (
                  <>
                    <td>{postulacion.lastupdate}</td>
                    <td>
                      <input
                        type="text"
                        name="nombre"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].nombre}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="alumno_id"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].alumno_id}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <select
                        name="estado"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].estado}
                        onChange={handleChange}
                      >
                        {estados.map((estado, index) => (
                          <option key={index} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{postulacion.proyecto}</td>
                    <td>
                      <select
                        name="carrera"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].carrera_id}
                        onChange={e => {
                          const { value, name, id } = e.target;
                          const selectedOption = carrerasArr.find(c => String(c.carrera_id) === value);
                          const newPos = {
                            ...postulaciones[id],
                            carrera_id: value,
                            carrera: selectedOption ? selectedOption.nombre : '',
                          };
                          setPostulaciones({ ...postulaciones, [id]: newPos });
                          setChanges(prev => ({
                            ...prev,
                            [name]: value
                          }));
                        }}
                      >
                        {carrerasArr.map((carrera) => (
                          <option value={carrera.carrera_id} key={carrera.carrera_id}>
                            {carrera.nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{`${postulacion.id_alumno}@tec.mx`}</td>
                    <td>
                      <input
                        type="text"
                        name="telefono"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].telefono}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="confirmacion_lectura"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].confirmacion_lectura}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="respuesta_habilidades"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].respuesta_habilidades}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="respuesta_descarte"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].respuesta_descarte || ''}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="comentario"
                        id={postulacion.id_postulacion}
                        value={postulaciones[postulacion.id_postulacion].comentario}
                        onChange={handleChange}
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ballPos && (
        <img
          ref={ballRef}
          src="/ball.png"
          alt="ball"
          style={{
            left: ballPos.x,
            top: ballStartY,
            position: "absolute",
            width: 24,
            height: 24,
            transform: "translateX(-50%)",
            imageRendering: "pixelated",
            pointerEvents: "none",
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
};

export default RespuestasAlumnos;
