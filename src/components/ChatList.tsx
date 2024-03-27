import PageHeader from "./PageHeader";
import Chat from "./Chat";
import useChats from "../hooks/useChats";
import Search from "./Search";

const ChatList = () => {
  const { searchInput, handleSearch, clearSearch, chats } = useChats();

  return (
    <section className={`relative  order-2 w-full md:w-[55%] md:border-r`}>
      <PageHeader pageName={"Chats"} />
      <Search
        clearSearch={clearSearch}
        handleSearch={handleSearch}
        searchInput={searchInput}
      />
      <div className="absolute bottom-[56px] left-0 right-0 top-2 mt-[129px] w-full overflow-y-auto md:bottom-1">
        {Array.isArray(chats) && chats.length > 0 ? (
          chats.map((chat) => (
            <Chat
              key={chat.id}
              id={chat.id}
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
export default ChatList;
