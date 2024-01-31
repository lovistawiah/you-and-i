import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import  chatsReducer  from "./chatsSlice";

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    chats: chatsReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist:['user','chat','chats']
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export default persistedReducer