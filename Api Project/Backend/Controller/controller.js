const schema = require("../Model/schema")
const bcrypt = require("bcryptjs")
const nodemailer = require("../Middlewares/mailer")
const moment = require("moment")
const jwt = require("jsonwebtoken")
const secretkey = "DevJadav"

// Register Function
module.exports.Registration = async (req, res) => {

    const user = await schema.findOne({
        $or: [
            { email: req.body.email },
            // { phone: req.body.phone }
        ]
    })

    if (user) {
        res.status(200).json({
            statusCode: 200,
            status: false,
            message: "User Already Exists."
        })
    }
    else {
        req.body.role = "Admin"
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await schema.create(req.body)
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "User Created Successfully."
        })
    }
}

// Login Function
module.exports.Login = async (req, res) => {
    const user = await schema.findOne({ email: req.body.email })

    if (user && user.status == true) {
        if (await bcrypt.compare(req.body.password, user.password)) {

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                secretkey,
                { expiresIn: "7d" }
            );

            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "User Login Successfully.",
                token: token
            })
        }
        else {
            res.status(200).json({
                statusCode: 200,
                status: false,
                message: "Password Wrong."
            })
        }
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: false,
            message: "User Not Found."
        })
    }
}

// SendOtp Function

module.exports.SendOtp = async (req, res) => {
    const user = await schema.findOne({ email: req.body.email })

    if (user) {
        const OTP = Math.floor(100000 + Math.random() * 900000);
        nodemailer.sendOtp(req.body.email, OTP)
        user.otp = OTP
        user.otpCreatedAt = moment().toDate()
        await user.save()

        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "Otp Send Successfully.",
            data: user.email
        })
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: false,
            message: "User Not Found."
        })
    }
}

// VerifyOtp Function

module.exports.VerifyOtp = async (req, res) => {
    const user = await schema.findOne({ email: req.body.email })

    const Time = (Date.now() - user.otpCreatedAt) / 1000

    if (Time < 60) {
        if (user.otp == req.body.otp) {
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Otp Is Right."
            })
        }
        else {
            res.status(200).json({
                statusCode: 200,
                status: false,
                message: "Otp Is Wrong."
            })
        }
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: false,
            message: "Otp Expire."
        })
    }
}

// Reset Password
module.exports.ResetPassword = async (req, res) => {
    const user = await schema.findOne({ email: req.body.email })

    if (user) {
        if (req.body.newpassword == req.body.confirmpassword) {
            hashpassword = await bcrypt.hash(req.body.newpassword, 10)
            await schema.findByIdAndUpdate(user.id, { password: hashpassword })

            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Password Updated Successfully."
            })
        }
        else {
            res.status(200).json({
                statusCode: 200,
                status: false,
                message: "NewPassword and ConfirmPassword Are Not Same."
            })
        }
    }
}

// Profile Function

module.exports.Profile = async (req, res) => {
    const user = await schema.findOne({ email: req.user.email })

    console.log(user)
    if (user) {
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "Data Fetch Successfully.",
            data: user
        })
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: false,
            message: "User Not Found."
        })
    }
}

// Change Password
module.exports.ChangePassword = async (req, res) => {
    const user = await schema.findOne({ email: req.user.email })

    console.log(req.body)
    console.log(user)
    if (user) {
        if (await bcrypt.compare(req.body.oldpassword, user.password)) {
            if (req.body.newpassword == req.body.confirmpassword) {
                const hashpassword = await bcrypt.hash(req.body.newpassword, 10)

                await schema.findByIdAndUpdate(user.id, { password: hashpassword })
                res.status(200).json({
                    statusCode: 200,
                    status: true,
                    message: "Password Updated Successfully."
                })
            }
            else {
                res.status(200).json({
                    statusCode: 200,
                    status: false,
                    message: "NewPassword and ConfirmPassword Are Not Same."
                })
            }
        }
        else {
            res.status(200).json({
                statusCode: 200,
                status: false,
                message: "Your OldPassword is Wrong."
            })
        }
    }
}






// ------------------------------------------------------------

// Manager Routes Function

