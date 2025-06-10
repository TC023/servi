import React from "react";
import { FaInstagram, FaYoutube, FaFacebook, FaEnvelope } from "react-icons/fa";
import "./Acerca_de.css";

import ods1 from "../assets/ODS/ods1.png";
import ods2 from "../assets/ODS/ods2.png";
import ods3 from "../assets/ODS/ods3.png";
import ods4 from "../assets/ODS/ods4.png";
import ods5 from "../assets/ODS/ods5.png";
import ods6 from "../assets/ODS/ods6.png";
import ods7 from "../assets/ODS/ods7.png";
import ods8 from "../assets/ODS/ods8.png";
import ods9 from "../assets/ODS/ods9.png";
import ods10 from "../assets/ODS/ods10.png";
import ods11 from "../assets/ODS/ods11.png";
import ods12 from "../assets/ODS/ods12.png";
import ods13 from "../assets/ODS/ods13.png";
import ods14 from "../assets/ODS/ods14.png";
import ods15 from "../assets/ODS/ods15.png";
import ods16 from "../assets/ODS/ods16.png";

import ods17 from "../assets/ODS/ods17.png";




const odsImgs = [ods1, ods2, ods3, ods4, ods5, ods6, ods7, ods8, ods9, 
  ods10, ods11, ods12, ods13, ods14, ods15, ods16, ods17];

const odsInfo = [
  {
    color: "#e5243b",
    number: 1,
    title: "Fin de la pobreza",
    desc: "Erradicar la pobreza en todo el mundo.",
    descAvanzada: "Erradicar la pobreza en todas sus formas y en todo el mundo.",
  },
  {
    color: "#dda63a",
    number: 2,
    title: "Hambre cero",
    desc: "Poner fin al hambre y mejorar la nutrición.",
    descAvanzada: "Poner fin al hambre, lograr la seguridad alimentaria y la mejora de la nutrición, y promover la agricultura sostenible.",
  },
  {
    color: "#4c9f38",
    number: 3,
    title: "Salud y bienestar",
    desc: "Garantizar una vida sana para todos.",
    descAvanzada: "Garantizar una vida sana y promover el bienestar en todas las edades.",
  },
  {
    color: "#c5192d",
    number: 4,
    title: "Educación de calidad",
    desc: "Acceso a educación de calidad e inclusiva.",
    descAvanzada: "Garantizar una educación inclusiva, equitativa y de calidad, y promover oportunidades de aprendizaje permanente para todos.",
  },
  {
    color: "#ff3a21",
    number: 5,
    title: "Igualdad de género",
    desc: "Lograr igualdad entre los géneros.",
    descAvanzada: "Lograr la igualdad entre los géneros.",
  },
  {
    color: "#26bde2",
    number: 6,
    title: "Agua limpia y saneamiento",
    desc: "Agua y saneamiento para todos.",
    descAvanzada: "Garantizar la disponibilidad y la gestión sostenible del agua y el saneamiento para todos.",
  },
  {
    color: "#fcc30b",
    number: 7,
    title: "Energía asequible y no contaminante",
    desc: "Energía sostenible y moderna para todos.",
    descAvanzada: "Garantizar el acceso a una energía asequible, segura, sostenible y moderna para todos",
  },
  {
    color: "#a21942",
    number: 8,
    title: "Trabajo decente y crecimiento económico",
    desc: "Promover el trabajo decente y crecimiento.",
    descAvanzada: "Promover el crecimiento económico sostenido, inclusivo y sostenible, el empleo pleno y productivo y el trabajo decente para todos.",
  },
  {
    color: "#fd6925",
    number: 9,
    title: "Industria, innovación e infraestructura",
    desc: "Fomentar innovación e infraestructura resiliente.",
    descAvanzada: "Construir infraestructuras resilientes, promover la industrialización sostenible y fomentar la innovación.",
  },
  {
    color: "#dd1367",
    number: 10,
    title: "Reducción de las desigualdades",
    desc: "Reducir desigualdades dentro y entre países.",
    descAvanzada: "Reducir la desigualdad en y entre los países.",
  },
  {
    color: "#fd9d24",
    number: 11,
    title: "Ciudades y comunidades sostenibles",
    desc: "Ciudades inclusivas, seguras y sostenibles.",
    descAvanzada: "Lograr que las ciudades y los asentamientos humanos sean inclusivos, seguros, resilientes y sostenibles.",
  },
  {
    color: "#bf8b2e",
    number: 12,
    title: "Producción y consumo responsables",
    desc: "Promover consumo y producción sostenibles.",
    descAvanzada: "Garantizar modalidades de consumo y producción sostenibles.",
  },
  {
    color: "#3f7e44",
    number: 13,
    title: "Acción por el clima",
    desc: "Combatir el cambio climático.",
    descAvanzada: "Adoptar medidas urgentes para combatir el cambio climático y sus efectos.",
  },
  {
    color: "#0a97d9",
    number: 14,
    title: "Vida submarina",
    desc: "Proteger los océanos y sus recursos.",
    descAvanzada: "Conservar y utilizar sosteniblemente los océanos, los mares y los recursos marinos.",
  },
  {
    color: "#56c02b",
    number: 15,
    title: "Vida de ecosistemas terrestres",
    desc: "Gestionar y proteger ecosistemas terrestres.",
    descAvanzada: "Gestionar sosteniblemente los bosques y otras areas naturales.",
  },
  {
    color: "#00689d",
    number: 16,
    title: "Paz, justicia e instituciones sólidas",
    desc: "Promover sociedades justas e inclusivas.",
    descAvanzada: "descripcion",
  },
  {
    color: "#19486a",
    number: 17,
    title: "Alianzas para lograr los objetivos",
    desc: "Fortalecer alianzas para el desarrollo.",
    descAvanzada: "descripcion",
  },
];




