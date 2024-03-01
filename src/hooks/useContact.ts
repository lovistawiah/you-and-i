import { useEffect, useState } from "react";
import { chatEvents } from "../utils/eventNames";
import { socket } from "../socket";
import { useDispatch } from "react-redux";
import { searchContacts, addContact } from "../app/contactsSlice";
import { Contact } from "../interface/app/contactsSlice";

const useContact = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchContacts(searchInput));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    const getContacts = (data: Contact) => {
      dispatch(addContact(data)); //data is {_id,username,avatarUrl}
    };

    socket.emit(chatEvents.contacts, {});
    socket.on(chatEvents.contacts, getContacts);
    return () => {
      socket.off(chatEvents.contacts, getContacts);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { searchInput, setSearchInput };
};
export default useContact;
