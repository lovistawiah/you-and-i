const selectedChannelName = document.querySelector(".selected-channel-name")
const selectedChannelStatus = document.querySelector(".selected-channel-status")
const selectedChannelInfo = document.querySelector(".selected-channel-info")
const selectedChannelUserId = document.querySelector(".user-id")
const selectedChannelChannelId = document.querySelector(".channel-id")

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

function clearSelectedChannel() {
    selectedChannelName.textContent = ""
    selectedChannelStatus.textContent = ""
    selectedChannelUserId.textContent = ""
    selectedChannelChannelId.textContent = ""
}
