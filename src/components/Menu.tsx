import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Menu = ({ pageSelector, windowWidth, userAvatar }) => {
  const icons = [
    { iconText: "Settings", iconName: faGear },
    { iconText: "Contacts", iconName: faUserPlus },
    { iconText: "Chats", iconName: faComments },
  ];

  return (
    <div
      className={`fixed bottom-0 z-30 order-1 flex w-full justify-around border-t border-stone-400 bg-gray-50 pt-2 md:relative md:bottom-[unset] md:h-screen md:w-[90px] md:flex-col md:justify-start md:border-r md:border-gray-200`}
    >
      {icons.map(({ iconName, iconText }, i) => (
        // added one to id to make number more understandable
        <button
          className={`flex flex-col p-1 font-roboto font-normal text-zinc-600 md:my-2 md:items-center md:justify-center ${iconText === "Chats" ? "md:order-1" : iconText === "Contacts" ? "md:order-2" : "md:order-3"} text-base focus:text-blue-500`}
          key={i}
          onClick={pageSelector}
          id={i + 1}
        >
          <FontAwesomeIcon
            icon={iconName}
            className="pointer-events-none self-center"
          />
          {iconText}
        </button>
      ))}
      {windowWidth > 768 && (
        <section className="order-4 my-2 mt-auto flex h-[32px] w-[32px] shrink-0 items-center justify-center self-center ">
          <img src={userAvatar} alt="user dp" className="rounded-full" />
        </section>
      )}
    </div>
  );
};

export default Menu;
