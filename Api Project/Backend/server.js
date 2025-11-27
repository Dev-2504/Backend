const express = require("express")
const port = 1008;

const app = express()
const db = require("./Config/db")
const cors = require("cors")

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.use("/", require("./Routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log(`Server is started on port : ${port}`)
})