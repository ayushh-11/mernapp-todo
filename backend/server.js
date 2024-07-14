const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const mongoose = require('mongoose');
const ListModel = require("./Models/List");
const LoginModel = require("./Models/Loginmodel");

mongoose.connect('mongodb://localhost:27017/todo')
.then(()=>{
    console.log("Mongoose connected");
})
.catch((err)=>{
    throw err;
})


app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's URL
    credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(session({
    name : 'app.sid',
    secret: "1234567890QWERTY",
    resave: true,
    saveUninitialized: true
}));

app.post("/register", (req, res) => {
    const {name, email, rpassword} = req.body;
    LoginModel.create({
        Name : name,
        username : email,
        password : rpassword
    })
    .then(loginData => {
        req.session.user = loginData._id;
        req.session.auth = true;
        res.json("registered")
    })
    .catch(err => {
        console.log("Registration Error");
        throw err;
    })
})

app.post("/login", (req, res) => {
    
    const { username, password } = req.body;
    LoginModel.findOne({
        username : username,
        password : password
    })
    .then(user=>{
        if (user){
            req.session.user = user._id;
            req.session.auth = true;
            console.log("User logged in with id: ", req.session.user);
            res.json( true );
        }  
        else 
            res.json(false);
    })
    .catch(err => {throw err})
});

app.get("/", (req,res) => {
    res.json(req.session.auth)
})

app.get("/index", (req, res) => {
    var auth = req.session.auth;
    console.log("authhhhhhhh = "+auth);
    if(auth != true){
        res.json("logout");
    }
    else{
        const id = req.session.user;
        console.log("Fetching list for user id: ", id);

        ListModel.find({
            listed_by : id
        })
        .then(data => {
            LoginModel.findOne({
                _id : id
            })
            .then(ldata => {
                uname = ldata.username;
                res.json({data, uname});
            })
            .catch(err => {
                throw err
            })
        })
        .catch(err => {
            throw err;
        })
    }
});

app.post("/create", (req, res) => {
    const id = req.session.user;
    console.log(id);
    const { title, description } = req.body;
    
    ListModel.create({
        listed_by : id,
        title : title,
        description : description
    })
    .then(result => {
        res.json({message : "List created"})
    })
    .catch(err => {
        console.error("Create error: ", err);
        return res.status(500).json({ error: "Database query error" });
    })
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    ListModel.deleteOne({
        _id : id
    })
    .then(result => {
        res.json({ message: "List deleted" });
    })
    .catch(err => {
        console.error("Delete error: ", err);
        return res.status(500).json({ error: "Database query error" });
    })

});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    console.log("id =====",id);
    const { title, description } = req.body;
    ListModel.updateOne({
        _id : id
    }, {$set : {
        title : title,
        description : description
    }})
    .then (result => {
        console.log(result);
        res.json({ message: "List updated" });
    })
    .catch(err => {
        console.error("Update error: ", err);
    })
});
app.get("/logout", (req,res) => {
    req.session.destroy((err) =>{
        if (err) throw err;
        console.log("logout");
        res.json("logout");
    })
})

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
