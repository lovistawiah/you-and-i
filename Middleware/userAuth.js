const jwt = require("jsonwebtoken")
const User = require("../models/Users")

//helper function
async function decodeToken(authHeader, message) {
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
        message = "invalid token"
        return message
    }
    
    const userId = decoded.Id
    const user = await User.findById(userId)
    
    if(user == null){
        message = "user does not exist"
        return message
    }

    const expTimestamp = decoded.exp
    const expDate = Date.now()
    if (expTimestamp > expDate) {
        message = "login session expired!"
        return message
    }
    // return the object found in the decoded json web token
    return {
        userId: decoded.Id,
        username: decoded.username
    }
}
//helper function
const checkToken = (req, message) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        message = "token not available"
        return message
    }
    return decodeToken(authHeader, message)
   
    // returns object or string

}


const authenticUser = async(req, res, next) => {
    let message = ""
    try {
        const tokenData =  await checkToken(req, message)
        if (typeof (tokenData) == 'string') {
            message = tokenData
            res.status(401).json({ message })
            return
        }
        //this is the userId and username obj
        req.user = tokenData
        console.log(req.user)
        next()
    } catch (err) {
        message = err.message
        res.status(500).send(message)
    }
}

const checkUserToken = (req, res) => {
    let message = ""
    try {
        const tokenData = checkToken(req, message)
        if (typeof (tokenData) == 'string') {
            message = tokenData
            res.status(401).json({ message })
            return
        }
        //this is the userId and username obj
        req.user = tokenData
        console.log(req.user)
        res.status(200).json({ tokenData })
    } catch (err) {
        message = err.message
        res.status(500).send(message)
    }
}
module.exports = {
    authenticUser,
    checkUserToken
}