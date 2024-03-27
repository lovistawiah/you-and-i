import { useEffect, useState } from "react";

const useMessage = ({
  ulRef,
}: {
  msgIdRef: React.MutableRefObject<HTMLDivElement | null>;
  msgRef: React.MutableRefObject<HTMLDivElement | null>;
  ulRef: React.MutableRefObject<HTMLUListElement | null>;
}) => {
  const [showOps, setShowOps] = useState(false);

  useEffect(() => {
    //removes Edit and Delete container on the page is selected
    const handleClickOutside = (ev: Event) => {
      if (ulRef.current && !ulRef.current.contains(ev.currentTarget)) {
        setShowOps(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  //to show Edit and Delete btn
  const handleMsgOps = () => {
    setShowOps(true);
  };
  /**
   * when clicked outside the window hide message ops
   */
  const onBlurOps = () => {
    setShowOps(false);
  };

  const deleteMsg = () => {};

  const editMsg = () => {};

  const replyMsg = () => {};

  return { deleteMsg, editMsg, showOps, handleMsgOps, onBlurOps, replyMsg };
};

export default useMessage;
