const mongoose = require("mongoose")
const moment = require("moment")

const schema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
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
    role : {
        type : String,
        required : true
    },
    otp : {
        type : Number,
        default : null
    },
    otpCreatedAt : {
        type : Date,
        default : null
    },
    userCreatedAt : {
        type : Date,
        default : () => moment().toDate(),
        required : true
    },
    adminId : {
        type : mongoose.Schema.Types.ObjectId,
        default : null
    },
    managerId : {
        type : mongoose.Schema.Types.ObjectId,
        default : null
    },
    status : {
        type : Boolean,
        default : true
    }
})

const firstSchema = mongoose.model("User", schema)

module.exports = firstSchema