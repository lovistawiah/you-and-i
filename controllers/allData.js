const User = require("../models/Users")
const Channel = require("../models/Channel")
const Messages = require("../models/Messages")



async function deleteAll(req, res) {
    const { models } = req.body
    let Data
    if (models == "user") {
        Data = User
    } else if (models == "channel") {
        Data = Channel
    } else {
        Data = Messages
    }
    const message = await Data.deleteMany({})
    res.status(200).send(message)
}

module.exports = deleteAll