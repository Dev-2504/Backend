const express = require("express")
const path = require("path")
const port = 1008;

const app = express()
const db = require("./config/db")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use("/", require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server is started on port : ${port}`)
})