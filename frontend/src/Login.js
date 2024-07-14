import React from 'react';
import "./css/login.css";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
    const[username, setUserName] = useState("");
    const[password, setPassword] = useState("");
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[rpassword, setrPassword] = useState("");
    const[error, setErr] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        
        axios.get('http://localhost:8081/')
        .then(res => {
            if(res.data)
                navigate("/index");
        })
    })
    function handleLogin(e){
        e.preventDefault();
        
        console.log(username);
        console.log(password);
        axios.post('http://localhost:8081/login',{username, password})
        .then( res=>{
            console.log(res.data);
            console.log("response")
            if (res.data){
                console.log("Succeed")
                navigate("/index");
            }
            else{
                console.log("Wrongggggggggg")
                setErr("Invalid Information");
            }
            
        })
        .catch(err => console.log(err))
    }
    function handleRegister(e){
        e.preventDefault();
        axios.post('http://localhost:8081/register',{name, email, rpassword})
        .then(res => {
            alert("Account registered !!")
            navigate("/index")
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <div className="container">
        <div className="form-container">
            <div className="login-section">
                <h2>Login</h2>
                <form id="login-form">
                    <div className="form-group">
                        <label for="login-id">ID</label>
                        <input type="text" id="login-id" name="login-id" required onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label for="login-password">Password</label>
                        <input  type="password" id="login-password" name="login-password" required onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <button onClick={handleLogin} className="form-button">Login</button>
                    <br/>
                    {error}
                </form>
            </div>
            <div className="registration-section">
                <h2>Register</h2>
                <form id="registration-form">
                    <div className="form-group">
                        <label for="full-name">Full Name</label>
                        <input type="text" id="full-name" name="full-name" required onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label for="register-password">Password</label>
                        <input type="password" id="register-password" name="register-password" required onChange={e => setrPassword(e.target.value)}/>
                    </div>
                    <button onClick={handleRegister} type="submit" className="form-button">Register</button>
                </form>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Login