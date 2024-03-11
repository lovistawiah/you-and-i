import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ChatsValue = {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  lastMessage: string;
  lstMsgDate: Date;
};

export interface TypingObj {
  chatId: string;
  typing: "typing...";
}
export type Typing = TypingObj | null;

export type SearchChats = ChatsValue[];

export type Chats = ChatsValue[];

export type ChatsState = {
  chats: Chats;
  typing: Typing;
  searchChats: SearchChats;
};

export type UpdateLastMessage = {
  chatId: string;
  lastMessage: string;
  msgDate: Date;
};

export type Username = string;

const initialState: ChatsState = {
  chats: [],
  searchChats: [],
  typing: null,
};

export const chatsReducer = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addChats: (state, action: PayloadAction<ChatsValue>) => {
      const { payload } = action;
      const chatExists = state.chats.some((chat: ChatsValue) => chat.id === payload.id);
      if (!chatExists) {
        state.chats.push(payload);
      }
    },

    addNewChat: (state, action: PayloadAction<ChatsValue>) => {
      const { payload } = action;
      const chatExists = state.chats.some((chat: ChatsValue) => chat.id === payload.id);
      if (!chatExists) {
        state.chats = [payload, ...state.chats].sort((chatA, chatB) => {
          const timeA = new Date(chatA.lstMsgDate).getTime();
          const timeB = new Date(chatB.lstMsgDate).getTime();
          return timeB - timeA;
        });
      }
    },

    updateLastMessage: (state, action: PayloadAction<UpdateLastMessage>) => {
      const { chatId, lastMessage, msgDate } = action.payload;
      const findIdx = state.chats.findIndex((chat) => chat.id === chatId);

      if (findIdx !== -1) {
        state.chats[findIdx].lastMessage = lastMessage;
        state.chats[findIdx].lstMsgDate = msgDate;

        state.chats.sort((chatA, chatB) => {
          const timeA = new Date(chatA.lstMsgDate).getTime();
          const timeB = new Date(chatB.lstMsgDate).getTime();
          return timeB - timeA;
        });
      }
    },

    typing: (state, action: PayloadAction<Typing>) => {
      const { payload: typingObj } = action;
      state.typing = typingObj;
    },
    /**
     * this accepts username
     *
     */
    searchChats: (state, action: PayloadAction<Username>) => {
      const { payload: username } = action;
      if (username) {
        state.searchChats = state.chats.filter((chat) => chat.username.includes(username));
        state.searchChats.sort((chatA, chatB) => {
          const usernameA = chatA.username.toLowerCase();
          const usernameB = chatB.username.toLowerCase();
          if (usernameA < usernameB) {
            return -1;
          } else if (usernameA > usernameB) {
            return 1;
          } else {
            return 0;
          }
        });
      }
    },
  },
});

export const { addChats, updateLastMessage, typing, searchChats, addNewChat } =
  chatsReducer.actions;
export default chatsReducer.reducer;
