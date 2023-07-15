const sendMessageTextBox = document.getElementById("textbox")
const sendMessageBtn = document.getElementById("submit")
const messagesSection = document.querySelector(".messages")
const selectedChannelContainer = document.querySelector(".selected-channel")




const messageEvents = {
    displaySelectedChannelMessages: "displaySelectedChannelMessages",
    sendMessage: "sendMessage",
    newChannelMessage: "newChannelMessage",
    deleteMessage: "deleteMessage",
    offlineOnlineIndicator: "offlineOnlineIndicator",
    displayChannelAllMessages: "displayChannelAllMessages",
    SingleMessage: "SingleMessage",
    typing: "typing"
}


function sendMessage(socket) {
    sendMessageBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const messageValue = sendMessageTextBox
        let messageObj
        const selectedChannelChildren = selectedChannelContainer.children

        const userId = selectedChannelChildren[0].innerText
        const channelId = selectedChannelChildren[1].innerText

        if (messageValue.value != "") {
            if (channelId && userId) {
                //emitting to old channel
                messageObj = {
                    channelId,
                    message: messageValue.value
                }
                socket.emit(messageEvents.sendMessage, messageObj)

            }
            if (userId && channelId == "") {
                //emitting new channel
                console.log("here")
                messageObj = {
                    userId,
                    message: messageValue.value
                }
                socket.emit(messageEvents.newChannelMessage, messageObj)
            }
        }
        messageValue.value = ""
        return
    })

}
const appendSingleMessage = (socket) => {
    socket.on(messageEvents.SingleMessage, (messageData) => {
        console.log(messageData)
        const { message, sender, createdAt, channelId } = messageData
        if (selectedChannelChannelId.innerText == channelId) {
            checkAndCreateDateSection(createdAt)
            const fragmentedDoc = cloneMessageContainer({ message, sender, message, createdAt })
            messagesSection.appendChild(fragmentedDoc)
            scrollMessagesToBottom()
        }

        const chat = document.getElementById(channelId)
        if (chat) {
            const chatChildren = chat.children
            const chatLastMessage = chatChildren[4]
            const chatTime = chatChildren[5]

            chatLastMessage.innerText = message
            chatTime.innerText = chatOrMessageTime(createdAt)
            prependToChatPanel(channelId)
        }
    })
}

const addNewChannelMessage = (socket) => {
    socket.on(messageEvents.newChannelMessage, (messageData) => {
        const { message, sender, createdAt, channelId, receiver } = messageData

        if (selectedChannelChannelId.innerText == "" && selectedChannelUserId.innerText == receiver) {
            selectedChannelChannelId.innerText == channelId

            const userId = selectedChannelUserId.innerText
            const username = selectedChannelName.innerText
            checkAndCreateDateSection(createdAt)

            const newFragmentedDoc = cloneMessageContainer({ message, sender, message, createdAt })

            messagesSection.appendChild(newFragmentedDoc)

            const fragmentedDoc = cloneOldChatContainer(channelId, userId, username, message, createdAt)
            chatMessages.prepend(fragmentedDoc)

            //clear the new contacts and hide the section
            newContacts.style.display = "none"
            newContacts.innerHTML = ""

        }
    })
}


const appendMessages = (socket) => {
    socket.on(messageEvents.displayChannelAllMessages, (messages) => {
        for (let messageData of messages) {
            let { message, sender, createdAt } = messageData
            checkAndCreateDateSection(createdAt)
            const fragmentedDoc = cloneMessageContainer({ message, sender, createdAt })
            messagesSection.appendChild(fragmentedDoc)
        }
        scrollMessagesToBottom()
    })
}
function checkAndCreateDateSection(createdAt) {
    const date = document.createElement("section")
    date.className = "date"
    const cloneDate = date.cloneNode()
    if (!document.querySelector(".date")) {
        const dateText = messageHeaderDate(createdAt)
        cloneDate.innerText = dateText
        messagesSection.appendChild(cloneDate)
    }

    const datesList = document.querySelectorAll(".date")
    if (datesList) {
        const datesListLength = datesList.length
        const lastItem = datesList[datesListLength - 1]

        if (lastItem.innerText != messageHeaderDate(createdAt)) {
            cloneDate = messageHeaderDate(createdAt)
            messagesSection.appendChild(cloneDate)
        }
    }
}

//cloned message section and append to 
function cloneMessageContainer({ message, sender, createdAt }) {
    const fragment = document.createDocumentFragment()
    const { cloneMessage } = createMessageContainer()

    const messageContainer = cloneMessage
    const messageContainerChildren = messageContainer.children

    const groupMessageSenderName = messageContainerChildren[0]

    if (groupMessageSenderName.innerText == "") {
        groupMessageSenderName.hidden = true
    }
    const otherUserId = selectedChannelUserId.innerText
    const messageContent = messageContainerChildren[1]

    if (sender != otherUserId) {
        messageContainer.classList.add("sender")
    }

    messageContent.innerText = message

    const messageTime = messageContainerChildren[2]
    messageTime.innerText = chatOrMessageTime(createdAt)
    return fragment.appendChild(messageContainer)

}




function createMessageContainer() {
    const messageContainer = document.createElement("section")
    messageContainer.className = "message"

    const groupMessageSenderName = document.createElement("section")
    groupMessageSenderName.className = "group-message-sender-name"

    const messageContent = document.createElement("section")
    messageContent.className = "message-content"

    const messageTime = document.createElement("section")
    messageTime.className = "message-time"

    messageContainer.append(groupMessageSenderName, messageContent, messageTime)

    const cloneMessage = messageContainer.cloneNode(true)

    return {
        cloneMessage
    }
}

function scrollMessagesToBottom() {
    messagesSection.scrollTo(0, messagesSection.scrollHeight)
}


function emptyMessagePanel() {
    messagesSection.innerHTML = ""
    selectedChannelName.textContent = "Select a channel to see messages"
    selectedChannelStatus.textContent = ""
    sendMessageArea.style.visibility = "visible"
}

function clearMessages() {
    messagesSection.innerHTML = ""
}


function typing(socket) {
    sendMessageTextBox.addEventListener("keydown", (e) => {
        if (selectedChannelChannelId.innerText != "") {
            const channelId = selectedChannelChannelId.innerText
            socket.emit(messageEvents.typing, channelId)
        }
    })
}
function receiveTyping(socket) {
    socket.once(messageEvents.typing, (data) => {
        console.log(data)
    })
}

function onlineStatus(socket) {
    socket.on(userEvents.status, (data) => {

        const { status, userId } = data
        // if(selectedChannelUserId.innerText == userId){

        // }
        console.log(typeof status)
        const isDate = Date.parse(status)
       console.log(isDate)
        // console.log(status)
    })
}
// TODO: typing functionality, hide the send message area and avatar api.
