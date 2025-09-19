const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/Crud")

const db = mongoose.connection;

db.once("open",(err) => {
    err ? console.log(err) : console.log(`Database connnected Successfully`)
})

module.exports = db;