var socket = io()
const addNewFriendBtn = document.getElementById("add-friend")
const chatAndLastMessagePanel = document.getElementById("chat-panel")

/*
TODO:
1. get the chat panel elements 
2. query out the users in the database
3. able to send and receive message instantly
4. add friends
5. send message to specific channel. 
6. make set userId as nickname 
7. create rooms 

*/


addNewFriendBtn.addEventListener("click", (e) => {
    console.log("click")
    chatAndLastMessagePanel.style.display = 'none'
    
})



// async function getUserInfo() {
//     const token = checkToken()
//     let userNameAndLastMessage
//     if (token) {
//         const res = await axios.get('/channels', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         if (res.status == 200 && res.data.message == 'ok') {
//             console.log(res.data)
//             userNameAndLastMessage = res.data.userNameAndLastMessage
//         }
//     }
//     return
// }
// getUserInfo()


