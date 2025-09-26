const express = require("express")
const multer = require("../middlewares/multer")

const route = express.Router()

const control = require("../controller/control")

route.get("/", control.landing_page)

route.get("/addMovies", control.addMovie)

route.post("/addMovieForm",multer, control.addMovieForm)

route.get("/deleteData", control.deleteFunction)

route.get("/editData", control.editFunction)

route.post("/updateData", multer, control.updateFunction)

module.exports = route