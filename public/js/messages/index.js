const channelSelect = document.querySelector(".channel-select")
const newApp = document.querySelector(".new-app")

const token = checkToken()

if (token) {
    var socket = io({
        auth: {
            token
        }
    })

    socket.io.on("reconnect", () => {
        //from chatPanel.js
        emptyMessagePanel()

    })

    socket.on("status", (data) => {
        console.log(data)
    })


    socket.on("connect", () => {
        console.log(socket.id)
        if (socket.connected) {
            newApp.style.display = "none"
            socket.emit("status", "online")
        } else {
            window.location.href = "../../public/html/login.html"
        }
    })


    //? in chatPanel.js
    searchMessageOrNewContact(socket)
    displayNewContacts(socket)
    oldChats(socket)

    // ? in messagePanel.js
    sendMessage(socket)
    appendMessages(socket)
    appendSingleMessage(socket)

} else {
    console.log("token not available")
    channelSelect.style.display = "none"

}

