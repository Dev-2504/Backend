const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    contactno : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
})

const firstSchema = mongoose.model("Crud", Schema)

module.exports = firstSchema