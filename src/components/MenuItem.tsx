import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";

const MenuItem = ({
  iconText,
  pageSelector,
  idx,
  iconName,
}: {
  iconText: string;
  pageSelector: (e: MouseEvent<HTMLButtonElement>) => void;
  idx: number;
  iconName: IconProp;
}) => {
  return (
    <button
      className={`flex flex-col p-1 font-roboto font-normal text-zinc-600 md:my-2 md:items-center md:justify-center ${iconText === "Chats" ? "md:order-1" : iconText === "Contacts" ? "md:order-2" : "md:order-3"} text-base focus:text-blue-500`}
      key={idx}
      onClick={pageSelector}
      id={`${idx + 1}`}
    >
      <FontAwesomeIcon icon={iconName} className="pointer-events-none self-center" />
      {iconText}
    </button>
  );
};

export default MenuItem;
