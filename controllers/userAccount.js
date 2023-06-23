const User = require("../models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// ? signup controller
const signup = async (req, res) => {
    let message = ""
    try {
        let { firstName, lastName, username, email, password, confirmPassword } = req.body
        if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
            console.log(req.body)
            message = "all fields are required"
            res.status(400).json({ message })
            return
        }

        if (password !== confirmPassword) {
            message = "passwords do not match"
            res.status(400).json({ message })
            return
        }

        password = await bcrypt.hash(password, 10)
        const account = { firstName, lastName, username, email, password }
        await User.create(account)
        message = "ok"
        res.status(200).json({ message })

        return
    } catch (err) {
        message = "Internal Server Error"
        res.json({ message })
    }
}

//? login controller
const login = async (req, res) => {
    let message = ""
    try {
        const { usernameEmail, password } = req.body
        if (!usernameEmail || !password) {
            message = "username, email or password required"
            res.status(400).json({ message })
            return
        }

        const user = await User.findOne({
            $or: [{ username: usernameEmail }, { email: usernameEmail }]
        })
        // handle if no user exists
        if (!user) {
            message = `${usernameEmail} does not exist`
            res.status(400).json({ message })
            return
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            message = "incorrect password"
            res.status(400).json({ message })
            return
        }
        const token = jwt.sign({ Id: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "30d"
        })
        
        res.status(200).json({ message: "ok", userInfo: { userId: user._id, username: user.username }, token })
        return
    } catch (err) {
        message = "Internal Server Error"
        res.status(400).json({ message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        .populate({
            path: 'channels',
            // populate: { path: 'messages' }
        })
        res.status(200).json(users)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports = {
    login,
    signup,
    getAllUsers
}