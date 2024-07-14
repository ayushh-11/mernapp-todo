const mongoose = require("mongoose");

loginSchema = new mongoose.Schema({
    name : String,
    username : String,
    password : String
})

LoginModel = mongoose.model("login", loginSchema);

module.exports = LoginModel;