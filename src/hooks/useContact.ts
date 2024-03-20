import { useEffect, useMemo, useState } from "react";
import { chatEvents } from "../utils/eventNames";
import { socket } from "../socket";
import { Contact, addContact, getContacts, searchContacts } from "../db/contact";
const useContact = () => {
  const [searchInput, setSearchInput] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contacts, setContacts] = useState<Contact[]>();

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await getContacts();
      setContacts(contacts);
    };

    void fetchContacts();
  }, []);

  useEffect(() => {
    const filteredContacts = async () => {
      const contacts = await searchContacts(searchInput);
      setContacts(contacts);
    };
    void filteredContacts();
  });

  const clearSearch = () => {
    setSearchInput("");
  };
  const handleUserInfo = ({ id, chatId, avatarUrl, username, status, bio }: Contact) => {
    const chatObj = {
      id,
      chatId,
      avatarUrl,
      username,
      status,
      bio,
    };

    dispatch(clearMessages());
    dispatch(setChatInfo({}));
    dispatch(setChatInfo(chatObj));
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);

  const cachedContacts = useMemo(() => contacts, [contacts]);

  useEffect(() => {
    const getContacts = async (data: Contact) => {
      await addContact(data)
    };
    socket.emit(chatEvents.contacts, {});
    socket.on(chatEvents.contacts, getContacts);
    return () => {
      socket.removeListener(chatEvents.contacts, getContacts);
    };
  }, []);

  return { searchInput, setSearchInput, clearSearch, cachedContacts, windowWidth, handleUserInfo };
};
export default useContact;
