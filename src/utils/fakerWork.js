import {faker} from '@faker-js/faker'
 function Chats() {
  return {
    channelInfo:{
        channelId:faker.database.mongodbObjectId()
    },
    userInfo:{
        userId: faker.database.mongodbObjectId(),
        avatarUrl: faker.internet.avatar(),
        username: faker.internet.userName()
    },
    messageInfo:{
        createdAt:faker.date.future(),
        lastMessage: faker.lorem.paragraph({min: 1, max: 5})
    }
  };
}

export const CHATS = faker.helpers.multiple(Chats, {
  count:20
})

function PersonInfo (){
  return {
  
      username: faker.internet.userName(),
      avatarUrl: faker.internet.avatar(),
      onlineStatus: faker.date.future()
    }
}

export default PersonInfo
