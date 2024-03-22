import { MouseEvent, useEffect, useState } from "react";
import { socket } from "../socket";
import { getUser } from "../db/user";

const useMain = () => {
  const [errMsg, setErrMsg] = useState("");
  const [isToken, setToken] = useState(true);
  const [activePage, setActivePage] = useState(3);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>();

  const pageSelector = (e: MouseEvent<HTMLButtonElement>) => {
    setActivePage(+e.currentTarget.id);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    socket.on("connect_error", (data) => {
      const message = data.message;
      setErrMsg(message);
      setToken(false);
    });
    const handleConnect = () => {
      setToken(true);
    };
    socket.on("connect", handleConnect);
    return () => {
      socket.removeListener("connect_error");
      socket.removeListener("connect", handleConnect);
    };
  }, []);
  useEffect(() => {
    getUser()
      .then((cursor) => {
        if (cursor?.value) {
          setAvatarUrl(cursor.value.avatarUrl);
        }
      })
      .catch((reason) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return reason;
      });
  }, []);
  return {
    errMsg,
    isToken,
    windowWidth,
    activePage,
    pageSelector,
    windowHeight,
    avatarUrl,
  };
};

export default useMain;
