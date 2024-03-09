import { useRef, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactNode }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    if (!elRef.current) return;
    const modalRoot = document.getElementById("messages") as HTMLDivElement;
    modalRoot.appendChild(elRef.current);
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);
  return createPortal(
    <div className="absolute bottom-0 left-2 right-2 rounded border border-gray-400 bg-white/50 shadow">
      {children}
    </div>,
    elRef.current,
  );
};

export default Modal;
