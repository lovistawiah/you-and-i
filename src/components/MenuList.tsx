import { faComments, faGear, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent } from "react";
import MenuItem from "./MenuItem";

const Menu = ({
  pageSelector,
  windowWidth,
  userAvatar,
}: {
  pageSelector: (e: MouseEvent<HTMLButtonElement>) => void;
  windowWidth: number;
  userAvatar: string | undefined;
}) => {
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
        <MenuItem
          iconName={iconName}
          iconText={iconText}
          idx={i}
          key={i}
          pageSelector={pageSelector}
        />
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
