const mongoosh = require("mongoose")

const Schema = mongoosh.Schema({
    title : {
        type : String,
        required : true
    },
    genre : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

const firstSchema = mongoosh.model("CrudBasie", Schema)

module.exports = firstSchema