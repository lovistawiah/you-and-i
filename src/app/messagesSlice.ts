import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message, MessagesState, MsgToBeReplied, MsgToBeUpdated } from "../interface/app/messagesSlice";

const initialState: MessagesState = {
  messages: [],
  msgToBeUpdated: null,
  updateMsg: false,
  msgToBeReplied: null,
}
export const messageReducer = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const { payload: message } = action;
      const msgExist = state.messages.some((msg) => msg.Id === message.Id);
      if (!msgExist) {
        state.messages.push(message);
      }
    },

    modifyMsg: (state, action: PayloadAction<Message>) => {
      const { payload } = action;
      const idx = state.messages.findIndex(
        (message) => message.Id === payload.Id,
      );
      if (idx !== -1) {
        state.messages[idx] = payload;
      }
    },

    updateSingleMsg: (state, action: PayloadAction<MsgToBeUpdated>) => {
      const { payload: msgObj } = action;
      state.msgToBeUpdated = msgObj;
      state.updateMsg = true;
    },

    cancelUpdate: (state) => {
      state.updateMsg = false;
      state.msgToBeUpdated = null;
    },

    clearMessages: (state) => {
      state.messages = [];
    },
    replyMessage: (state, action: PayloadAction<MsgToBeReplied>) => {
      state.msgToBeReplied = action.payload;
    },
  },
});

export const {
  addMessage,
  modifyMsg,
  updateSingleMsg,
  cancelUpdate,
  clearMessages,
  replyMessage,
} = messageReducer.actions;
export default messageReducer.reducer;
