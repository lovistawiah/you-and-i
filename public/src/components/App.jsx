import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../styles/fonts.css'
import '../styles/main.css'

import Register from './Register'
import Login from './Login'
import Home from './Home'
import ForgotPassword from './ForgotPassword'
import VerifyEmail from './VerifyEmail'
import AddEmail from './AddEmail'
import MessagePanel from './MessagePanel'
import ChatPanel from './ChatPanel'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/verify-email' element={<VerifyEmail />} />
                <Route path='/add-email' element={<AddEmail />} />
                <Route path='/message-panel' element={<MessagePanel />} />
                <Route path='/chat-panel' element={<ChatPanel />} />
            </Routes>
        </BrowserRouter>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)