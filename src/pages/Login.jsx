import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e){
        setPassword(e.target.value);
    }

    function test(){
        navigate("/dashboard")
    }

    function handleSubmit(){
        const formInfo = new FormData();
        formInfo.append("username", username);
        formInfo.append("password", password);
        console.log("handle submit")
        fetch("http://localhost:5000/login",{
            method: "POST",
            credentials: "include",
            body: formInfo,
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            console.log("succesful")
            navigate('/dashboard');
            window.location.reload();
        })
        .catch((error) => {console.log(error);})
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <label>Usuario:</label>
            <input type="text" value={username} onChange={handleUsernameChange} />
            <label>Contraseña:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
            <input type="submit" value="Entrar" onClick={handleSubmit} className="submit"/>
            <button onClick={test}> press me</button>
            <Link to='/respuesta_alumnos'>
                <button> double press me</button>
            </Link>
        </div>
    )
    
}