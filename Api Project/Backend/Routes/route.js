const express = require("express")

const route = express.Router()
const controller = require("../Controller/controller")
const auth = require("../Middlewares/auth")

// Authencation
route.post("/registration", controller.Registration)
route.post("/login", controller.Login)
route.post("/sendotp", controller.SendOtp)
route.post("/verifyotp", controller.VerifyOtp)
route.post("/resetpassword", controller.ResetPassword)

// Profile Route
route.get("/profile", auth.checkAuth, controller.Profile)
// Change Password
route.post("/changepassword", auth.checkAuth, controller.ChangePassword)


// Mangaer Routes
route.post("/manager-registration", auth.checkAuth, controller.ManagerRegistraction)

// 11Number Api Manager Data Show
route.get("/manager-show", auth.checkAuth, controller.ManagerShow)

// 12Number Api Manger Data Delete
route.patch("/manager-delete", auth.checkAuth, controller.ManagerDelete)

// 13Number Api Add Employee
route.post("/employee-registration", auth.checkAuth, controller.EmployeeRegistraction)

// 18 Number Api View Employee
route.get("/employee-show", auth.checkAuth, controller.EmployeeShow)

// 19 Number Api View Employee
route.get("/employ-show-admin", auth.checkAuth, controller.EmployeeShowAdmin)

// 20 Number Api Delete Employee from admin
route.patch("/employee-delete", auth.checkAuth, controller.DeleteEmployee)

module.exports = route