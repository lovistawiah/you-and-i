import { useRef, useEffect, useState, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { infoObj } from "../hooks/useRegister";

const InfoContainer = ({
  info,
  setInfo,
}: {
  info: infoObj;
  setInfo: React.Dispatch<SetStateAction<infoObj>>;
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    if (!elRef.current) return;
    const modalRoot = document.getElementById("modal") as HTMLDivElement;
    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (info?.message) {
      setShowModal(true);
    }
  }, [info?.message]);

  return createPortal(
    info && (
      <div
        className={`flex ${info.type === "error" ? "bg-red-500" : "bg-green-500"} p-1 ${showModal ? "translate-y-0" : "-translate-y-full "} absolute left-0 right-0 top-0`}
      >
        <div
          className="flex w-full items-center justify-center font-roboto text-[16px] leading-normal text-white md:text-[17px]"
          dangerouslySetInnerHTML={{
            __html: info.message ? info.message : "",
          }}
        ></div>

        <button
          className="mb-auto ml-auto"
          onClick={() => {
            setShowModal(false);
            setInfo(null);
          }}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="ml-1 cursor-pointer rounded border p-2 font-roboto text-[18px] font-light text-white transition duration-300 ease-in-out hover:bg-white hover:text-red-500 md:text-[16px]"
          />
        </button>
      </div>
    ),
    elRef.current,
  );
};

export default InfoContainer;
