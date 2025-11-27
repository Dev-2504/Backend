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

module.exports.sendManagerDetail = (username, phone, email) => {
  let mailOption = {
    from: "devjadavwork7@gmail.com",
    to: email,
    subject: "You Access Manager Role.",
    html: `
      <h3>Welcome ${username},</h3>
      <p>You are now assigned as <strong>Manager</strong>.</p>
      <p>Your login details:</p>
      <ul>
        <li><b>Username:</b> ${username}</li>
        <li><b>Phone:</b> ${phone}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Password:</b> First 6 digits of your mobile number</li>
      </ul>
      <p>Please change your password after first login for security reasons.</p>
      <br/>
      <p>Regards,</p>
      <strong>Admin Team</strong>
    `
  };

  Transport.sendMail(mailOption);
};
