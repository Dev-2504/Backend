const express = require("express")
const path = require("path")
const port = 1008

const app = express()

app.set("view engine","ejs")
app.use("/",express.static(path.join(__dirname, "public")))

app.get("/",(req,res) => {
    res.render("index")
})

app.listen(port, () => {
    console.log(`Server is started on port : ${port}`)
})