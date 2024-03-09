import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Username } from "./chatsSlice";

export type Contact = {
  id: string,
  username: string,
  avatarUrl: string,
  chatId?: string,
  bio: string
  status?: string
}

export type ContactState = {
  contacts: Contact[],
  searchedContacts: Contact[]
}

export type UpdateContact = {
  id: string,
  chatId: string,
}

const initialState: ContactState = {
  contacts: [],
  searchedContacts: [],
}

export const contactsReducer = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    searchContacts: (state, action: PayloadAction<Username>) => {
      const { payload: username } = action;
      if (username.length > 0) {
        state.searchedContacts = state.contacts.filter((chat) =>
          chat.username.toLowerCase().includes(username.toLowerCase()),
        );
      }
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      const { payload } = action;
      const contactExist = state.contacts.some(
        (chat) => chat.id === payload.id,
      );
      if (!contactExist) {
        state.contacts.push(payload);
      }
    },
    updateContact: (state, action: PayloadAction<UpdateContact>) => {
      const { payload: contactObj } = action;
      const idx = state.contacts.findIndex(
        (contact) => contact.id === contactObj.id,
      );
      if (idx !== -1) {
        state.contacts[idx]["chatId"] = contactObj.chatId;
      }
    },
  },
});

export const { searchContacts, addContact, updateContact } =
  contactsReducer.actions;
export default contactsReducer.reducer;
