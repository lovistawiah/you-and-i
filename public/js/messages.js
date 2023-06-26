var socket = io()
//from localstorage
const token = checkToken()



const addNewFriendBtn = document.getElementById("add-friend")
const chatAndLastMessagePanel = document.querySelector(".channel-panel")

//for appending user and last message to the channel panel



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

    /*
    within the div with className = user-chat,

    has one grid div with className = user-profile
    within the user-profile div 

    has three divs with classNames =user-img, username-time, last-message,
    the user-img div has img

    And the username-time has h4 tag with username as className, and div with time as className
    
    */
    const channel = document.createElement("div")
    channel.className = "channel-Id"

    const user = document.createElement("div")
    user.className = "user-chat"

    const userProfile = document.createElement("div")
    userProfile.className = "user-profile"

    const userImg = document.createElement("div")
    userImg.className = "user-img"

    const img = document.createElement("img")

    const userNameAndTime = document.createElement("div")
    userNameAndTime.className = "username-time"

    const username = document.createElement("h4")
    username.className = "username"

    const time = document.createElement("div")
    time.className = "time"

    const lastMessage = document.createElement("div")
    lastMessage.className = "last-message"


    channel.innerText = channelId
    img.setAttribute('src', '../img/loginsignup.png')
    userImg.append(img)
    username.innerText = userName
    time.innerText = messageTime
    userNameAndTime.append(username, time)
    lastMessage.innerText = message
    userProfile.append(userNameAndTime, userImg, lastMessage)
    user.append(userProfile)
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
