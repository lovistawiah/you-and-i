const io = require("socket.io")()
io.on("connection", async (socket) => {
    console.log(socket.id + " connected")
    socket.on("message:post", (data) => {
        io.emit("message:get", data)
    })
})

module.exports = io