const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/AdminPanelProject")

const db = mongoose.connection

db.once("open", (err) => {
    err ? console.log(err) : console.log(`Db started successfully`)
})

module.exports.db