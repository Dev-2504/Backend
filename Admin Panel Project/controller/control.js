const schema = require("../model/schem")
const nodemailer = require("../middlewares/mailer")


let OTP;
let User;
let CurrentUser;

module.exports.dashboard = (req,res) => {
   res.render('Dashboard');
}

module.exports.addAdminPage = (req,res) => {
    res.render("Form")
}

module.exports.viewAdminPage = async (req,res) => {
    await schema.find().then((data) => {
        res.render("Table", {data})
    })
}

module.exports.addAdminPost = async (req,res) => {
    await schema.create(req.body).then(() => {
       res.redirect('/addAdmin');
    })
}

module.exports.deletAdmin = async (req,res) => {
    await schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewAdmin")
    })
}

module.exports.LoginPage = (req,res) => {
    res.render("Login")
}

module.exports.LoginPost = async (req,res) => {
    const Admin = await schema.findOne({email : req.body.email})

    if(Admin)
    {
        if(Admin.password == req.body.password)
        {
            res.redirect("/dashboard")
            CurrentUser = Admin
        }
        else {
            res.redirect("/login")
        }
    }
    else {
        res.redirect("/login")
    }
}

module.exports.ForgetPasswordPage = async (req,res) => {
    res.render("ForgetPasswordEmail")
}

module.exports.ForgetPasswordPost = async (req,res) => {
    User = await schema.findOne({email : req.body.email})
    OTP = Math.floor(Math.random() * 900000)
    nodemailer.sendOtp(req.body.email, OTP)
    res.redirect("/setPasswordPage")
}

module.exports.setPasswordPage = (req,res) => {
    res.render("ForgetPassword")
}

module.exports.setPasswordPost = async (req,res) => {
    if(OTP == req.body.otp)
    {
        if(req.body.newPassword == req.body.confirmPassword)
        {
            await schema.findByIdAndUpdate(User.id,{password : req.body.newPassword})
            res.redirect("/login")
        }
        else {
            res.redirect("/login")
        }
    }
    else {
        res.redirect("/login")
    }
}

module.exports.changePasswordPage = (req,res) => {
    res.render("ChnagePassword")
}

module.exports.changePasswordPost = async (req,res) => {
    if(CurrentUser.password == req.body.oldPassword)
    {
        if(req.body.newPassword == req.body.confirmPassword)
        {
            await schema.findByIdAndUpdate(CurrentUser.id, {password : req.body.newPassword})
            res.redirect("/login")
        }
        else {
            res.redirect("/login")
        }
    }
    else {
        res.redirect("/login")
    }
}