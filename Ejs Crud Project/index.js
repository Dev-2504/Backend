const express = require("express")
const port = 1008

const app = express()

let data = [
    {id : 1, name : "Dev", subject : "English", city : "rajkot"}
]

app.set("view engine","ejs")
app.use(express.urlencoded({extended : true }))

app.get("/",(req,res) => {
    res.render("index",{data})
})

app.post("/addData",(req,res) => {
    // const obj = {id : data.length + 1, name : req.body.name, subject : req.body.subject, city : req.body.city}

    data.push(req.body) 
    res.redirect("/")
})

app.get("/deleteData/:id",(req,res) => {
    const newData = data.filter((e,i) => e.id != req.params.id)
    data = newData
    res.redirect("/")
})

app.get("/editData/:id",(req,res) => {
    const newData = data.find((e,i) => e.id == req.params.id)
    res.render("edit", {newData})
})

app.post("/updateData/:id",(req,res) => {
    let newData = data.find((e,i) => e.id == req.params.id)
    console.log(newData)
    newData.name = req.body.name
    newData.subject = req.body.subject
    newData.city = req.body.city
    res.redirect("/")
})

app.listen(port,() => {
    console.log(`Server is started on port : ${port}`)
})