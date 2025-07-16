import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../Contexts/SessionContext";
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setSessionType } = useContext(SessionContext);
  const navigate = useNavigate();

  const [mensaje, setMensaje] = useState(null)

  function handleUsernameChange(e) { setUsername(e.target.value); }
  function handlePasswordChange(e) { setPassword(e.target.value); }

  function handleSubmit() {
    const formInfo = new FormData();

    let newUsername;
    if (username.endsWith("@tec.mx")) {
      newUsername = username.slice(0, username.length - 7);
    } else {
      newUsername = username;
    }
    
    const regex = /^[Aa]\d{8}$/; // Expresión regular para validar si el username es un número de matrícula
    if (regex.test(newUsername)) {
      formInfo.append("username", newUsername.toUpperCase()+"@tec.mx");
    }
    else{
      formInfo.append("username", newUsername);
    }
    
    formInfo.append("password", password);


    fetch("http://localhost:8000/login", {

      method: "POST",
      credentials: "include",
      body: formInfo,
    })
    .then((res) =>{
      console.log(res)

      if (res.status == 200) {
        console.log("bien")
        setMensaje(null)
        // console.log(res.json())
      }
      else {
        console.log("mal")
      }
      
      return res.json()
    }
    )
    .then((data) => {
      console.log(data);
      setMensaje(data.message)
      if (data.tipo) {
        console.log(data.tipo)
        setSessionType(data.tipo);
        navigate('/');

      }
    })
  //   .then((res) => {
  //     console.log(res)
  //     if (res.status == 200) {
  //       console.log("bien")
  //       setMensaje(null)
  //       setSessionType(res.tipo);
  //       // navigate('/');
  //       // console.log(res.json())
  //     }
  //     else {
  //       console.log("mal")
  //       setMensaje("Credenciales incorrectas")
  //     }
  //   }
    
  // )
    .catch((error) => { console.log(error); });
  }

  return (
    <div className="login-page">
  {/* pt izquierda */}
<div className="login-left">
  <div className="bubbles-bg">
    <div className="bubble bubble1"></div>
    <div className="bubble bubble2"></div>
    <div className="bubble bubble3"></div>
    <div className="bubble bubble4"></div>
    <div className="bubble bubble5"></div>
    <div className="bubble bubble6"></div>
  </div>
  <img src="/logoservicio.png" alt="Logo Servicio" className="service-logo" />
  <p className="service-text">¿Listo para registrar un proyecto?</p>
</div>

  





      {/*pt derecha*/}

      <div className="login-right">
        <div className="login-form">
          <h1>Inicio de sesión</h1>

          {/* Campo Usuario */}
          <div className="input-group">
            <label>Usuario:</label>
            <div className="input-with-sprite">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="input-text"
                onFocus={(e) => e.target.parentNode.querySelector('.sprite-decorativo').classList.add('sprite-jump')}
                onBlur={(e) => e.target.parentNode.querySelector('.sprite-decorativo').classList.remove('sprite-jump')}
              />
              <img src="/teusr1.png" alt="Sprite decorativo" className="sprite-decorativo" />
            </div>
          </div>

          {/*contraseña */}
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="input-text"
            />
          </div>
          { mensaje && (
            <div>
              {mensaje}
            </div>
          ) }
          {/*Entrar */}
          <input type="submit" value="Entrar" onClick={handleSubmit} className="submit" />

          <input type="submit" value="Regístrate" onClick={() => navigate("/signup")} className="submit" />

        </div>
      </div>
    </div>
  );

}