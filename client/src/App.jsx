import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


import './styles/fonts.css'
import './styles/main.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword'
import VerifyEmail from './components/VerifyEmail'

import NewFriends from './components/NewFriends'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// const queryClient = new QueryClient({
//     defaultOptions: {
//         queries: {
//             staleTime: 1000,
//             cacheTime: 1000
//         }
//     }
// })
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/verify' element={<VerifyEmail />} />
                {/* <Route path='/messages' element={<MessagePanel />} />
                <Route path='/chats' element={<ChatPanel />} /> */}
                <Route path='/new-friends' element={<NewFriends/>}/>
            </Routes>
        </BrowserRouter>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)