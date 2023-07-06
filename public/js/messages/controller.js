
const chatsPanel = document.querySelector(".chats")

const sendMessageTextBox = document.getElementById("textbox")
const sendMessageBtn = document.getElementById("submit")



const selectedChannelName = document.querySelector(".selected-channel-name")
const selectedChannelStatus = document.querySelector(".selected-channel-status")
const selectedChannelInfo = document.querySelector(".selected-channel-info")

window.addEventListener("DOMContentLoaded", (e) => {
    searchTextBox.focus()
})




window.addEventListener("load", (e) => {
    chatsPanel.innerHTML = "No Chats"
    selectedChannelName.textContent = "Select a message"
    selectedChannelStatus.textContent = ""
    selectedChannelInfo.style.visibility = "hidden"
})


sendMessageBtn.addEventListener("click", (e) => {
    e.preventDefault()
    let message = sendMessageTextBox

    if (message.value != "") {
        // emit message,channel, sender
    }
    message.value = ""

})



/*
TODO:
1. make the chat panel load from the api
2. search messages and new contacts
3. click on a channel, display name, return last fifty messages 
4. send message to a specific channel.
5. make window load, if localStorage (youandItoken) is not empty or invalid, display text, sign up  and login button

*/