const Schema = require("../model/firstSchema")
const fs = require("fs")

module.exports.landing_page = async (req,res) => {
    await Schema.find().then((data) => {
       res.render('index', {data});
    })
}

module.exports.addMovie = (req,res) => {
    res.render("addMovie")
}

module.exports.addMovieForm = async (req,res) => {
    req.body.image = req.file.path
    await Schema.create(req.body).then(() => {
       res.redirect('/');
    })
}

module.exports.deleteFunction = async (req,res) => {
    const singleData = await Schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)

    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/")
    })
}

module.exports.editFunction = async (req,res) => {
    await Schema.findById(req.query.id).then((singleData) => {
        res.render("editMovie", {singleData})
    })
}

module.exports.updateFunction = async (req,res) => {
    const singleData = await Schema.findById(req.body.id)
    let img = ""

    req.file ? img = req.file.path : img = singleData.image
    req.file && fs.unlinkSync(singleData.image)

    req.body.image = img

    await Schema.findByIdAndUpdate(req.body.id, req.body).then(() => {
        res.redirect("/")
    })
}