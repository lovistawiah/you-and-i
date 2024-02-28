import { useEffect, useState } from "react";
import { chatEvents } from "../utils/eventNames";
import { socket } from "../socket";
import { useDispatch } from "react-redux";
import { searchContacts, addContact } from "../app/contactsSlice";

const useContact = () => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchContacts(searchInput));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  useEffect(() => {
    const getChats = (data) => {
      dispatch(addContact(data)); //data is {_id,username,avatarUrl}
    };

    socket.emit(chatEvents.contacts, {});
    socket.on(chatEvents.contacts, getChats);
    return () => {
      socket.off(chatEvents.contacts, getChats);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { searchInput, setSearchInput };
};
export default useContact;
