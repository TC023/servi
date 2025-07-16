import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BallContext } from "../Contexts/BallContext";

import "./sparkle.css";


import { useContext } from "react";

// o




//Numero de proyectos (DummyData)
//import { projects } from "../data/projects";
// ----- IMPORT ICONS AL INICIO DEL ARCHIVO -----


// Frases random expresivas y visuales para el mini modal de proyectos

function getRandomProyectoFrase(proyecto) {
  if (!proyecto) return "Este proyecto no existe... ¿será secreto?";

  // Numeritos de informacion alta importancia
  const numeroRojo = (n) => (
    <span style={{
      color: "#e11d48",
      fontWeight: 900,
      fontSize: 18,
      padding: "0 3px"
    }}>{n}</span>
  );
  const zona = (zona) => (
    <span style={{
      background: "#e0f2fe",
      color: "#0284c7",
      borderRadius: 10,
      padding: "2px 12px",
      fontSize: 13,
      margin: "0 4px",
      fontWeight: 700,
      border: "1px solid #7dd3fc",
      display: "inline-block"
    }}>{zona}</span>
  );

  // Frases expresivas y con formato visual
  const frases = [
    proyecto.title && <>Proyecto destacado: <b style={{ color: "#6366f1" }}>{proyecto.title}</b>. ¡Podría ser tu próxima meta!</>,
    proyecto.horas && <>Para completar este reto, se requieren {numeroRojo(proyecto.horas)} horas. ¿Aceptas?</>,
    proyecto.valor_promueve && <>Aquí se promueve el valor de <b style={{ color: "#16a34a" }}>{proyecto.valor_promueve}</b>. ¿Te identificas con esto?</>,
    proyecto.objetivo_general && <>Objetivo: <span style={{ color: "#f59e42", fontWeight: 600 }}>{proyecto.objetivo_general.slice(0, 70)}{proyecto.objetivo_general.length > 70 ? "..." : ""}</span></>,
    proyecto.problema_social && <>¿Sabías esto? <b style={{ color: "#64748b" }}>{proyecto.problema_social.slice(0, 70)}{proyecto.problema_social.length > 70 ? "..." : ""}</b></>,
    proyecto.carreras && <>Abierto para: <b style={{ color: "#0ea5e9" }}>{Array.isArray(proyecto.carreras) ? proyecto.carreras.join(", ") : proyecto.carreras}</b>.</>,
    proyecto.zona && <>Zona disponible: {zona(proyecto.zona)}</>,
    proyecto.estado && <>Estado actual: <b style={{
      color: proyecto.estado.toUpperCase() === "ACTIVO" ? "#22c55e"
        : proyecto.estado.toUpperCase() === "LLENO" ? "#f59e42"
        : proyecto.estado.toUpperCase() === "FINALIZADO" ? "#a3a3a3"
        : "#64748b",
      fontWeight: 700
    }}>{proyecto.estado[0] + proyecto.estado.slice(1).toLowerCase()}</b>.</>,
    proyecto.producto_a_entregar && <>Producto final: <span style={{ color: "#be185d", fontWeight: 600 }}>{proyecto.producto_a_entregar}</span>.</>,
    proyecto.competencias && <>Competencias a desarrollar: <span style={{ color: "#6366f1" }}>{proyecto.competencias}</span>.</>,

    //frases extra
    <>Este proyecto está esperando a alguien como tú para hacerlo realidad.</>,
    <>¿Listo para dejar tu huella en un nuevo reto? ¡Atrévete a postularte!</>,
    <>Cada experiencia suma a tu historia. ¿Sumamos juntos en este proyecto?</>
  ].filter(Boolean);

  if (frases.length === 0) return "Sin datos disponibles del proyecto.";

  // return frase
  return frases[Math.floor(Math.random() * frases.length)];
}







const noFlipSprites = ["jetpack", "fall", "climb", "lupi"]; 




