
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
cloneMessage.appendChild(cloneGroupMessageSenderName,cloneMessageContent,cloneMessageTime)
return cloneMessage
}