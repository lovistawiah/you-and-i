import { createSlice } from "@reduxjs/toolkit";
import { lastSeen } from "../utils/compareDate";

export type ChatValue = {
  userId: string,
  id?: string,
  username: string,
  status: string
  avatarUrl: string
}
export interface ChatState {
  value: ChatValue
}

export type SelectedChat = {
  userId: string,
  id: string
  avatarUrl: string,
  username: string
}

const initialState: ChatState = {
  value: null
}

export const chatReducer = createSlice({
  name: "chat",
  initialState
  ,
  reducers: {
    setChatInfo: (state, action) => {
      state.value = null;
      state.value = action.payload as ChatValue;
    },
    updateStatus: (state, action) => {
      const { userId, status } = action.payload as ChatValue;
      if (state.value !== null) {
        if (state.value?.userId === userId && status) {
          state.value.status = lastSeen(status)
        }
      }
    },

    updateNewChat: (state, action) => {
      const { chatId, userId } = action.payload as ChatValue;

      if (userId) {
        if (state.value?.userId === userId && !state.value.chatId) {
          state.value.chatId = chatId;
        }
      }
    },
  },
});

export const { setChatInfo, updateStatus, updateNewChat } = chatReducer.actions;
export default chatReducer.reducer;
