import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

const InfoContainer = ({
  info,
  setInfo,
}: {
  info:
    | Record<string, never>
    | {
        type: string;
        message: string;
      };
  setInfo: React.Dispatch<
    React.SetStateAction<
      | Record<string, never>
      | {
          type: string;
          message: string;
        }
    >
  >;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeErrorContainer() {
    setIsOpen(isOpen ? true : false);
    setInfo({});
  }
  return (
    <AnimatePresence>
      {info.message ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className={`absolute left-0 right-0 top-7 m-auto w-[300px] border-[0.5px] bg-white p-1 text-center md:w-[450px] ${info.type === "error" ? " border-red-100" : " border-blue-100"} z-20 flex h-fit items-center justify-start rounded font-roboto text-sm shadow`}
        >
          <p>
            {" "}
            <FontAwesomeIcon
              icon={faTimes}
              className={`absolute right-2 top-1 flex h-[22px] w-[22px] items-center justify-center rounded-[50%] p-1 text-lg hover:bg-gray-200 ${info.type === "error" ? " text-red-400" : " text-blue-500"}  cursor-pointer`}
              onClick={closeErrorContainer}
            />
          </p>

          <section
            className={`${info.type === "error" ? "text-red-400" : "text-blue-500"} mt-[6px]`}
          >
            {info.message.startsWith("<") ? (
              <div
                dangerouslySetInnerHTML={{ __html: info.message }}
                className="pl-1 text-start"
              />
            ) : (
              <div>{info.message}</div>
            )}
          </section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default InfoContainer;
