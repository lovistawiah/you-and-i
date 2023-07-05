const searchTextBox = document.getElementById("search-textbox")

const newContactsSection = document.querySelector(".new-contacts")
const groupsSection = document.querySelector(".groups")
const chatsPanel = document.querySelector(".chats")

const sendMessageTextBox = document.getElementById("textbox")
const sendMessageBtn = document.getElementById("submit")

const chatMessages = document.querySelector(".chat-messages")

const selectedChannelName = document.querySelector(".selected-channel-name")
const selectedChannelStatus = document.querySelector(".selected-channel-status")
const selectedChannelInfo = document.querySelector(".selected-channel-info")

window.addEventListener("DOMContentLoaded", (e) => {
    searchTextBox.focus()
})




window.addEventListener("load", (e) => {
    // chatsPanel.innerHTML = "No Chats"
    selectedChannelName.textContent = "Select a message"
    selectedChannelStatus.textContent = ""
    selectedChannelInfo.style.visibility = "hidden"

    displayClickedChannelData()
    displayNewContacts()
    displayGroups()
})

searchTextBox.addEventListener("keyup", (e) => {
    const textboxValue = searchTextBox.value.trim()

    if (textboxValue == "") {
        newContactsSection.style.display = "none"
        groupsSection.style.display = "none"
    } else {
        newContactsSection.style.display = "block"
        groupsSection.style.display = "block"
    }
})


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

function displayNewContacts() {
    if (searchTextBox.value != "" && newContactsSection.innerHTML != "") {
        newContactsSection.addEventListener("click", (e) => {
            const newContact = e.target
            console.log(newContact)
        })
    }

}

function displayGroups() {

    if (searchTextBox.value != "" && groupsSection.innerHTML != "") {
        groupsSection.addEventListener("click", (e) => {
            const group = e.target
            console.log(group)
        })
    }

}



sendMessageBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let message = sendMessageTextBox

    if (message.value != "") {
        // emit message,channel, sender
    }
    message.value = ""

})