// SPRITES
const walkFramesRight = ["walk1_right.png", "walk2_right.png", "walk3_right.png", "walk4_right.png", "walk5_right.png"];
const walkFramesLeft = ["walk1_left.png", "walk2_left.png", "walk3_left.png", "walk4_left.png", "walk5_left.png"];
const lupiFramesRight = ["lupi1.png", "lupi2.png", "lupi3.png", "lupi4.png", "lupi5.png", "lupi6.png"];
const lupiFramesLeft = ["lupi1l.png", "lupi2l.png", "lupi3l.png", "lupi4l.png", "lupi5l.png", "lupi6l.png"];
const lianaFrames = ["climblong1.png", "climb3g.png", "climb4g.png"];
const jetpackFrames = ["jetpackx1.png", "jetpackx2.png", "jetpackx3.png", "jetpackx4.png", "jetpackx5.png", "jetpackx6.png"];
const fallFrames = [
  "fall1.png","fall2.png","fall3.png","fall4.png","fall5.png"];

  const PixelCharacter = ({ userType, hoveredType , proyectosDisponibles}) => {
    const { ballPos, depositPoint, entregando, setBallPos, setDepositPoint, setEntregando,ballLanded,
    setBallLanded, } = useContext(BallContext);


  const location = useLocation();

  //Posicion
  const [position, setPosition] = useState({ x: window.innerWidth / 2 });
  const [targetX, setTargetX] = useState(window.innerWidth / 2);
  const [frame, setFrame] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [groundY, setGroundY] = useState(window.innerHeight * 0.894);
  const [direction, setDirection] = useState("right");
  const [isInspecting, setIsInspecting] = useState(false);
  const [staticInspectFrame, setStaticInspectFrame] = useState(0);

  //Estados 
  const characterRef = useRef(null);
  const isJumpingRef = useRef(false);
  const isGoingUpRef = useRef(false);
  const isDescendingRef = useRef(false);
  const initialYRef = useRef(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const targetStep = 495; //317 cards pevias //Var de valor de bajada

  //Tiempo de texto
  const isOverRow = useRef(false);

  const SpeechTime = useRef(null);



  //Estado para detectar scrolls y evitar bugs
  const isScrollingRef = useRef(false);

  //Detecta movimineto vertical
  const isAnimatingVerticalRef = useRef(false);



  //Hablar
  const [showSpeech, setShowSpeech] = useState(false);
const [speechText, setSpeechText] = useState("");

//Se cae xd
const [falling, setFalling] = useState(false);
const [fallFrame, setFallFrame] = useState(0);
const [lastMouseX, setLastMouseX] = useState(null);
const [zigzagCounter, setZigzagCounter] = useState(0);
//cae y va bajando su posicion
const [fallOffset, setFallOffset] = useState(0);





//sparkles (darle low priority, aver si se ve bonito)
const [sparkles, setSparkles] = useState([]);

const createSparkle = () => {
  const id = Math.random().toString(36).substring(7);

  setSparkles((prev) => [
    ...prev,
    { 
      id, 
      x: Math.random() * window.innerWidth, 
      y: Math.random() * window.innerHeight 
    }
  ]);

  setTimeout(() => {
    setSparkles((prev) => prev.filter((s) => s.id !== id));
  }, 3000);
};

const [numProyectos, setNumProyectos] = useState(0);


//Obtener numero de pryectos
// Obtiene el numero real de proyectos desde el backend
useEffect(() => {
  const fetchProyectos = async () => {
    try {
      const res = await fetch("http://localhost:8000/proyectos", { credentials: "include" });
      const data = await res.json();
      setNumProyectos(data.length); 
    } catch (error) {
      console.error("Error al obtener proyectos:", error);
      setNumProyectos(0);
    }
  };

  fetchProyectos();
}, []);



//General (En todas las rutas)
//Se cae xd
useEffect(() => {
  const handleMouseMove = (e) => {
    if (lastMouseX !== null) {
      const deltaX = Math.abs(e.clientX - lastMouseX);

      if (deltaX > 100) { // 
        setZigzagCounter(prev => prev + 1);
      }
      
    }
    setLastMouseX(e.clientX);
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, [lastMouseX]);

useEffect(() => {
  if (zigzagCounter >= 10 && !falling) { //después de 5 zigzags se caera el teus
    iniciarCaida();
  }
}, [zigzagCounter]);

const iniciarCaida = () => {
  setFalling(true);
  setZigzagCounter(0);
  setFallOffset(0); // empieza desde 0

  let frame = 0;
  let offset = 0;

  const interval = setInterval(() => {
    setFallFrame(frame);
    setFallOffset(offset);

    frame++;
    offset += 8; //baja 8pixeles cuando se cae (para que no flotexd)

    if (frame >= fallFrames.length) {
      clearInterval(interval);
      setFalling(false);
      setFallFrame(0);
      setFallOffset(0); //vuelve a su posicion original
    }
  }, 150); // velocidad de frames
};







const frasesProyectos = [
  <>¡Actualmente hay <span style={{ color: "red" }}>{numProyectos}</span> proyectos para explorar!</>,
  <>¿Te gustaría postularte a uno de estos proyectos? </>,
  <>¡Oportunidades solidarias para ti! </>,
  <>¡<span style={{ color: "red" }}>{numProyectos}</span> opciones increíbles para ti!</>,
];


const frasesFormularios = [
  "¡Varios alumnos han completado sus formularios! ",
  "Recuerda revisar las nuevas respuestas. ",
  "¡Formularios enviados recientemente! ",
];

const frasesAtencion = [
  "Algunos alumnos necesitan ayuda. ",
  "No los dejes esperando ",
  "Estos alumnos requieren tu apoyo para avanzar. ",
];



//COpiar y pegar para otras rutas

  // =============================== //
// OTRA RUTA: (Plantilla)
// =============================== //
useEffect(() => {
  if (location.pathname !== "/tu-ruta") return;
  //logica
}, [location]);


 // =============================== //
// SIGNUP: hover frases y animación
// =============================== //
useEffect(() => {
  
  if (location.pathname !== "/signup") return;

  if (hoveredType === "alumno") {
    setSpeechText("¿Listo para registrar proyectos y hacer un cambio? ");
    setShowSpeech(true);
  } else if (hoveredType === "osf") {
    setSpeechText("¡Gracias por apoyar! ");
    setShowSpeech(true);
  } else if (hoveredType === "limpiar") {
    setSpeechText("¿Cambiaste de opinión? ");
    setShowSpeech(true);
  } else {
    setShowSpeech(false);
  }
}, [hoveredType, location]);

// =============================== //
// SIGNUP: jetpack junto a campo activo
// =============================== //
useEffect(() => {
  if (location.pathname !== "/signup" || !userType) return;

  const inputs = Array.from(document.querySelectorAll(".signup-card-right input, .signup-card-right select, .signup-card-right textarea"));
  if (!inputs.length) return;

  const handleFocus = (e) => {
    const rect = e.target.getBoundingClientRect();
    const fieldX = rect.left - 40; // izquierda del input
    const fieldY = rect.top + window.scrollY - 32;

    setTargetX(fieldX);
    const diffY = fieldY - groundY;

    if (Math.abs(diffY) > 10) {
      isJumpingRef.current = true;
      animateGroundYTo(fieldY, () => {
        isJumpingRef.current = false;
      });
    } else {
      animateGroundYTo(fieldY);
    }

    
    // Mostrar texto del campo
    const label = e.target.closest("div")?.querySelector("label")?.innerText;
    if (label) {
      setSpeechText(`Campo: ${label}`);
      setShowSpeech(true);
    }
  };

  const handleBlur = () => setShowSpeech(false);

  inputs.forEach((input) => {
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
  });

  return () => {
    inputs.forEach((input) => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    });
  };
}, [location, userType, groundY]);




//console.log(" Texto:", speechText, "| Mostrar:", showSpeech);




// =============================== //
// IA: movimiento desde PyTorch (vista proyectos)
// =============================== //
useEffect(() => {
  if (!location.pathname.startsWith("/projects/")) return;

  console.log("Pytorch conectado");

  const interval = setInterval(async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/predict-direction"
, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cursor_x: targetX,
          char_x: position.x,
        }),
      });

      const data = await res.json();
      const dir = data.direction === "right" ? 1 : -1;

      setIsMoving(true);
      setDirection(dir > 0 ? "right" : "left");
      setPosition((prev) => ({ x: prev.x + dir * 3 }));
    } catch (err) {
      console.error("Error al contactar IA:", err);
    }
  }, 100);

  return () => clearInterval(interval);
}, [location.pathname, targetX, position.x]);




