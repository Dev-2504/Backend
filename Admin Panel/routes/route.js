const express = require("express")

const route = express.Router()
const control = require("../controller/control")
const multer = require("../middlewares/multer")

// Login Route
route.get("/", control.LoginFunction)
route.post("/Login", control.LoginDataFunction)

// Dashboard
route.get("/dashboard", control.dashboard)

// Create
route.get("/addAdmin", control.addAdminFunction)
route.post("/addAdmin",multer, control.addAdminDataFunction)

// Read
route.get("/viewAdmin", control.viewAdminFunction)

// Delete
route.get("/deleteData", control.deleteDataFunction)

// Edit
route.get("/editData", control.editDataFunction)

module.exports = route