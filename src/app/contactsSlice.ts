import { createSlice } from "@reduxjs/toolkit";

export const contactsReducer = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    searchedContacts: [],
  },
  reducers: {
    searchContacts: (state, action) => {
      const { payload: username } = action;
      if (username.length > 0) {
        state.searchedContacts = state.contacts.filter((chat) =>
          chat.username.includes(username),
        );
      }
    },
    addContact: (state, action) => {
      const { payload } = action;
      const contactExist = state.contacts.some(
        (chat) => chat.Id === payload.Id,
      );
      if (!contactExist) {
        state.contacts.push(payload);
      }
    },
    updateContact: (state, action) => {
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
