const jwt = require("jsonwebtoken")
const User = require("../models/Users")

const authenticateSocket = async (socket, next) => {
    const { token } = socket.handshake.auth
    try {
        if (!token) {
            console.log("token not available")
            return new Error("token not available")
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (!payload) {
            return new Error("invalid token")
        }

        const userId = payload.userInfo.userId
        const findUser = await User.findById(userId)
        if (!findUser) {
            return new Error("user does not exist")
        }
        
        socket.decoded = payload.userInfo
        return next()
    } catch (err) {
        console.log(err)
        return next(new Error("Authentication failed"))
    }
}
module.exports = {
    authenticateSocket
}