const searchTextBox = document.getElementById("search-textbox")
const chatMessages = document.querySelector(".chat-messages")
const newContactsSection = document.querySelector(".new-contacts")
const groupsSection = document.querySelector(".groups")

const channelEvents = {
    displayMessages: "displayMessages",
    addNewChat: "addNewChat",
    search: "search",
    displayNewChats: "displayNewChats"
}

const displayNewChats = (socket) => {
    socket.on(channelEvents.displayNewChats, (data) => {
        console.log(data)
    })
}
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
        selectedChannelName.textContent = chatName
        selectedChannelStatus.textContent = "online"
        selectedChannelInfo.style.visibility = "visible"
    })

}

// in the css, make the rest add the .user-active class when clicked
function displayNewContacts(socket) {
    socket.on(channelEvents.displayNewChats, (data) => {
        console.log(data)
        addNewChats(data)
        if (searchTextBox.value != "" && newContactsSection.children.length > 1) {
            newContactsSection.addEventListener("click", (e) => {
                const newContact = e.target
                console.log(newContact)
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



const oldChats = () => {
    const newChat = document.createElement("a")
    newChat.href = "#"
    newChat.className = "chat"
    const cloneNewChat = newChat.cloneNode()

    const newChatId = document.createElement("section")
    newChatId.className = "new-chat-id"
    const cloneNewChatId = newChatId.cloneNode()

    const userChatPic = document.createElement("section")
    userChatPic.className = "user-chat-pic"
    const cloneUserChatPic = userChatPic.cloneNode()

    const userImg = document.createElement("img")
    userImg.src = ""
    const cloneUserImg = userImg.cloneNode()
    cloneUserChatPic.appendChild(userImg)


    const userName = document.createElement("section")
    userName.className = "chat-username"
    const cloneUserName = userName.cloneNode()

    const chatLastMessage = document.createElement("section")
    chatLastMessage.className = "chat-last-message"
    const cloneChatLastMessage = chatLastMessage.cloneNode()


    const chatTime = document.createElement("section")
    chatTime.className = "chat-time"
    const cloneChatTime = chatTime

    newChat.appendChild(cloneNewChatId, cloneUserChatPic, cloneUserName, cloneChatLastMessage, cloneChatTime)

    return newChat
}


const addNewChats = (newChats) => {
    const newChat = document.createElement("a")
    newChat.href = "#"

    const newChatId = document.createElement("section")
    newChatId.className = "new-chat-id"
    newChatId.hidden = true

    const newChatProfilePic = document.createElement("section")
    newChatProfilePic.className = "new-chat-profile-pic"

    const newUserImg = document.createElement("img")

    const newChatName = document.createElement("section")
    newChatName.className = "new-chat-name"

    for (let newUser of newChats) {
        const cloneNewChat = newChat.cloneNode()
        const cloneNewChatId = newChatId.cloneNode()
        cloneNewChatId.textContent = newUser._id

        const cloneNewChatProfilePic = newChatProfilePic.cloneNode()
        const cloneNewUserImg = newUserImg.cloneNode()
        cloneNewUserImg.src = "../public/img/loginsignup.png"
        cloneNewChatProfilePic.appendChild(cloneNewUserImg)

        const cloneNewChatName = newChatName.cloneNode()
        cloneNewChat.appendChild(cloneNewChatId, cloneNewChatProfilePic, cloneNewChatProfilePic, cloneNewChatName)

        newContactsSection.appendChild(cloneNewChat)
    }

}

const groups = () => {
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