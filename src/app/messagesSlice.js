import {createSlice} from '@reduxjs/toolkit'

export const messageReducer = createSlice({
    name:"messages",
    initialState:{
        messages: []
    },
    reducers:{
        addMessage:(state,action)=>{
            const { payload: message } =action
            const msgExist = state.messages.some((msg)=> msg.Id === message.Id)
            if(!msgExist){
                state.messages.push(message)
            }
        }
    }
})

export const {addMessage} = messageReducer.actions
export default messageReducer.reducer