import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const InfoContainer = () => {
  const elRef = useRef<HTMLDivElement | null>(null);
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
  return createPortal(
    <div className="absolute left-2 right-2 top-0 rounded border">
      <div className="h-[50px] w-full bg-red-500 ">
        <FontAwesomeIcon
          icon={faTimes}
          className="md:text-[16px absolute right-2 top-2 cursor-pointer rounded border p-2 font-roboto text-[18px] font-light text-white transition duration-300 ease-in-out hover:bg-white hover:text-red-500"
        />
      </div>
    </div>,
    elRef.current,
  );
};

export default InfoContainer;
