import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { chatEvents } from "../utils/eventNames";
import { socket } from "../socket";
import {
  Contact,
  addContact,
  getContacts,
  searchContacts,
} from "../db/contact";
import { clearMessages } from "../db/messages";
import { addChat, clearChat } from "../db/chat";
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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleUserInfo = async ({
    id,
    chatId,
    avatarUrl,
    username,
    status,
  }: Contact) => {
    const chatObj = {
      userId: id,
      chatId,
      avatarUrl,
      username,
      status,
    };

    await clearMessages();
    await clearChat();
    await addChat(chatObj);
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
      await addContact(data);
    };
    socket.emit(chatEvents.contacts, {});
    socket.on(chatEvents.contacts, getContacts);
    return () => {
      socket.removeListener(chatEvents.contacts, getContacts);
    };
  }, []);

  return {
    searchInput,
    handleSearch,
    clearSearch,
    cachedContacts,
    windowWidth,
    handleUserInfo,
  };
};
export default useContact;
