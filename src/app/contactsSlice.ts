import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Contact, ContactState } from "../interface/app/contactsSlice";
import { Username } from "../interface/app/chatsSlice";
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
        (chat) => chat.Id === payload.Id,
      );
      if (!contactExist) {
        state.contacts.push(payload);
      }
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const { payload: contactObj } = action;
      const idx = state.contacts.findIndex(
        (contact) => contact.Id === contactObj.Id,
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
