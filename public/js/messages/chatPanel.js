const searchTextBox = document.getElementById("search-textbox")
const chatsSubPanel = document.querySelector(".chats-sub-panel")
const chatMessages = document.querySelector(".chat-messages")
const groupsSection = document.querySelector(".groups")
//copy the active user info
let activeUser

//the new contacts 
const newContacts = document.createElement("section")
newContacts.className = "new-contacts"

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


displayClickedChannelData()


// ? not appearing on the web page.
const searchMessageOrNewContact = (socket) => {
    searchTextBox.addEventListener("keyup", (e) => {
        // clear the neContacts page first before appending
        const textboxValue = searchTextBox.value
        newContacts.innerHTML = ""

        if (textboxValue == "") {
            newContacts.innerHTML = ""
            groupsSection.innerHTML = ""
        } else {
            socket.emit(channelEvents.search, textboxValue)

            if (newContacts.children.length > 1) {
                newContacts.style.display = "block"
            }

            if (groupsSection.children.length > 1) {
                groupsSection.style.display = "block"
            }
        }
    })

}



function displayClickedChannelData() {
    chatMessages.addEventListener("click", (e) => {
        const allChats = document.querySelectorAll(".chat")
        allChats.forEach(chatItem => {
            chatItem.classList.remove("chat-active")
        })
        const chat = e.target
        const parentElement = chat.parentElement
        if (parentElement.className == "chat-messages") {
            chat.classList.add("chat-active")

            activeUser = chat

            const channelId = chat.children[0].innerText
            const userId = chat.children[1].innerText
            //getting the third child element. thus, the select channel name
            const chatName = chat.children[3].innerText
            //when a channel is selected, emitted and received from the 

            selectedChannel(chatName, "online",userId)
            socket.emit(messageEvents.displayChannelAllMessages, channelId)
        }
        console.log(chat)

    })

}

// in the css, make the rest add the .user-active class when clicked
function displayNewContacts(socket) {
    socket.on(channelEvents.displayNewChats, (data) => {

        if (data.length >= 1) {
            addNewChats(data)
            if (searchTextBox.value != "" && newContacts.children.length > 1) {
                newContacts.addEventListener("click", (e) => {
                    const newContact = e.target
                    newContact.classList.add("chat-active")
                    const newChatName = newContact.children[2].innerText
                    selectedChannel(newChatName, "online")
                })
            }
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
    const fragment = document.createDocumentFragment()
    const { chat,userIdText ,chatId, userImg, userChatPic, chatLastMessage, userName, chatTime } = createOldChatContainer()
    socket.on(channelEvents.channelAndLastMessage, (data) => {
        chatMessages.innerHTML = ""
        if (data && data.length > 0) {
            for (let channelAndLastMessage of data) {
                const { userInfo, lastMessage } = channelAndLastMessage
                const {userId, username } = userInfo
                const { channelId, createdAt, message } = lastMessage

                const cloneChat = chat.cloneNode()
                const cloneChatId = chatId.cloneNode()
                cloneChatId.textContent = channelId

                const cloneUserIdText  = userIdText.cloneNode()
                cloneUserIdText.textContent = userId

                const cloneUserChatPic = userChatPic.cloneNode()
                cloneUserChatPic.appendChild(userImg)

                const cloneUserName = userName.cloneNode()
                cloneUserName.textContent = username

                const cloneChatLastMessage = chatLastMessage.cloneNode()
                cloneChatLastMessage.textContent = message

                const cloneChatTime = chatTime.cloneNode()
                //function from compareDate.js
                cloneChatTime.textContent = chatOrMessageTime(createdAt)

                cloneChat.append(cloneChatId,cloneUserIdText, cloneUserChatPic, cloneUserName, cloneChatLastMessage, cloneChatTime)
                fragment.appendChild(cloneChat)
            }

        }
        chatMessages.appendChild(fragment)
    })
}


const addNewChats = (newChats) => {
    const fragment = document.createDocumentFragment()
    const { newChatText, newChat, newChatId, newChatProfilePic, newUserImg, newChatName } = createNewChatContainer()

    if (newChats.length > 0) {
        newContacts.innerHTML = ""
        newContacts.appendChild(newChatText)

        for (let newUser of newChats) {
            const cloneNewChat = newChat.cloneNode()
            const cloneNewChatId = newChatId.cloneNode()
            cloneNewChatId.textContent = newUser.userId

            const cloneNewChatProfilePic = newChatProfilePic.cloneNode()
            const cloneNewUserImg = newUserImg.cloneNode()
            cloneNewUserImg.src = "../public/img/loginsignup.png"
            cloneNewChatProfilePic.appendChild(cloneNewUserImg)

            const cloneNewChatName = newChatName.cloneNode()
            cloneNewChatName.textContent = newUser.username
            cloneNewChat.append(cloneNewChatId, cloneNewChatProfilePic, cloneNewChatProfilePic, cloneNewChatName)
            fragment.appendChild(cloneNewChat)
        }
        newContacts.style.display = "block"
    } else {
        newContacts.style.display = "none"
    }
    newContacts.appendChild(fragment)
    chatsSubPanel.appendChild(newContacts)
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


function selectedChannel(chatName, onlineStatus,userId) {
    if (chatName && onlineStatus && userId) {
        //? from the controller.js
        selectedChannelUserId.textContent = userId
        selectedChannelName.textContent = chatName
        selectedChannelStatus.textContent = onlineStatus
        selectedChannelInfo.style.visibility = "visible"
        //make the send button and input visible
        sendMessageArea.style.visibility = "visible"

        //removes it the messages class element ! from the index.js
        channelSelect.remove()
    }

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
    userImg.src = "../public/img/signup-image.jpeg"
    userChatPic.appendChild(userImg)
    userName.className = "chat-username"
    chatLastMessage.className = "chat-last-message"
    chatTime.className = "chat-time"
    return {
        chat,
        chatId,
        userIdText,
        userChatPic,
        userImg,
        userName,
        chatLastMessage,
        chatTime
    }
}



function createNewChatContainer() {
    const newChatText = document.createElement("section")
    newChatText.className = "new-chat-text"
    newChatText.textContent = "New Contacts"

    const newChat = document.createElement("a")
    // newChat.href = "#"
    newChat.className = "new-chat"

    const newChatId = document.createElement("section")
    newChatId.className = "new-chat-id"
    newChatId.hidden = true

    const newChatProfilePic = document.createElement("section")
    newChatProfilePic.className = "new-chat-profile-pic"

    const newUserImg = document.createElement("img")

    const newChatName = document.createElement("section")
    newChatName.className = "new-chat-name"

    return {
        newChatText,
        newChat,
        newChatId,
        newChatProfilePic,
        newUserImg,
        newChatName
    }
}

function userStatus(socket) {
    socket.on(userEvents.status, (data) => {
        console.log(data)
    })
}


// FIXME: when you query from the database and the value is not in the database do not return the appended element before clearing.