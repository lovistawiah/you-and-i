# LOGIN

username or email
password
telephone to authenticate with code

--Backened--
GET /api/login should render the login page
POST /api/login should authenticate the user if successful, send json object {message, userInfo:{userId,username},token}

--Frontend---
send username or email
send password
if successful, receive {message,userInfo,token}
set token in localStorage
set userInfo as cookie

# SIGNUP

first name
last name
username
gender
email
telephone
password
confirm password

Backened
--------
GET /api/signup should render the sign up page
POST /api/signup accept all userInfo from req.body, authenticate, if successful send message ok

Frontend
--------
all inputs must be filled
send to the server and authenticate
store the token in the localStorage, userInfo in the cookie or useful methods, so it can be exported or extracted in a different way.

# CHANNEL
* private channel:
 - Id 
 - channelName
 - dateCreated
 - dateUpdated
 - bio
 - avatar || profile pic type: buffer

 * group channel
  - Id
  - channelName
  - dateCreated
  - dateUpdated
  - members
  // future use
  - admins: [users]
  - roles:[
    - user
    - [super, editor, reader, just]
  ]
  - avatar || profile pic type: buffer 

create a private and public channel schema
create a channelSchema add private and public channel to it




Backened
-------
GET /api/channel/userChannel  
POST /api/channel should add a friend or add group chat later in the future
DELETE /api/channel should not delete but hide it from them, setting isDeleted:true in the Database.

when requesting for channel if channel name is empty do not append to the document

Frontend
-------
GET /api/channel/:



# MESSAGES
channelId
sender: should be logged in user
messages:{
id
content
reaction
isDeleted: default false
}

channel should be group name or username
if sender display left

Backened
-------
GET /api/messages should authenticate user using token from the localStorage
the params should be the UserId from the login or the cookie set

POST /api/messages should post the message to server with this info{
userId,
message,
channelId
}

Frontend
--------
{
channel id,
channel name,
senderId
messages [
{
content,
reaction,
time
date
}
]
}

display sender messages to the left.
create a new div when messages time does not exist, append to the div using date as div.
