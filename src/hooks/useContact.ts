import { ChangeEvent, useEffect, useState } from "react";
import { chatEvents } from "../utils/eventNames";
import { socket } from "../socket";
import {
  addContact,
  Contact,
  getContacts,
  searchContacts,
} from "../db/contact";
import { clearMessages } from "../db/messages";
import { addChat, clearChat } from "../db/chat";


const useContact = () => {
  const [searchInput, setSearchInput] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contacts, setContacts] = useState<Contact[]>();

  const getContactsFromServer = (data: Contact) => {
    setContacts(contacts => {
      return contacts ? [...contacts, data] : [data]
    })
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        socket.emit(chatEvents.contacts, {});
        socket.on(chatEvents.contacts, getContactsFromServer);

      } catch (e) {
        const cachedData = await getContacts()
        setContacts(cachedData)
      }
    }
    void fetchData()
    return () => {
      socket.removeListener(chatEvents.contacts, getContacts);
    };
  }, []);

  useEffect(() => {
    const addContacts = async () => {
      if (contacts) {
        await addContact(contacts)
      }

    }
    void addContacts()
  }, [contacts])

  useEffect(() => {
    const filteredContacts = async () => {
      if (searchInput) {
        const contacts = await searchContacts(searchInput);
        setContacts(contacts);
      }
    };
    void filteredContacts();
  }, [searchInput]);

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


  return {
    searchInput,
    handleSearch,
    clearSearch,
    contacts,
    windowWidth,
    handleUserInfo,
  };
};

export default useContact;
