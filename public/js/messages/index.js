const channelSelect = document.querySelector(".channel-select")
const newApp = document.querySelector(".new-app")

const token = checkToken()

if (token) {
    var socket = io({
        auth: {
            token
        }
    })

    socket.on("connect_error", () => {
        console.log("here")
    })
    socket.on("offline", (data) => {
        console.log(data)
    })
    socket.on("online", (data) => {
        console.log(data)
    })

    socket.on("connect", () => {
        console.log(socket.id)
        if (socket.connected) {

        } else {
            window.location.href = "../../public/html/login.html"
        }
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
    appendMessages(socket)

    socket.on("SingleMessage", (data) => {
        console.log(data)
    })

    offlineUser(socket)
    newApp.style.display = "none"




} else {
    console.log("token not available")
    channelSelect.style.display = "none"

}

