import { combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from 'redux-persist'
import  storage from 'redux-persist/lib/storage'
import userReducer from "./userSlice";
import chatReducer from "./chatSlice";

const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist:['user','chat']
}
const persistedReducer = persistReducer(persistConfig,rootReducer)

export default persistedReducer