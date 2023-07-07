const searchTextBox = document.getElementById("search-textbox")
const chatMessages = document.querySelector(".chat-messages")
const newContactsSection = document.querySelector(".new-contacts")
const groupsSection = document.querySelector(".groups")

const sendMessageArea = document.querySelector(".send-message")

const channelEvents = {
    channelAndLastMessage: "channelAndLastMessage",
    addNewChat: "addNewChat",
    search: "search",
    displayNewChats: "displayNewChats"
}

displayClickedChannelData()


// ? not appearing on the web page.
const searchMessageOrNewContact = (socket) => {
    searchTextBox.addEventListener("keyup", (e) => {
        const textboxValue = searchTextBox.value.trim()

        if (textboxValue == "") {
            newContactsSection.style.display = "none"
            groupsSection.style.display = "none"
        } else {
            console.log(textboxValue)
            socket.emit(channelEvents.search, textboxValue)

            if (newContactsSection.children.length > 1) {
                newContactsSection.style.display = "block"
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
        chat.classList.add("chat-active")
        //getting the second child element. thus, the select channel name
        const chatName = chat.children[2].innerText

        //when a channel is selected, emitted and received from the api
        selectedChannel(chatName, "online")


    })

}

// in the css, make the rest add the .user-active class when clicked
function displayNewContacts(socket) {
    socket.on(channelEvents.displayNewChats, (data) => {
        addNewChats(data)
        if (searchTextBox.value != "" && newContactsSection.children.length > 1) {
            newContactsSection.addEventListener("click", (e) => {
                const newContact = e.target
                newContact.classList.add("chat-active")
                const newChatName = newContact.children[2].innerText
                selectedChannel(newChatName, "online")
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
    const chat = document.createElement("a")
    const chatId = document.createElement("section")
    const userChatPic = document.createElement("section")
    const userImg = document.createElement("img")
    const userName = document.createElement("section")
    const chatLastMessage = document.createElement("section")
    const chatTime = document.createElement("section")


    chat.href = "#"
    chat.className = "chat"
    chatId.className = "new-chat-id"
    chatId.hidden = true
    userChatPic.className = "user-chat-pic"
    userImg.src = "../public/img/signup-image.jpeg"
    userChatPic.appendChild(userImg)
    userName.className = "chat-username"
    chatLastMessage.className = "chat-last-message"
    chatTime.className = "chat-time"


    socket.on(channelEvents.channelAndLastMessage, (data) => {
        chatMessages.innerHTML = ""
        if (data && data.length > 0) {
            for (let channelAndLastMessage of data) {
                const { username, lastMessage } = channelAndLastMessage

                const cloneChat = chat.cloneNode()
                const cloneChatId = chatId.cloneNode()
                cloneChatId.textContent = lastMessage.channelId

                const cloneUserChatPic = userChatPic.cloneNode()
                cloneUserChatPic.appendChild(userImg)

                const cloneUserName = userName.cloneNode()
                cloneUserName.textContent = username

                const cloneChatLastMessage = chatLastMessage.cloneNode()
                cloneChatLastMessage.textContent = lastMessage.message

                const cloneChatTime = chatTime.cloneNode()
                cloneChatTime.textContent = selectedChannelDate(lastMessage.createdAt)

                cloneChat.append(cloneChatId, cloneUserChatPic, cloneUserName, cloneChatLastMessage, cloneChatTime)
                chatMessages.appendChild(cloneChat)

            }

        }

    })
}


const addNewChats = (newChats) => {
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
    console.log(newChats)
    if (newChats.length > 0) {
        newContactsSection.innerHTML = ""
        newContactsSection.appendChild(newChatText)

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
            newContactsSection.append(cloneNewChat)
            console.log(newContactsSection)
        }

        newContactsSection.style.display = "block"
    } else {
        newContactsSection.style.display = "none"
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


function selectedChannel(chatName, onlineStatus) {
    if (chatName && onlineStatus) {
        selectedChannelName.textContent = chatName
        selectedChannelStatus.textContent = onlineStatus
        selectedChannelInfo.style.visibility = "visible"
        //make the send button and input visible
        sendMessageArea.style.visibility = "visible"
        //removes it the messages class element ! from the index.js
        channelSelect.remove()
    }

}


// FIXME: when you query from the database and the value is not in the database do not return the appended element before clearing.