import PageHeader from "./PageHeader";
import Chat from "./Chat";
import useChats from "../hooks/useChats";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { ChatsValue } from "../interface/app/chatsSlice";

const MainPage = () => {
  const { searchInput, setSearchInput } = useChats();
  const chats = useSelector((state) =>
    searchInput.length > 0 ? state.chats.searchChats : state.chats.chats,
  );

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  return (
    <section className={`relative  order-2 w-full md:w-[55%] md:border-r`}>
      <PageHeader pageName={"Chats"} />

      <div className="fixed top-[59px] flex h-[70px] w-full flex-col items-center justify-center bg-gray-50 px-2.5 md:relative md:top-[10px]">
        <section className="relative w-[90%]">
          {!searchInput && (
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-1 top-[10px] text-zinc-500"
            />
          )}
          <input
            type="text"
            name="search"
            placeholder="Search"
            id="search"
            className="inline-flex h-9 w-full items-center justify-start gap-1.5 border-b-[1px] border-zinc-500 bg-white pl-6 text-base font-normal outline-none"
            value={searchInput}
            onChange={handleSearch}
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

      <div className="absolute bottom-[56px] left-0 right-0 top-2 mt-[129px] w-full overflow-y-auto md:bottom-1">
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat: ChatsValue) => (
            <Chat
              key={chat.Id}
              Id={chat.Id}
              avatarUrl={chat.avatarUrl}
              lstMsgDate={chat.lstMsgDate}
              lastMessage={chat.lastMessage}
              userId={chat.userId}
              username={chat.username}
            />
          ))
        ) : (
          <section className="text-center font-roboto text-lg font-bold">
            No chats found
          </section>
        )}
      </div>
    </section>
  );
};
export default MainPage;
