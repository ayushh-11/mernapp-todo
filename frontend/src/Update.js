import React, { useState } from 'react'
import './css/submit.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Update() {
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const Navigate = useNavigate();
    const {id} = useParams(); 
    console.log(id);
    function handleUpdate(event)  {
        axios.defaults.withCredentials = true;
        event.preventDefault();
        console.log(title)
        axios.put('http://localhost:8081/update/'+id, {title, description})
        .then( res => {
            Navigate("/");
        })
        .catch(err => console.log(err));
    }
  return (
    <div>
        <div className="container">
            <div className="form-header">
                <h1 className="form-title">Create list</h1>
                <p className="form-description">Please fill out the form below to create a list.</p>
            </div>
            <form className="material-form">
                <div className="form-group">
                    <label for="name">Title</label>
                    <input type="text" id="name" name="title" required onChange = {e => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="message">Description</label>
                    <textarea id="message" name="description" rows="4" required onChange = {e => setDesc(e.target.value)}></textarea>
                </div>
                <button onClick={handleUpdate} className="submit-button">Update</button>
            </form>
        </div>
    </div>
  )
}

export default Update