import {useState} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
import '../styles/fonts.css'
import '../styles/main.css'
import ChatsMessagesDisplayContext from '../utils/displayContext'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import VerifyEmail from './VerifyEmail'
import NewFriends from './NewFriends'
import Chat from './Chat'
const App = () => {
    const chatsMessagesDisplay = useState('none')
    return (
        <ChakraProvider>
            <BrowserRouter>
                <ChatsMessagesDisplayContext.Provider value={chatsMessagesDisplay}>
                    <Routes>
                        <Route path='/' element={<Chat />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/verify' element={<VerifyEmail />} />
                        <Route path='/new-friends' element={<NewFriends />} />
                    </Routes>
                </ChatsMessagesDisplayContext.Provider>
            </BrowserRouter>
        </ChakraProvider>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)