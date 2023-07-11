const chatsPanel = document.querySelector(".chats")

const selectedChannelName = document.querySelector(".selected-channel-name")
const selectedChannelStatus = document.querySelector(".selected-channel-status")
const selectedChannelInfo = document.querySelector(".selected-channel-info")
const selectedChannelUserId = document.querySelector(".user-id")

window.addEventListener("DOMContentLoaded", (e) => {
    searchTextBox.focus()
})




window.addEventListener("load", (e) => {
    HideSelectedChannel()
})

function HideSelectedChannel(){
    selectedChannelName.textContent = "Select a message"
    selectedChannelStatus.textContent = ""
    selectedChannelInfo.style.visibility = "hidden"
    sendMessageArea.style.visibility = "visible"
}






/*
TODO:
1. make the chat panel load from the api
2. search messages and new contacts
3. click on a channel, display name, return last fifty messages 
4. send message to a specific channel.
5. make window load, if localStorage (youandItoken) is not empty or invalid, display text, sign up  and login button

*/