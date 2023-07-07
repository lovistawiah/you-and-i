const sendMessageTextBox = document.getElementById("textbox")
const sendMessageBtn = document.getElementById("submit")

const messageEvents = {
    displaySelectedChannelMessages: "displaySelectedChannelMessages",
    sendMessage: "sendMessage",
    deleteMessage: "deleteMessage",
    offlineOnlineIndicator: "offlineOnlineIndicator",
    receiveMessage:"receiveMessage"
}

function sendMessage(socket) {
    sendMessageBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const chatClicked = document.querySelector(".chat-active")
        //chatId is the clicked user's Id
        const chatId = chatClicked.children[0].innerText
        let message = sendMessageTextBox

        if (message.value != "") {
            let newChannelMessage = {
                chatId,
                message: message.value
            }
            // emit message,channel, sender is automatically the user logged in
            socket.emit(messageEvents.sendMessage, newChannelMessage)

        }
        message.value = ""

    })

}




const appendMessage = () => {
    const date = document.createElement("section")
    date.className = "date"
    const cloneDate = date.cloneNode()

    const message = document.createElement("section")
    message.className = "message"
    const cloneMessage = message.cloneNode()

    const groupMessageSenderName = document.createElement("section")
    groupMessageSenderName.className = "group-message-sender-name"

    const cloneGroupMessageSenderName = groupMessageSenderName.cloneNode()

    const messageContent = document.createElement("section")

    messageContent.className = "message-content"
    const cloneMessageContent = messageContent.cloneNode()

    const messageTime = document.createElement("section")
    messageTime.className = "message-time"
    const cloneMessageTime = messageTime
    cloneMessage.append(cloneGroupMessageSenderName, cloneMessageContent, cloneMessageTime)
    return cloneMessage
}