// =============================== //
// RESPUESTA ALUMNOS: movimiento hacia pelota y depósito
// =============================== //
useEffect(() => {
  if (location.pathname !== "/respuesta_alumnos") return;
  if (!ballPos || !ballLanded || depositPoint || entregando) return;


  let interval = null;

  if (ballPos && ballLanded && !depositPoint && !entregando)
    {
    interval = setInterval(() => {
      setPosition((prev) => {
        const dx = ballPos.x - prev.x;
        if (Math.abs(dx) < 4) {
          clearInterval(interval);
  
          setTimeout(() => {
            const tabla = document.querySelector(".respuestas-tabla table");
            if (tabla) {
              const rect = tabla.getBoundingClientRect();
              const x = rect.right - 40;
              const y = rect.top + window.scrollY - 40;
              setDepositPoint({ x, y });
              setEntregando(true);
            }
          }, 300); // pequeño retraso tras llegar
  
          return prev;
        }
  
        // Sigue caminando hacia la pelota
        const dir = dx > 0 ? 1 : -1;
        setIsMoving(true);
        setDirection(dir > 0 ? "right" : "left");
        return { x: prev.x + dir * 4 };
      });
    }, 30);
  }
  
  

  //Si ya tiene que ir a depositar
  // Movimiento hacia el deposito (cuando entregando es true y depositPoint está definido)
if (depositPoint && entregando) {
  interval = setInterval(() => {
    setPosition((prev) => {
      const dx = depositPoint.x - prev.x;
      if (Math.abs(dx) < 4) {
        clearInterval(interval);

        // Llego al punto de entrega, reiniciar todo
        setEntregando(false);
        setDepositPoint(null);
        //setBallPos(null); //desaparece la pelota original

        return prev;
      }

      // Sigue caminando hacia el deposito
      setIsMoving(true);
      const dir = dx > 0 ? 1 : -1;
      setDirection(dir > 0 ? "right" : "left");
      return { x: prev.x + dir * 4 };
    });
  }, 30);
}

  

  return () => clearInterval(interval);
}, [location.pathname, ballPos, depositPoint, entregando]);


  // =============================== //
  // PROYECTOS: comportamiento interactivo
  // =============================== //
  //Es el responsable de hacer que el personaje siga al Mouse
  useEffect(() => {
    if (location.pathname !== "/") return;
    const handleMouseMove = (e) => {
      setTargetX(e.clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const interval = setInterval(() => {
      setPosition((prev) => {
        const dx = targetX - prev.x;
        const speed = 3;
        if (Math.abs(dx) < 3) {
          setIsMoving(false);
          return prev;
        }
        setIsMoving(true);
        const dir = dx > 0 ? 1 : -1;
        setDirection(dir > 0 ? "right" : "left");
        return { x: prev.x + dir * speed };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [targetX, location]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const header = document.querySelector("header");
      if (!characterRef.current || !header) return;

      const characterTop = characterRef.current.getBoundingClientRect().top;
      const headerBottom = header.getBoundingClientRect().bottom;
      const isHeaderCovering = characterTop <= headerBottom;
      const canScrollDownMore = window.innerHeight + window.scrollY < document.body.scrollHeight;

      if (isHeaderCovering && !isDescendingRef.current && canScrollDownMore) {
        isGoingUpRef.current = false;
        isDescendingRef.current = true;

        setCurrentLevel((prev) => {
          const newLevel = prev + 1;
          const newY = initialYRef.current + newLevel * targetStep;
          animateGroundYTo(newY, () => { isDescendingRef.current = false; });
          return newLevel;
        });
      }

      const scrollThresholdToReturn = initialYRef.current + (currentLevel - 1) * targetStep;
      if (window.scrollY < scrollThresholdToReturn - 50 && currentLevel > 0 && !isDescendingRef.current) {
        isGoingUpRef.current = true;
        isDescendingRef.current = true;
        setCurrentLevel((prev) => {
          const newLevel = prev - 1;
          const newY = initialYRef.current + newLevel * targetStep;
          animateGroundYTo(newY, () => {
            isDescendingRef.current = false;
            isGoingUpRef.current = false;
          });
          return newLevel;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location, currentLevel]);

  useEffect(() => {
    if (location.pathname !== "/") return;
    const projectCard = document.querySelector(".MuiGrid-item");
    if (projectCard) {
      const rect = projectCard.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const initialY = rect.top + scrollTop - 25; //Inicio del personaje
      setGroundY(initialY);
      initialYRef.current = initialY;
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const cards = document.querySelectorAll(".MuiGrid-item");

    const handleMouseEnter = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const isRight = centerX > window.innerWidth / 2;
      setDirection(isRight ? "right" : "left");
      setIsInspecting(true);
      if (!isMoving) {
        const frameSet = isRight ? lupiFramesRight : lupiFramesLeft;
        const randomIndex = Math.floor(Math.random() * frameSet.length);
        setStaticInspectFrame(randomIndex);
      }
    };

    const handleMouseLeave = () => {
      setIsInspecting(false);
      setFrame(0);
    };

    cards.forEach((card) => {
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isMoving, location]);


  //
  //FIN protectos
  //



 // =============================== //
// DASHBOARD: seguir tarjetas y moverse entre filas (jetpac)
// =============================== //

useEffect(() => {
  if (location.pathname !== "/dashboard") return;

  const handleScroll = () => {
    const header = document.querySelector("header");
    if (!characterRef.current || !header) return;

    const characterTop = characterRef.current.getBoundingClientRect().top;
    const headerBottom = header.getBoundingClientRect().bottom;
    const isHeaderCovering = characterTop <= headerBottom;
    const canScrollDownMore = window.innerHeight + window.scrollY < document.body.scrollHeight;

    // Evitar multiples triggers conflictivos
    if (isScrollingRef.current || isDescendingRef.current || isGoingUpRef.current || isJumpingRef.current) return;

    if (isHeaderCovering && canScrollDownMore) {
      isScrollingRef.current = true;
      isDescendingRef.current = true;

      setCurrentLevel((prev) => {
        const newLevel = prev + 1;
        const newY = initialYRef.current + newLevel * targetStep;
        animateGroundYTo(newY, () => {
          isScrollingRef.current = false;
          isDescendingRef.current = false;
        });
        return newLevel;
      });
    }

    const scrollThresholdToReturn = initialYRef.current + (currentLevel - 1) * targetStep;

    if (window.scrollY < scrollThresholdToReturn - 50 && currentLevel > 0) {
      isScrollingRef.current = true;
      isGoingUpRef.current = true;

      setCurrentLevel((prev) => {
        const newLevel = prev - 1;
        const newY = initialYRef.current + newLevel * targetStep;
        animateGroundYTo(newY, () => {
          isScrollingRef.current = false;
          isGoingUpRef.current = false;
        });
        return newLevel;
      });
    }
  };

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, [location, currentLevel]);





useEffect(() => {
  if (location.pathname !== "/dashboard") return;

  const cards = Array.from(document.querySelectorAll(".dashboard-card"));
  if (!cards.length) return;

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + window.scrollY + rect.height / 2;
  
    const characterOffset = 8;
    const characterHeight = 64;
    const targetY = rect.top + window.scrollY - characterHeight;
  
    const diffY = targetY - groundY;
    if (Math.abs(diffY) > 12) {
      isJumpingRef.current = true;
      animateGroundYTo(targetY, () => {
        isJumpingRef.current = false;
      });
    } else {
      animateGroundYTo(targetY);
    }
  
    setTargetX(centerX);
  
    //mostrar teus hablaxd
    const text = e.currentTarget.innerText.toLowerCase(); //minuscular
  
    if (text.includes("proyecto")) {
      setSpeechText(frasesProyectos[Math.floor(Math.random() * frasesProyectos.length)]);
      setShowSpeech(true);
      //createSparkle();
    } else if (text.includes("formulario")) {
      setSpeechText(frasesFormularios[Math.floor(Math.random() * frasesFormularios.length)]);
      setShowSpeech(true);
    } else if (text.includes("atención")) {
      setSpeechText(frasesAtencion[Math.floor(Math.random() * frasesAtencion.length)]);
      setShowSpeech(true);
    } else {
      setShowSpeech(false);
    }
    
  };
  
  
  
  const handleMouseLeave = () => {
    setIsMoving(false);
    setShowSpeech(false); //hide globo cuando deja la tarjeta
  };
  

  cards.forEach((card) => {
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
  });

  return () => {
    cards.forEach((card) => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    });
  };
}, [location, groundY]);


// =============================== //
// DASHBOARD: movimiento horizontal
// =============================== //
useEffect(() => {
  if (location.pathname !== "/dashboard") return;

  const interval = setInterval(() => {
    setPosition((prev) => {
      const dx = targetX - prev.x;
      const speed = 3;
      if (Math.abs(dx) < 3) {
        setIsMoving(false);
        return prev;
      }
      setIsMoving(true);
      const dir = dx > 0 ? 1 : -1;
      setDirection(dir > 0 ? "right" : "left");
      return { x: prev.x + dir * speed };
    });
  }, 30);

  return () => clearInterval(interval);
}, [targetX, location]);



 // =============================== //
  // Acerca de: TEUS reacciona 
  // =============================== //

// =============================== //
const Y_BARRA_ODS = 545; //donde aparecera teus en Acerca_de



useEffect(() => {
  if (location.pathname === "/acerca_de") {
    setGroundY(Y_BARRA_ODS);
  }
}, [location]);



useEffect(() => {
  if (location.pathname !== "/acerca_de") return;

  const handleMouseMove = (e) => setTargetX(e.clientX);
  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, [location]);

useEffect(() => {
  if (location.pathname !== "/acerca_de") return;

  const interval = setInterval(() => {
    setPosition((prev) => {
      const dx = targetX - prev.x;
      const speed = 3;
      if (Math.abs(dx) < 3) {
        setIsMoving(false);
        return prev;
      }
      setIsMoving(true);
      const dir = dx > 0 ? 1 : -1;
      setDirection(dir > 0 ? "right" : "left");
      return { x: prev.x + dir * speed };
    });
  }, 30);

  return () => clearInterval(interval);
}, [targetX, location]);

// =============================== //
// ACERCA DE: hover sobre ODS (hablar y lupi)
// =============================== //
useEffect(() => {
  if (location.pathname !== "/acerca_de") return;
  const cards = Array.from(document.querySelectorAll(".ods-card-expand"));
  if (!cards.length) return;

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Solo movemos X
    setTargetX(rect.left + rect.width / 2);

    setIsInspecting(true); // Para cambiar sprite a lupa/lupi
    setSpeechText("ODS: " + e.currentTarget.innerText.split("\n")[0]);
    setShowSpeech(true);
  };

  const handleMouseLeave = () => {
    setIsInspecting(false);
    setShowSpeech(false);
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
  });

  return () => {
    cards.forEach((card) => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    });
  };
}, [location]);



//
//FIN TEUS ACERCA DE
//


//Inicio Teus mis_postulaciones
//Movimiento general
useEffect(() => {
  if (location.pathname !== "/mis_postulaciones") return;

  const handleMouseMove = (e) => setTargetX(e.clientX);
  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, [location]);

useEffect(() => {
  if (location.pathname !== "/mis_postulaciones") return;

  const interval = setInterval(() => {
    setPosition((prev) => {
      const dx = targetX - prev.x;
      const speed = 3;
      if (Math.abs(dx) < 3) {
        setIsMoving(false);
        return prev;
      }
      setIsMoving(true);
      const dir = dx > 0 ? 1 : -1;
      setDirection(dir > 0 ? "right" : "left");
      return { x: prev.x + dir * speed };
    });
  }, 30);

  return () => clearInterval(interval);
}, [targetX, location]);







// =============================== //
// MIS_POSTULACIONES: hover en filas, hablar info de proyecto
// =============================== //

useEffect(() => {
  if (location.pathname !== "/mis_postulaciones") return;

  const rows = document.querySelectorAll(".respuestas-tabla tbody tr");
  if (!rows.length) return;

  //Para manejar timeout y evitar encimados
  let showTimer = null;

  const handleMouseEnter = (e) => {
    setShowSpeech(false);
    setIsInspecting(false);

    //se limpian timers pasados
    if (showTimer) clearTimeout(showTimer);

    const idProyecto = e.currentTarget.getAttribute("data-id");
    const proyectoInfo = proyectosDisponibles.find(
      (p) =>
        String(p.id) === String(idProyecto) ||
        String(p.id_proyecto) === String(idProyecto) ||
        String(p.proyecto_id) === String(idProyecto)
    );

    // Un pequeño delay
    showTimer = setTimeout(() => {
      if (!proyectoInfo) {
        setSpeechText(
          <div style={{ minWidth: 260, padding: 14 }}>
            <b>Proyecto no encontrado </b>
            <div style={{ fontSize: 13, marginTop: 5, color: "#64748b" }}>
              Este proyecto ya no existe.
            </div>
          </div>
        );
      } else {
        setSpeechText(getRandomProyectoFrase(proyectoInfo));
      }
      setShowSpeech(true);
      setIsInspecting(true);
    }, 50);
  };

  const handleMouseLeave = () => {
    setShowSpeech(false);
    setIsInspecting(false);
    if (showTimer) clearTimeout(showTimer);
  };

  rows.forEach(row => {
    row.addEventListener("mouseenter", handleMouseEnter);
    row.addEventListener("mouseleave", handleMouseLeave);
  });

  return () => {
    rows.forEach(row => {
      row.removeEventListener("mouseenter", handleMouseEnter);
      row.removeEventListener("mouseleave", handleMouseLeave);
    });
    if (showTimer) clearTimeout(showTimer); 
  };
}, [location, proyectosDisponibles]);







//Lugar teus en mis_postulaciones

useEffect(() => {
  if (location.pathname === "/mis_postulaciones") {
    const tabla = document.querySelector(".respuestas-tabla table");
    if (tabla) {
      const rect = tabla.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      setGroundY(rect.top + scrollTop - 160); //subir si queremos que suba o no
    }
  }
}, [location]);



//
//Fin teus mis_postulaciones
//






  // =============================== //
  // Animacion general

/*
  useEffect(() => {
    const frames =
      isJumpingRef.current
        ? jetpackFrames
        : isInspecting
        ? direction === "right"
          ? lupiFramesRight
          : lupiFramesLeft
        : direction === "right"
        ? walkFramesRight
        : walkFramesLeft;

        */

  // =============================== //
  useEffect(() => {
    const isSignupJetpack = location.pathname === "/signup" && userType;
  
    const frames =
      isJumpingRef.current || isSignupJetpack
        ? jetpackFrames
        : isInspecting
        ? direction === "right"
          ? lupiFramesRight
          : lupiFramesLeft
        : direction === "right"
        ? walkFramesRight
        : walkFramesLeft;
  
    const shouldAnimate =
      isMoving ||
      isInspecting ||
      isJumpingRef.current ||
      isSignupJetpack;
  
    if (!shouldAnimate) {
      if (location.pathname.startsWith("/projects/")) return;
      setFrame(0);
      return;
    }
  
    const animInterval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 150); // puedes ajustar la velocidad aquí
  
    return () => clearInterval(animInterval);
  }, [isMoving, isInspecting, direction, location, userType]); //animacion
  

  // =============================== //
  // SPRITE ACTUAL
  // =============================== //
  const currentFrames = isInspecting
    ? direction === "right"
      ? lupiFramesRight
      : lupiFramesLeft
    : direction === "right"
    ? walkFramesRight
    : walkFramesLeft;

    const currentSprite =
    (location.pathname === "/dashboard" && (isJumpingRef.current || isAnimatingVerticalRef.current)) ||
    (location.pathname === "/signup" && userType) ||
    isGoingUpRef.current
      ? jetpackFrames[frame % jetpackFrames.length]
      : isDescendingRef.current
      ? lianaFrames[frame % lianaFrames.length]
      : isInspecting && !isMoving
      ? currentFrames[staticInspectFrame]
      : currentFrames[frame];
  


  // =============================== //
  // Movimiento vertical suave
  // =============================== //
  const animateGroundYTo = (targetY, onFinish) => {
    isAnimatingVerticalRef.current = true; //  indicar que está animando
  
    const interval = setInterval(() => {
      setGroundY((prev) => {
        const diff = targetY - prev;
        if (Math.abs(diff) < 3) {
          clearInterval(interval);
          isAnimatingVerticalRef.current = false; //  terminó animación
          onFinish?.();
          return targetY;
        }
        return prev + Math.sign(diff) * 3;
      });
    }, 20);
  };
  
  
  //importante en todas los movimientos
  //important
  const shouldFlip = (sprite) => {
    if (!sprite) return false;
  
    // Sprites que siempre se voltean si la direeccion es left
    const flipAlways = ["jetpack", "climb"];
  
    // sprites que que no se voltean
    const noFlipSprites = ["_left", "lupi", "fall"];
  
    if (flipAlways.some(keyword => sprite.includes(keyword))) {
      return true; // Siempre voltear jetpack y climb
    }
  
    if (noFlipSprites.some(keyword => sprite.includes(keyword))) {
      return false; // NO voltear walk_left, lupi, fall
    }
  
    return true; // voltear walk normal (walk1_right.png) si vamos a la izquierda
  };
  
  
  
  const isFlipped = direction === "left" && shouldFlip(currentSprite);

  //Si se esta en signup y hay un userType, regresar a globos pequeños
  const isSignup = location.pathname === "/signup";
const isBigSignup = isSignup && !userType;

  

  return (

    
    <>
 <img
  ref={characterRef}
  src={falling ? `${fallFrames[fallFrame]}` : currentSprite}
  alt="pixel character"
  className={isBigSignup ? "jetpack-float" : ""}
  style={{
    position: "absolute",
    left: location.pathname === "/signup" ? position.x - 60 : position.x,
    top: falling ? groundY + fallOffset : groundY,
    transform: `
      translateX(-50%)
      ${isFlipped ? " scaleX(-1)" : ""}
      ${
        location.pathname === "/signup"
          ? " scale(2.3)"
          : falling
          ? ""
          : location.pathname.startsWith("/projects/")
          ? ""
          : isGoingUpRef.current
          ? " scale(1.1)"
          : isDescendingRef.current
          ? " scale(6)"
          : ""
      }
    `,
    width: location.pathname === "/signup"
      ? userType
        ? 32
        : 180
      : 64,
    height: location.pathname === "/signup"
      ? userType
        ? 32
        : 180
      : 64,
    objectFit: "contain",
    imageRendering: "pixelated",
    pointerEvents: "none",
    zIndex: 10,
  }}
/>






  


  
  {/* Globo de texto */}
  {showSpeech && (
  <div
    className="lupi-speech"
    style={{
      position: "absolute",
      top: isSignup ? groundY - (isBigSignup ? 150 : 50) : groundY - 50,
      left: isSignup ? position.x - (isBigSignup ? 260 : -30) : position.x + 30,
      padding: isBigSignup ? "12px 20px" : "6px 10px",
      background: "white",
      color: "#1e293b",
      borderRadius: "14px",
      fontSize: isBigSignup ? "16px" : "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      pointerEvents: "none",
      zIndex: 1000,
      maxWidth: "260px",
      lineHeight: "1.3",
      fontWeight: 700,
      whiteSpace: "normal",
      wordWrap: "break-word",
      textAlign: "right",

       //MiniModal
       maxWidth: "380px",      
    minWidth: "260px",      
    padding: isBigSignup ? "12px 20px" : "14px 16px", //mas padding para mini modal
    //Mini modal fin
    }}
  >
    {speechText}
  </div>
)}






  

  {/*sparkle */}
  {sparkles.map((sparkle) => (
  <div
    key={sparkle.id}
    className="sparkle"
    style={{
      left: `${sparkle.x}px`,
      top: `${sparkle.y}px`,
      position: "absolute",
    }}
  />
))}






  {/*bola si está entregando */}
  {entregando && (
    <img
      src="/ball.png"
      alt="ball"
      style={{
        position: "absolute",
        left: position.x + 10,
        top: groundY - 12,
        width: 20,
        height: 20,
        transform: "translateX(-50%)",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 9,
      }}
    />
  )}


</>

  
  );
};

export default PixelCharacter;