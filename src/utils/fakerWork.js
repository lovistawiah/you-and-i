import {faker} from '@faker-js/faker'
 function Chats() {
  return {
    channelInfo:{
        channelId:faker.database.mongodbObjectId()
    },
    userInfo:{
        userId: faker.database.mongodbObjectId(),
        avatarUrl: faker.internet.avatar(),
        username: faker.internet.userName(),
        onlineStatus: faker.internet.userName().length > 10 ? "online" : new Date(faker.date.future()).toDateString()
    },
    messageInfo:{
        createdAt:faker.date.future(),
        lastMessage: faker.lorem.paragraph({min: 1, max: 5})
    }
  };
}

export const CHATS = faker.helpers.multiple(Chats, {
  count:100
})

function PersonInfo (){
  return {
      id:faker.database.mongodbObjectId(),
      username: faker.internet.userName(),
      avatarUrl: faker.internet.avatar(),
    }
}

const NEW_CONTACTS  = faker.helpers.multiple(PersonInfo,{
  count: 100
})
export default NEW_CONTACTS

export function LoggedInUser(){
  return {
    avatarUrl: faker.internet.avatar()
  }
}
