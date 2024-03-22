import { Link } from "react-router-dom";
import type { Contact } from "../db/contact";

const Contact = ({
  windowWidth,
  handleUserInfo,
  contact,
}: {
  windowWidth: number;
  handleUserInfo: ({ id, chatId, avatarUrl, username, status }: Contact) => Promise<void>;
  contact: Contact;
}) => {
  return (
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
        <h4 className="h-[24.50px] pt-1 text-base font-medium text-zinc-950">{contact.username}</h4>
        <section className="line-clamp-2 w-full flex-grow basis-0 text-ellipsis pb-[40px] pl-1 pr-0 pt-[4px] text-sm font-normal text-neutral-400">
          {contact.bio}
        </section>
      </section>
    </Link>
  );
};

export default Contact;
