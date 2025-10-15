const nodemailer = require("nodemailer")

const Transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "devjadavwork7@gmail.com",
        pass : "okfdefepmrkwkxjh"
    }
})

module.exports.sendOtp = (to,otp) => {
    let mailOption = {
        from : "devjadavwork7@gmail.com",
        to : to,
        subject : "Forget Password Mail",
        text : `Your otp is ${otp}`
    }
    Transport.sendMail(mailOption)
}