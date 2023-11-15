import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '../styles/fonts.css'
import '../styles/main.css'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import VerifyEmail from './VerifyEmail'
import NewFriends from './NewFriends'
import Chat from './Chat'
import store from '../app/store'
import MessagePanel from './MessagePanel'
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