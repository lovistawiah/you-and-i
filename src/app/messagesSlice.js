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
        },
        updateMessage: (state,action) =>{
            const {payload} = action
            const idx = state.messages.findIndex((message)=> message.Id ===payload.Id)
            if(idx !== -1){
                state.messages[idx] = payload
            }
        }
        
    }
    
})

export const {addMessage,updateMessage} = messageReducer.actions
export default messageReducer.reducer