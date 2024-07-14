import React, {useEffect, useState} from 'react'
import './css/student.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Student() {
    const[student, setStudent] = useState({});
    
    const navigate = useNavigate();
    
    useEffect( ()=>{
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:8081/index')
        .then( (res) => {
            if(res.data === "logout")
                navigate("/");
            else{
                setStudent(res.data)
            }
        })
        .catch(err => console.log(err));
    }, [])

    function handleDelete (id){
        console.log("id == "+id);
        axios.delete('http://localhost:8081/delete/'+id)
        .then(window.location.reload())
        .catch(err => console.log(err))
    }

    function logout(){
        console.log("logoutclick")
        axios.get('http://localhost:8081/logout')
        .then((res) =>{
            console.log("logout => "+res)
            navigate("/");
        })
    }
    var data = student.data || [];
    
  return (
    <div id="container">
        <nav>
            <div>{student.uname}</div>
            <div><button class="logoutBtn" onClick={() => logout()}>Logout</button></div>
        </nav>
        <h1>To Do List</h1>
        { data.map(( d,i ) => (
            <div className="box" key={i}>
                <h2 className="title">{d.title}</h2>
                <p className="description">{d.description}</p>
                <div className="buttons">
                    <Link to={`update/${d._id}`} className="btn update">Update</Link>
                    <button onClick={() => handleDelete(d._id)} className="btn delete">Delete</button>
                </div>
            </div>  
        ))}  
        <br />
        <Link to="/create/" className="btn create">Add New</Link>
    </div>
  )
}

export default Student;