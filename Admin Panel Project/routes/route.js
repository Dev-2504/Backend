const express = require("express")

const route = express.Router()
const control = require("../controller/control")

route.get("/dashboard", control.dashboard)
route.get("/addAdmin", control.addAdminPage)
route.get("/viewAdmin", control.viewAdminPage)

route.post("/addAdminPost", control.addAdminPost)
route.get("/deleteAdmin", control.deletAdmin)

// Login
route.get("/login", control.LoginPage)
route.post("/loginPost", control.LoginPost)

// Forget Password
route.get("/forgetPasswordPage", control.ForgetPasswordPage)
route.post("/forgetPasswordPost", control.ForgetPasswordPost)
route.get("/setPasswordPage", control.setPasswordPage)
route.post("/setPasswordPost", control.setPasswordPost)

// Change Password
route.get("/changePasswordPage", control.changePasswordPage)
route.post("/changePasswordPost", control.changePasswordPost)

module.exports = route