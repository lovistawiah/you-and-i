const channelSelect = document.querySelector(".channel-select")
const newApp = document.querySelector(".new-app")

const token = checkToken()

if (token) {
    var socket = io({
        auth: {
            token
        }
    })
    //? in chatPanel.js
    searchMessageOrNewContact(socket)
    displayNewContacts(socket)
    newApp.style.display = "none"
} else {
    console.log("token not available")
}

socket.on("connect",()=>{
    console.log(socket.id)
})