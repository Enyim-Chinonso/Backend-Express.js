const jwt = require("jsonwebtoken")
const User = require("../models/user.model")


const JWT_SECRETE = "uloease"

// App password
// ugrt pvxb xpgm kmbs


// middleware validation token
const auth = async(req, res, next) => {
    const token = req.header("Authorization").split(" ")[1]

    console.log(`The token is ${token}`)

    if(!token) {
        return res.status(401).json({message: "Access denied, authorization token was not provided"})
    }
 
    try{
        const decoded = jwt.verify(token, JWT_SECRETE);
        req.user = await User.findById(decoded.userId).select("-password")

        if(!req.user) return res.status(401).json({message: "User not found"})
            next();

        

    }catch(error){
        console.error("Auth middleware error:", error)
        res.status(401).json({message: error.message})
    }

}



const adminOnly = (req, res, next) => {
    if(req.user.role !== "admin") {
        return res.status(403).json({error: "Access denied, only admin can access this route"})
    }
    next()
} 

module.exports = {auth, adminOnly}


