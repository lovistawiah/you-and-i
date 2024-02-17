
import { useSelector } from "react-redux"
import Settings from './Settings'
import Contacts from './Contacts'
import Chats from './Chats'
import Menu from './Menu'
import WelcomePage from './WelcomePage'
import MessagePanel from './MessagePanel'
import useMain from '../hooks/useMain'

const MainPage = () => {
    const userAvatar = useSelector((state) => state.user.value?.avatarUrl) ?? ""
    const { errMsg, isToken, windowWidth, activePage, pageSelector } = useMain()

    return (
        !isToken ? (
            <WelcomePage message={errMsg} />
        ) : (
            <section className="relative w-screen h-screen md:flex md:flex-row flex">
                {activePage === 1 && <Settings />}
                {activePage === 2 && <Contacts />}
                {activePage === 3 && <Chats />}
                <Menu pageSelector={pageSelector} userAvatar={userAvatar} windowWidth={windowWidth} />
                {
                    windowWidth > 768 ? (
                        <MessagePanel />
                    ) : null
                }
            </section>

        )

    )
}
export default MainPage