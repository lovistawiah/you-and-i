import { createSlice } from "@reduxjs/toolkit";

export const contactsReducer = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    searchedContacts: []
  },
  reducers: {
    searchContacts: (state, action) => {
      const { payload: username } = action;
      if(username.length > 0){
      state.searchedContacts = state.contacts.filter((chat) => chat.username.includes(username))
      }

    },
    updateContact: (state, action) => {
      const { payload } = action;
      const chatExists = state.contacts.some((chat) => chat._id === payload._id);
      if (!chatExists) {
        state.contacts.push(payload);
      }
    },
  },
});

export const { searchContacts, updateContact } = contactsReducer.actions;
export default contactsReducer.reducer;