const Acerca_de = () => {
  return (
    <div className="about-container">
      <div className="about-card glass">
        <h1 className="about-title">Acerca de Nosotros</h1>
        <p className="about-description">
          Plataforma de servicio social funcional para subir y postular proyectos
        </p>

        <div className="about-highlights">
          <div className="highlight">
            <h3>Misión</h3>
            <p>
              Fomentar el compromiso social mediante herramientas accesibles,
              visuales y funcionales.
            </p>
          </div>

          <div className="highlight">
            <h3>Visión</h3>
            <p>
              Ser una plataforma en gestión de proyectos de servicio social querida
              por los usuarios.
            </p>
          </div>

        <div className="highlight">
  <h3>¿Por qué lo hacemos?</h3>
  <p>
    Creemos en el poder de la tecnología.
    Nuestro objetivo es facilitar el encuentro entre quienes desean ayudar y quienes buscan sumar en su comunidad.
     Más que una plataforma, queremos ser un punto de encuentro para construir un impacto positivo.
  </p>
</div>

        </div>

  <div className="ods-section">
  <h3>Objetivos de Desarrollo Sostenible (ODS)</h3>
  <div className="ods-grid">
    {odsInfo.map((ods, i) => (
      <div className="ods-card-expand" style={{ "--ods-color": ods.color }} key={ods.number}>
        <div className="ods-card-inner">
          <img src={odsImgs[i]} alt={ods.title} className="ods-img-expand" />
          <div className="ods-card-content">
            <span className="ods-num-main">ODS {ods.number}</span>
            <span className="ods-title-main">{ods.title}</span>
          </div>
        </div>
        {/* Expanded info al hover */}
        <div className="ods-card-expanded">
          <div className="ods-exp-header">
            <span className="ods-exp-number">ODS {ods.number}</span>
            <span className="ods-exp-title">{ods.title}</span>
          </div>
          <div className="ods-exp-desc">{ods.desc}</div>
          {/* Puedes agregar aquí un botón o enlace si quieres */}
        </div>
      </div>
    ))}
  </div>
</div>





        <div className="social-icons">
          <a href="https://www.instagram.com/sstecpue/" className="instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.youtube.com/@sscmty/videos" className="youtube" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} />
          </a>
          <a href="https://www.facebook.com/SSCMty/?locale=es_LA" className="facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <div className="email-contact">


          </div>
        </div>
      </div>
    </div>
  );
};

export default Acerca_de;

