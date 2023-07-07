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
        console.log(socket.id)
    })
    // socket.on("channelAndLastMessage", (data) => {
    //     console.log(data)
    // })

    //? in chatPanel.js
    searchMessageOrNewContact(socket)
    displayNewContacts(socket)
    oldChats(socket)

    // ? in messagePanel.js
    sendMessage(socket)

    newApp.style.display = "none"
} else {
    console.log("token not available")
    channelSelect.style.display = "none"

}

