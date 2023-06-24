var socket = io()
//from localstorage
const token = checkToken()


const addNewFriendBtn = document.getElementById("add-friend")
const chatAndLastMessagePanel = document.querySelector(".channel-panel")

//for appending user and last message to the channel panel
const user = document.querySelector(".user-chat")
const channel = document.querySelector(".channel-Id")
const userProfiles = document.querySelector(".user-profile")
const userImg = document.querySelector(".user-img img")
const userNameAndTime = document.querySelector(".username-time")
const lastMessage = document.querySelector(".last-message")
const username = document.querySelector(".username")
const time = document.querySelector(".time")


window.addEventListener("DOMContentLoaded", (e) => {
    getChannels(token)
})

// addNewFriendBtn.addEventListener("click", (e) => {
//     console.log("click")
//     chatAndLastMessagePanel.style.display = 'none'

// })



/*
TODO:
1. get the chat panel elements --- DONE:
2. query out the users in the database --DONE: 
3. able to send and receive message instantly
4. add friends
5. send message to specific channel. 
6. make set userId as nickname 
7. create rooms 
8. make all the html documents not highlighted

*/

/*
FIXME: only querySelectorAll when want to select a particular channel
learn how to use document.createDocumentFragment()
query all messages for the user and the channel
*/







function appendUserChannelData(userName, messageTime, message, channelId) {
    channel.innerText = channelId
    userImg.setAttribute('src', '../img/loginsignup.png')
    username.innerText = userName
    time.innerText = messageTime
    userNameAndTime.append(username, time)
    lastMessage.innerText = message
    userProfiles.append(userNameAndTime, lastMessage)
    console.log(userProfiles)
    user.append(userProfiles)
    chatAndLastMessagePanel.append(user)
}

async function getChannels(token) {
    try {
        const res = await axios.get('/channels', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const { data } = res
        if (res.status == 200 && data.message == 'ok') {
            const { userNameAndLastMessage } = data
            if (userNameAndLastMessage.length == 0) {

                chatAndLastMessagePanel.innerText = "No Chats"
                chatAndLastMessagePanel.style.textAlign = "center"
                chatAndLastMessagePanel.style.display = "block"
                return
            }

            for (item of userNameAndLastMessage) {
                const { userName, lastMessage } = item
                //formatting date and time 
                const date = new Date(lastMessage.createdAt)
                let amOrPm
                let hours = date.getHours()
                const minutes = date.getMinutes()

                amOrPm = hours >= 12 ? 'pm' : 'am'

                if (hours >= 12) {
                    hours = Math.floor(hours / 12)
                }

                const messageTime = `${hours}:${minutes} ${amOrPm}`
                appendUserChannelData(userName, messageTime, lastMessage.message, lastMessage.channelId)
                chatAndLastMessagePanel.style.display = "block"
            }
        }
    } catch (err) {
        console.log(err)
    }

}

// async function getAllUsers() {

// }
