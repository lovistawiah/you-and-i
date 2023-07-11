const sendMessageTextBox = document.getElementById("textbox")
const sendMessageBtn = document.getElementById("submit")
const messagesSection = document.querySelector(".messages")
const loggedInUserId = document.querySelector(".user-id")


const messageEvents = {
    displaySelectedChannelMessages: "displaySelectedChannelMessages",
    sendMessage: "sendMessage",
    deleteMessage: "deleteMessage",
    offlineOnlineIndicator: "offlineOnlineIndicator",
    displayChannelAllMessages: "displayChannelAllMessages",
    SingleMessage: "SingleMessage"
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
const appendSingleMessage = (socket) => {
    socket.on(messageEvents.SingleMessage, (messages) => {
        cloneMessageContainer(messages)
    })
}


const appendMessages = (socket) => {
    socket.on(messageEvents.displayChannelAllMessages, (messages) => {
        cloneMessageContainer(messages)
    })
}


//cloned message section and append to 
function cloneMessageContainer(messages) {
    const { date, messageContainer, groupMessageSenderName, messageContent, messageTime } = createMessageContainer()

    for (let messageData of messages) {
        const { sender, message, createdAt } = messageData
        const cloneDate = date.cloneNode()
        const cloneMessageContainer = messageContainer.cloneNode()
        const cloneGroupMessageSenderName = groupMessageSenderName.cloneNode()
        cloneGroupMessageSenderName.style.visibility = "hidden" //? future use on groups
        const cloneMessageContent = messageContent.cloneNode()
        const cloneMessageTime = messageTime.cloneNode()

        //checking if the date section exist or if exist compare the section text to the returned string from the messageHeaderDate function
        if (!document.querySelector(".date")) {
            cloneDate.textContent = messageHeaderDate(createdAt)
            messagesSection.appendChild(cloneDate)
        }

        const dateCheckList = document.querySelectorAll(".date")
        const dateCheckListLength = dateCheckList.length
        const lastItem = dateCheckList[dateCheckListLength - 1]
        //get the last node of the date class and compare it with the message Date.
        if (lastItem.textContent != messageHeaderDate(createdAt)) {
            cloneDate.textContent = messageHeaderDate(createdAt)
            messagesSection.appendChild(cloneDate)
        }

        if (loggedInUserId.innerText != "" && loggedInUserId.innerText == sender) {
            cloneMessageContainer.classList.add("sender")
        }

        cloneMessageContent.textContent = message
        cloneMessageTime.textContent = chatOrMessageTime(createdAt)
        cloneMessageContainer.append(cloneGroupMessageSenderName, cloneMessageContent, cloneMessageTime)
        messagesSection.appendChild(cloneMessageContainer)
        scrollMessagesToBottom()
    }
}

function emptyMessagePanel() {
    messagesSection.innerHTML = ""
    selectedChannelName.textContent = "Select a message"
    selectedChannelStatus.textContent = ""
    sendMessageArea.style.visibility = "visible"
}

function createMessageContainer() {
    const date = document.createElement("section")
    date.className = "date"

    const messageContainer = document.createElement("section")
    messageContainer.className = "message"

    const groupMessageSenderName = document.createElement("section")
    groupMessageSenderName.className = "group-message-sender-name"

    const messageContent = document.createElement("section")
    messageContent.className = "message-content"

    const messageTime = document.createElement("section")
    messageTime.className = "message-time"
    return {
        date,
        messageContainer,
        groupMessageSenderName,
        messageContent,
        messageTime
    }
}

function scrollMessagesToBottom() {
    messagesSection.scrollTo(0, messagesSection.scrollHeight)
}

// TODO: typing functionality, hide the send message area and avatar api.
