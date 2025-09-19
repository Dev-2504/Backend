const mongoose = require("mongoose")

const Schema = mongoose.Schema({
    "title" : {
        type : String,
        require : true
    },
    "author" : {
        type : String,
        require : true
    },
    "category" : {
        type : String,
        require : true
    }
})

const firstSchema = mongoose.model("Crudbasic", Schema)

module.exports = firstSchema