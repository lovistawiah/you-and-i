import {createSlice} from '@reduxjs/toolkit'

export const messageReducer = createSlice({
    name:"messages",
    initialState:{
        messages: [],
        msgToBeUpdated : null,
        updateMsg: false
    },
    reducers:{
        addMessage:(state,action)=>{
            const { payload: message } =action
            const msgExist = state.messages.some((msg)=> msg.Id === message.Id)
            if(!msgExist){
                state.messages.push(message)
            }
        },
        modifyMsg: (state,action) =>{
            const {payload} = action
            const idx = state.messages.findIndex((message)=> message.Id ===payload.Id)
            if(idx !== -1){
                state.messages[idx] = payload
            }
        },
        updateSingleMsg: (state,action)=>{
            const {payload:msgObj} = action
            state.msgToBeUpdated = msgObj
            state.updateMsg = true
        },
        cancelUpdate: (state) =>{
            state.updateMsg = false
            state.msgToBeUpdated = null
        }
    }
    
})

export const {addMessage,modifyMsg,updateSingleMsg,cancelUpdate} = messageReducer.actions
export default messageReducer.reducer