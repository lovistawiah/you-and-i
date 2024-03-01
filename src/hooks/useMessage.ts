import { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { msgEvents } from "../utils/eventNames";
import { replyMessage, updateSingleMsg } from "../app/messagesSlice";
import { State } from "../interface/state";

const useMessage = ({ msgIdRef, msgRef, ulRef }: { msgIdRef: React.MutableRefObject<HTMLDivElement | null>, msgRef: React.MutableRefObject<HTMLDivElement | null>, ulRef: React.MutableRefObject<HTMLUListElement | null> }) => {
  const [showOps, setShowOps] = useState(false);
  const dispatch = useDispatch();
  const chatId = useSelector((state: State) => state.chat.value?.chatId);

  useEffect(() => {
    //removes Edit and Delete container on the page is selected
    const handleClickOutside = (ev: globalThis.MouseEvent) => {
      if (ulRef.current && !ulRef.current.contains(ev.target)) {
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

  const deleteMsg = () => {
    if (!msgIdRef.current) return;
    const msgId = msgIdRef.current.id;
    if (!msgId && !chatId) return;
    setShowOps(false);
    // chatId is used to emit the chat back.
    socket.emit(msgEvents.delMsg, { msgId, chatId });
    setShowOps(false);
  };

  const editMsg = () => {
    if (!msgIdRef.current && !msgRef.current) return;
    const msgId = msgIdRef?.current.id;
    const message = msgRef.current.textContent;

    const msgObj = {
      msgId,
      message,
    };
    // turns updateMsg to true
    dispatch(updateSingleMsg(msgObj));
    setShowOps(false);
  };

  const replyMsg = () => {
    if (!msgIdRef.current && msgRef.current) return;
    const msgId = msgIdRef.current.id;
    const message = msgRef.current.textContent;

    const msgObj = {
      msgId,
      message,
    };

    dispatch(replyMessage(msgObj));
    setShowOps(false);
  };

  return { deleteMsg, editMsg, showOps, handleMsgOps, onBlurOps, replyMsg };
};

export default useMessage;

// Reply feature
// ul should appear on sent and received messages only reply should appear on received messages but reply delete edit should appear on sent message.
// reply is a new message created with reply message

// reply message {
// sender Id
// referenced message Id
//}

// message obj + reply obj {senderId, message}
