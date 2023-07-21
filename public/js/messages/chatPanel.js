const searchTextBox = document.getElementById("search-textbox")
const chatsSubPanel = document.querySelector(".chats-sub-panel")
const chatMessages = document.querySelector(".chat-messages")
const groupsSection = document.querySelector(".groups")
const newContacts = document.querySelector(".new-contacts")



const sendMessageArea = document.querySelector(".send-message")

const channelEvents = {
    channelAndLastMessage: "channelAndLastMessage",
    addNewChat: "addNewChat",
    search: "search",
    displayNewChats: "displayNewChats"
}

const userEvents = {
    status: "status",
    online: "online"
}





// ? not appearing on the web page.
const searchMessageOrNewContact = (socket) => {
    searchTextBox.addEventListener("keyup", (e) => {
        const textBoxValue = searchTextBox.value
        if (textBoxValue != "") {
            socket.emit(channelEvents.search, textBoxValue)
        }
        if (textBoxValue == "") {
            newContacts.style.display = "none"
            newContacts.innerHTML = ""
        }
    })

}



function displayClickedChannelData(socket) {
    chatMessages.addEventListener("click", (e) => {
        const chat = e.target
        const parentElement = chat.parentElement
        if (parentElement.className == "chat-messages") {
            searchTextBox.innerHTML = ""
            const allChats = document.querySelectorAll(".chat-active")
            allChats.forEach(chatItem => {
                chatItem.classList.remove("chat-active")
            })

            chat.classList.add("chat-active")
            activeUser = chat

            const channelId = chat.children[0].innerText
            const userId = chat.children[1].innerText
            //getting the third child element. thus, the select channel name
            const chatName = chat.children[3].innerText
            selectedChannel(chatName, userId, channelId, socket)
            askUserStatus(socket, userId)
            clearMessages()
            socket.emit(messageEvents.displayChannelAllMessages, channelId)
        }
    })

}

// in the css, make the rest add the .user-active class when clicked
function displayNewContacts(socket) {
    socket.on(channelEvents.displayNewChats, (newFriends) => {
        //clear the newContacts contents before appending new users
        newContacts.innerHTML = ""
        if (newFriends.length > 0) {
            newContacts.style.display = "block"
            // create the new contact text if newFriends.length > 1
            const newContactText = document.createElement("section")
            newContactText.className = ".new-contacts"

            if (newFriends.length == 1) {
                newContactText.textContent = "New Contact"
            } else {
                newContactText.textContent = "New Contacts"
            }
            newContacts.appendChild(newContactText)
            for (let newFriend of newFriends) {
                const { _id, username } = newFriend
                const newChat = addNewChats(_id, username)
                newContacts.appendChild(newChat)
            }

            newContacts.addEventListener("click", (e) => {
                //removing the user
                clearSelectedChannel()
                messagesSection.innerHTML = ""
                const activeChats = document.querySelectorAll(".chat-active")
                if (activeChats.length > 0) {
                    activeChats.forEach(activeChat => {
                        activeChat.classList.remove("chat-active")
                    })
                }

                const newContact = e.target
                newContact.classList.add("chat-active")
                const newUserId = newContact.children[0].innerText
                const newChatName = newContact.children[2].innerText
                askUserStatus(socket, newUserId)
                //the last parameter is channelId for old chats
                selectedChannel(newChatName, newUserId, "", socket)
            })
        }

    })
}

function displayGroups() {
    if (searchTextBox.value != "" && groupsSection.innerHTML != "") {
        groupsSection.addEventListener("click", (e) => {
            const group = e.target
            console.log(group)
        })
    }

}

const oldChats = (socket) => {
    HideSelectedChannel()
    socket.on(channelEvents.channelAndLastMessage, (channelAndLastMessage) => {
        //clears the chat panel 
        chatMessages.innerHTML = ""
        if (channelAndLastMessage && channelAndLastMessage.length > 0) {
            for (let channel of channelAndLastMessage) {
                const { channelInfo, messageInfo, userInfo } = channel
                const { channelId } = channelInfo
                const { userId, username, } = userInfo
                const { lastMessage, createdAt } = messageInfo

                const fragmentedDoc = cloneOldChatContainer(channelId, userId, username, lastMessage, createdAt)
                chatMessages.appendChild(fragmentedDoc)
            }

        }
    })
}

const cloneOldChatContainer = (channelId, userId, username, lastMessage, createdAt) => {
    const fragment = document.createDocumentFragment()
    const { cloneChat } = createOldChatContainer()

    const chat = cloneChat
    // chat id is used, to find the match of the channel Id that received the message.
    // if found get the lastMessage node and modify it with the message and the time received.
    chat.id = channelId

    const children = chat.children

    const chatId = children[0]
    chatId.innerText = channelId

    const userIdText = children[1]
    userIdText.innerText = userId

    const userChatPic = children[2]
    const userImg = userChatPic.children[0]
    userImg.src = "../public/img/loginsignup.png"
    userImg.alt = "user chat pic"

    const userName = children[3]
    userName.innerText = username

    const chatLastMessage = children[4]
    chatLastMessage.innerText = lastMessage

    const chatTime = children[5]
    chatTime.innerText = chatOrMessageTime(createdAt)

    return fragment.appendChild(chat)
}


