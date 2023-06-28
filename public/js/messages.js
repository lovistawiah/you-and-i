var socket = io()
//from localstorage
const token = checkToken()


const addNewFriendBtn = document.getElementById("add-friend")
const chats = document.querySelector(".chats")
const closeFriendPanel = document.querySelector(".close-friend-panel")

//for appending user and last message to the channel panel



window.addEventListener("DOMContentLoaded", (e) => {
    getChannels(token)
    newFriends(token)
})

addNewFriendBtn.addEventListener("click", (e) => {
    const imgAttr = addNewFriendBtn.attributes.getNamedItem('src').value
    if (imgAttr.includes("add")) {
        console.log("in here")
        addNewFriendBtn.setAttribute("src", "../svg/close-button.svg")
        chats.style.display = 'none'
        // newFriendsPage.style.display = "flex"
        //make addFriendsPanel visible 

    } else {
        addNewFriendBtn.setAttribute("src", "../svg/add-button.svg")
        chats.style.display = 'block'
        // newFriendsPage.style.display = "none"
    }
})

/*
TODO:

? using the on change method of the search box to achieve the chats and new chats page.
selecting a specific channel (active channel)
send and receive message
offline and online indicator 
the person online before going offline, save the document
search messages, sort by latest date in the api 
use multiple io 
*/

/*
add button should change close button 
*/

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
    chats.append(user)
}

function addMessages() {
    const messagesBox = document.createElement("div")
    messagesBox.className = "messages-box"

    const date = document.createElement("div")
    date.className = "date"

    const messages = document.createElement("div")
    messages.className = "messages"

    // add sender class to classList if sender Id == req.user.userId
    const message = document.createElement("div")
    message.classList.add(["message"])

    const messageId = document.createElement("div")
    messageId.className = "message-id"

    const groupUsername = document.createElement("div")
    groupUsername.className = "group-username"

    const messageContent = document.createElement("div")
    messageContent.className = "message-content"

    const messageTime = document.createElement("div")
    messageTime.className = "message-time"

    const timeP = document.createElement("p")
    timeP


}


function newFriendsPanel(id, newFriendName) {
    const addFriend = document.createElement("div")
    addFriend.className = "users-add"
    //making it visible
    addFriend.style.display = "flex"

    const friendId = document.createElement("div")
    friendId.className = "id"

    const friendUserImg = document.createElement("div")
    friendUserImg.className = "to-user-img"

    const img = document.createElement("img")
    img.setAttribute("src", "../img/loginsignup.png")

    friendUserImg.append(img)

    const toBeFriendName = document.createElement("div")

    toBeFriendName.className = "to-be-added-user"

    toBeFriendName.innerText = newFriendName
    friendId.innerText = id
    addFriend.append(friendId, friendUserImg, toBeFriendName)

}


// todo: query and append messages.
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
                chats.innerText = "No Chats"
                chats.style.textAlign = "center"
                chats.style.display = "block"
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
                chats.style.display = "block"
            }
        }
    } catch (err) {
        console.log(err)
    }

}

async function newFriends(token) {
    const res = await axios.get('/new-friends', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const { data } = res
    const newFriends = data.newFriendsList
    for (let newFriend of newFriends) {
        console.log(newFriend._id, newFriend.username)
        newFriendsPanel(newFriend._id, newFriend.username)
    }
}