const jwt = require("jsonwebtoken")

module.exports.checkAuth = (req,res,next) => {
    let token = req.header("Authorization")

    if(token)
    {
        const decode = jwt.verify(token, "DevJadav")
        req.user = decode
        next()
    }
    else{
        res.status(200).json({
            msg : "Token Not Found."
        })
    }
}