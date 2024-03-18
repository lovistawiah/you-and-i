import { useEffect, useMemo, useState } from "react";
import PageHeader from "./PageHeader";
import { setChatInfo } from "../app/chatSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import useContact from "../hooks/useContact";
import { clearMessages } from "../app/messagesSlice";
import { Contact, getContacts, searchContacts } from "../db/contact";

const Contacts = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [contacts, setContacts] = useState<Contact[]>();
  const { searchInput, setSearchInput } = useContact();

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

  return (
    <section className={`relative order-2 w-full  md:w-[55%]`}>
      <PageHeader pageName={"Contacts"} />

      <div className="fixed top-[59px] flex h-[70px] w-full flex-col items-center justify-center bg-gray-50 px-2.5 md:relative md:top-[10px]">
        <section className="relative w-[90%]">
          {!searchInput && (
            <FontAwesomeIcon icon={faSearch} className="absolute left-1 top-[10px] text-zinc-500" />
          )}
          <input
            type="text"
            name=""
            placeholder="Search"
            id=""
            className="inline-flex h-9 w-full items-center justify-start gap-1.5 border-b-[1px] border-zinc-500 bg-white pl-6 text-base font-normal outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {searchInput && (
            <FontAwesomeIcon
              icon={faTimes}
              className="absolute right-3 top-[10px] cursor-pointer text-zinc-500"
              onClick={clearSearch}
            />
          )}
        </section>
      </div>

      <section className="absolute bottom-[56px] left-0 right-0 top-2 mt-[129px] w-full overflow-y-auto md:bottom-1">
        {cachedContacts?.map((contact) => (
          <Link
            to={`/${windowWidth < 768 ? "messages" : ""}`}
            onClick={() =>
              handleUserInfo({
                id: contact.id,
                username: contact.username,
                avatarUrl: contact.avatarUrl,
                status: contact.status,
                chatId: contact.chatId,
                bio: contact.bio,
              })
            }
            className="flex w-full items-center justify-start"
            key={contact.id}
          >
            <section className="flex h-[65px] w-[70px] shrink-0 items-center justify-center p-2.5">
              <img src={contact.avatarUrl} alt="user profile" className="rounded-full" />
            </section>
            <section className="flex w-full flex-col gap-[0px] border-b border-neutral-400 py-1">
              <h4 className="h-[24.50px] pt-1 text-base font-medium text-zinc-950">
                {contact.username}
              </h4>
              <section className="line-clamp-2 w-full flex-grow basis-0 text-ellipsis pb-[40px] pl-1 pr-0 pt-[4px] text-sm font-normal text-neutral-400">
                {contact.bio}
              </section>
            </section>
          </Link>
        ))}
      </section>
    </section>
  );
};
export default Contacts;
