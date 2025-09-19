const express = require("express")
const port = 1008;

const app = express()
const db = require("./config/db")
const Schema = require("./models/firstSchema")

app.set("view engine","ejs")
app.use(express.urlencoded({extended : true}));

// Landing Page Route
app.get("/", async(req,res) => {
    await Schema.find().then((data) => {
        res.render("index",{data})
    })
})

// Add Book Page Render
app.get("/addForm",(req,res) => {
    res.render("add")
})

// Add Data Route
app.post("/addData", async(req,res) => {
    await Schema.create(req.body).then(() => {
        res.redirect("/")
    })
})

// Delete Data Route
app.get("/deleteData", async (req,res) => {
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/")
    })
})

// Edit Data
app.get("/editData", async(req,res) => {
    const singleData = await Schema.findById(req.query.id).then((maindata) => {
        res.render("edit",{maindata})
    })
})

// Update Data
app.post("/updateData", async(req,res) => {
    await Schema.findByIdAndUpdate(req.body.id,req.body).then(() => {
        res.redirect("/")
    })
})

app.listen(port,(err) => {
    (err) ? console.log(err) : console.log(`Server is started on port : ${port}`)
})