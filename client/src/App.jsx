import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserContext from './utils/UserContext'


import './styles/fonts.css'
import './styles/main.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import VerifyEmail from './components/VerifyEmail'
import MessagePanel from './components/MessagePanel'
import ChatPanel from './components/ChatPanel'
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
})

const App = () => {
    const userDetails = useState(null)
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <UserContext.Provider value={userDetails}>
                    <Routes>
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/verify' element={<VerifyEmail />} />
                        <Route path='/messages' element={<MessagePanel />} />
                        <Route path='/chats' element={<ChatPanel />} />
                    </Routes>
                </UserContext.Provider>
            </QueryClientProvider>
        </BrowserRouter>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)