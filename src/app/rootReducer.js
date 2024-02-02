import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'

import userReducer from "./userSlice";
import chatReducer from "./chatSlice";
import  chatsReducer  from "./chatsSlice";
import contactsReducer from "./contactsSlice";

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    chats: chatsReducer,
    contacts: contactsReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist:['user']
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export default persistedReducer