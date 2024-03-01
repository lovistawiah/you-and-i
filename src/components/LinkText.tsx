import { Link } from "react-router-dom";

const LinkText = ({ linkName }: { linkName: string }) => {
  return (
    <Link
      to={`/${linkName.toLowerCase()}`}
      className="flex h-[33px] w-fit items-center justify-center rounded-[5px] border border-neutral-500 bg-blue-600 px-3.5 py-[7px] text-base font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-800 md:h-[36px] md:w-[120px] md:text-xl"
    >
      {linkName}
    </Link>
  );
};

export default LinkText;
