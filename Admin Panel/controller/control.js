const Schema = require("../model/firstSchema")
const fs = require("fs")

module.exports.LoginFunction = (req,res) => {
    res.render("Login")
}
let adminProfile = 0
module.exports.LoginDataFunction = async (req,res) => {
    const admin = await Schema.findOne({email : req.body.email})
    adminProfile = admin

    if(admin)
    {
        if(admin.password == req.body.password)
        {
            res.cookie("admin", admin)
            res.redirect("/dashboard")
        }
        else
        {
            res.redirect("/")
        }
    }
    else
    {
        res.redirect("/")
    }
}

module.exports.dashboard = (req,res) => {
    if(req.cookies.admin)
    {
        res.render('dashboard', {adminProfile});
    }
    else {
        res.redirect("/")
    }
}

module.exports.addAdminFunction = (req,res) => {
   res.render('addAdminForm');
}

module.exports.addAdminDataFunction = async (req,res) => {
    req.body.image = req.file.path
    await Schema.create(req.body).then(() => {
       res.redirect('/addAdmin');
    })
}



module.exports.viewAdminFunction = async (req,res) => {
    await Schema.find().then((data) => {
        res.render('viewAdmintable', {data});
    })
}
// Delete Function

module.exports.deleteDataFunction = async (req,res) => {
    const singleData = await Schema.findById(req.query.id)
    fs.unlinkSync(singleData.image)
    await Schema.findByIdAndDelete(req.query.id).then(() => {
        res.redirect("/viewAdmin")
    })
}

module.exports.editDataFunction = async (req,res) => {
    const data = await Schema.findById(req.query.id)
    res.render("editAdminForm", {data})
}