function createOldChatContainer() {
    const chat = document.createElement("a")
    // for the channel-id class
    const chatId = document.createElement("section")
    //for userId
    const userIdText = document.createElement("section")
    const userChatPic = document.createElement("section")
    const userImg = document.createElement("img")
    const userName = document.createElement("section")
    const chatLastMessage = document.createElement("section")
    const chatTime = document.createElement("section")

    chat.href = "#"
    chat.className = "chat"
    chatId.className = "channel-Id"
    chatId.hidden = true
    userIdText.className = "user-id"
    userIdText.hidden = true
    userChatPic.className = "user-chat-pic"
    userName.className = "chat-username"
    chatLastMessage.className = "chat-last-message"
    chatTime.className = "chat-time"

    userChatPic.appendChild(userImg)
    chat.append(chatId, userIdText, userChatPic, userName, chatLastMessage, chatTime)

    const cloneChat = chat.cloneNode(true)

    return { cloneChat }
}

const addNewChats = (userId, username) => {
    const fragment = document.createDocumentFragment()
    const { cloneNewChat } = createNewChatContainer()
    const newChat = cloneNewChat
    newChat.id = userId

    const newChatChildren = newChat.children

    const newChatId = newChatChildren[0]
    newChatId.innerText = userId

    const newChatProfilePic = newChatChildren[1]

    const newUserImg = newChatProfilePic.children[0]
    newUserImg.src = "../public/img/loginsignup.png"

    const newChatName = newChatChildren[2]
    newChatName.innerText = username

    return fragment.appendChild(newChat)


}

function createNewChatContainer() {
    const newChat = document.createElement("a")
    newChat.href = "#"
    newChat.className = "new-chat"

    const newChatId = document.createElement("section")
    newChatId.className = "new-chat-id"
    newChatId.hidden = true

    const newChatProfilePic = document.createElement("section")
    newChatProfilePic.className = "new-chat-profile-pic"

    const newUserImg = document.createElement("img")
    newChatProfilePic.appendChild(newUserImg)

    const newChatName = document.createElement("section")
    newChatName.className = "new-chat-name"

    newChat.append(newChatId, newChatProfilePic, newChatName)
    const cloneNewChat = newChat.cloneNode(true)

    return {
        cloneNewChat
    }
}


const groups = () => {
    const groupChatText = document.createElement("section")
    groupChatText.className = "group-chat-text"
    groupChatText.textContent = "Groups"
    groupsSection.appendChild(groupChatText)
    const group = document.createElement("a")
    group.className = "group"
    const cloneGroup = group.cloneNode()

    const groupId = document.createElement("section")
    groupId.className = "group-id"
    const cloneGroupId = groupId.cloneNode()

    const groupProfilePic = document.createElement("section")
    groupProfilePic.className = "group-profile-pic"
    const cloneGroupProfilePic = groupProfilePic.cloneNode()

    const groupImg = document.createElement("img")
    const cloneGroupImg = groupImg.cloneNode()

    cloneGroupProfilePic.appendChild(cloneGroupImg)

    const groupName = document.createElement("section")
    groupName.className = "group-name"

    const cloneGroupName = groupName.cloneNode()

    const groupLastMessage = document.createElement("section")
    groupLastMessage.className = "group-last-message"

    const cloneGroupLastMessage = groupLastMessage.cloneNode()

    const groupLastMessageTime = document.createElement("section")

    groupLastMessageTime.className = "group-last-message-time"

    const cloneGroupLastMessageTime = groupLastMessageTime.cloneNode()

    group(cloneGroupId, cloneGroupProfilePic, cloneGroupName, cloneGroupLastMessage, cloneGroupLastMessageTime)

    return group
}


function selectedChannel(chatName, userId, channelId) {
    if (channelId) {
        selectedChannelChannelId.textContent = channelId
    }
    if (userId) {
        selectedChannelUserId.textContent = userId
    }
    //? from the controller.js
    selectedChannelName.textContent = chatName
    selectedChannelInfo.style.visibility = "visible"

    //make the send button and input visible
    sendMessageArea.style.visibility = "visible"

    //removes it the messages class element ! from the index.js
    channelSelect.remove()
}

function userOnlineStatus(socket) {

    socket.on(userEvents.status, (data) => {
        selectedChannelStatus.innerText = ""
        const { userId, status } = data
        const lastSeen = Date.parse(status)
        if (selectedChannelUserId.innerText == userId) {

            if (isNaN(lastSeen)) {
                selectedChannelStatus.innerText = status
            } else {
                const lastSeenDate = compareDate(status)
                selectedChannelStatus.innerText = lastSeenDate
            }
        }
    })
}

function askUserStatus(socket, userId) {
    socket.emit(userEvents.status, userId)
}
function prependToChatPanel(channelId) {
    const chat = document.getElementById(channelId)
    const chatParent = chat.parentElement
    if (chatParent.firstChild.id != channelId) {
        chatParent.insertBefore(chat, chatParent.firstChild)
    }
}