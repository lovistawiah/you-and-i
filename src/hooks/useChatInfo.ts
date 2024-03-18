import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { usrEvents } from "../utils/eventNames";
import { updateStatus } from "../app/chatSlice";

const useChatInfo = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  useEffect(() => {
    socket.emit(usrEvents.status, userId);
    socket.on(usrEvents.status, (userStats) => {
      dispatch(updateStatus(userStats));
    });
    return () => {
      socket.removeListener(usrEvents.status);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return { goBack };
};

export default useChatInfo;