module.exports.ManagerRegistraction = async (req, res) => {
    const Admin = await schema.findOne({ email: req.user.email })

    if (Admin.role == "Admin") {

        const user = await schema.findOne({
            $or: [
                { email: req.body.email },
                // { phone: req.body.phone }
            ]
        })

        if (user) {
            res.status(200).json({
                statusCode: 200,
                status: false,
                message: "User Already Exists."
            })
        }
        else {
            req.body.role = "Manager"
            const defaultPassword = req.body.phone.toString().slice(0, 6)
            req.body.password = await bcrypt.hash(defaultPassword, 10)
            req.body.adminId = req.user.id
            await schema.create(req.body)

            // nodemailer.sendManagerDetail(req.body.username, req.body.phone, req.body.email)

            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Manager Created Successfully."
            })
        }
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: false,
            message: "You Not Access To Create Manager."
        })
    }
}


// Manager Show

module.exports.ManagerShow = async (req, res) => {
    const managers = await schema.find({
        role: "Manager",
        adminId: req.user.id
    })

    if (managers) {
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "Manager Data Fetch Successfully.",
            data: managers
        })
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "Sorry You Not Create Manager."
        })
    }
}

// Delete Manager

module.exports.ManagerDelete = async (req, res) => {
    const Admin = await schema.findOne({ email: req.user.email })
    const Manager = await schema.findById(req.body.id)


    if (Admin.role == "Admin") {
        if (Manager.role == "Manager" && Manager.adminId == Admin.id) {
            // Delete Manager Method
            // await schema.findOneAndDelete({email : req.body.email})

            // Manager Deactive / Active Method
            await schema.findByIdAndUpdate(Manager.id, { status: false })

            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Manager Data Deleted Successfully.",
            })
        }
        else {

            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Validation Error",
            })
        }
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "You Not Access To Delete Manager."
        })
    }
}



// Employee Routes Function

// Add Employee Function

module.exports.EmployeeRegistraction = async (req, res) => {
    const Manager = await schema.findOne({ email: req.user.email })

    if (Manager.role == "Manager") {
        const user = await schema.findOne({
            $or: [
                { email: req.body.email },
                // { phone: req.body.phone }
            ]
        })

        if(user)
        {
            res.status(200).json({
                statusCode: 200,
                status: false,
                message: "User Already Exists."
            })
        }
        else {
            req.body.adminId = Manager.adminId
            req.body.role = "Employee"
            const defaultPassword = req.body.phone.toString().slice(0, 6)
            req.body.password = await bcrypt.hash(defaultPassword, 10)
            req.body.managerId = req.user.id

            await schema.create(req.body)

            // nodemailer.sendManagerDetail(req.body.username, req.body.phone, req.body.email)

            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Employee Created Successfully."
            })

        }
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: false,
            message: "You Not Access To Add Employee."
        })
    }
}


// Show Employees Data

module.exports.EmployeeShow = async (req,res) => {
     const employees = await schema.find({
        role: "Employee",
        managerId : req.user.id
    })

    if(employees)
    {
        
        res.status(200).json({
            statusCode : 200,
            status : true,
            message : "Data Fetch Successfully.",
            data : employees
        })
    }
    else {
        res.status(200).json({
            statusCode : 200,
            status : true,
            message: "Sorry You Not Create Employees."
        })
    }


}




// Show Employees in Admin

module.exports.EmployeeShowAdmin = async (req,res) => {
    const Employee = await schema.find({
        adminId : req.user.id,
        role : "Employee"
    })

    res.json({
        data : Employee
    })
}


// Delete Employees From Admin

module.exports.DeleteEmployee = async (req,res) => {
    const Admin = await schema.findOne({email : req.user.email})
    const Employee = await schema.findById(req.body.id)

    if(Admin.role == "Admin")
    {
        if(Employee.role == "Employee" && Employee.adminId == Admin.id)
        {
            await schema.findByIdAndUpdate(Employee.id, {status : false})

             res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Manager Data Deleted Successfully.",
            })
        }
        else {
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: "Validation Error",
            })
        }
    }
    else {
        res.status(200).json({
            statusCode: 200,
            status: true,
            message: "You Not Access To Delete Employee."
        })
    }
}