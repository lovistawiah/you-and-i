import {useState} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './styles/fonts.css'
import './styles/main.css'
import ChatsMessagesDisplayContext from './utils/displayContext'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import VerifyEmail from './components/VerifyEmail'
import NewFriends from './components/NewFriends'
import Messages from './components/Messages'
const App = () => {
    const chatsMessagesDisplay = useState('none')
    return (
        <BrowserRouter>
            <ChatsMessagesDisplayContext.Provider value={chatsMessagesDisplay}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/messages' element={<Messages />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/verify' element={<VerifyEmail />} />
                <Route path='/new-friends' element={<NewFriends/>}/>
            </Routes>
            </ChatsMessagesDisplayContext.Provider>

        </BrowserRouter>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)