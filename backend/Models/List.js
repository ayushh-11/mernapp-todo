const mongoose = require("mongoose");

listSchema = new mongoose.Schema({
    listed_by : String,
    title : String,
    description : String
})

ListModel = mongoose.model("list", listSchema);

module.exports = ListModel;