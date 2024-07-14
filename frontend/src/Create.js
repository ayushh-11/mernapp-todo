import React, { useState } from 'react'
import './css/submit.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const Navigate = useNavigate();
    function handleCreate(e)  {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8081/create', {title, description})
        .then( res => {
            console.log("Response after insert "+res)
            Navigate("/index")
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
                <button onClick={handleCreate} className="submit-button">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create