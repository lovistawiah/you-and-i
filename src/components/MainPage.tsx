import Settings from "./Settings";
import Contacts from "./Contacts";
import Chats from "./Chats";
import Menu from "./Menu";
import WelcomePage from "./WelcomePage";
import MessagePanel from "./MessagePanel";
import useMain from "../hooks/useMain";
import useLastMessage from "../hooks/useLastMessage";
import useModifyMessage from "../hooks/useModifyMessage";

const MainPage = () => {
  const { errMsg, isToken, windowWidth, activePage, pageSelector, avatarUrl } = useMain();

  useLastMessage();
  useModifyMessage();
  if (!avatarUrl) return;
  return !isToken ? (
    <WelcomePage message={errMsg} />
  ) : (
    <section className="relative flex h-screen w-screen md:flex md:flex-row">
      {activePage === 1 && <Settings />}
      {activePage === 2 && <Contacts />}
      {activePage === 3 && <Chats />}
      <Menu pageSelector={pageSelector} userAvatar={avatarUrl} windowWidth={windowWidth} />
      {windowWidth > 768 ? <MessagePanel /> : null}
    </section>
  );
};
export default MainPage;
