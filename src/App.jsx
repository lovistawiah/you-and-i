import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import VerifyEmail from './components/VerifyEmail'
import NewFriends from './components/NewFriends'
import Chat from './components/ChatMainPage'
import store from './app/store'
import MessagePanel from './components/MessagePanel'
import "./index.css"


const App = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <Routes>
                    <Route path='/' element={<Chat />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/forgot-password' element={<ForgotPassword />} />
                    <Route path='/verify' element={<VerifyEmail />} />
                    <Route path='/new-friends' element={<NewFriends />} />
                    <Route path='/messages' element={<MessagePanel />} />
                </Routes>
            </Provider>
        </BrowserRouter>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)