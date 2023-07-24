const channelSelect = document.querySelector(".channel-select")
const newApp = document.querySelector(".new-app")

const token = checkToken()

if (token) {
    var socket = io({
        auth: {
            token
        }
    })

    socket.on("connect", () => {
        if (socket.connected) {
            newApp.style.display = "none"
        } else {
            window.location.href = "../../public/html/login.html"
        }
    })


    //? in chatPanel.js
    displayClickedChannelData(socket)
    searchMessageOrNewContact(socket)
    displayNewContacts(socket)
    oldChats(socket)

    // ? in messagePanel.js
    sendMessage(socket)
    appendMessages(socket)
    appendSingleMessage(socket)
    addNewChannelMessage(socket)
    typing(socket)
    receiveTyping(socket)
    userOnlineStatus(socket)

} else {
    channelSelect.style.display = "none"
}

