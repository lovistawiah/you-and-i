import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from './app/store'
import ForgotPassword from './components/ForgotPassword'
import Login from './components/Login'
import MainPage from './components/MainPage'
import MessagePanel from './components/MessagePanel'
import UpdateProfile from './components/UpdateProfile'
import Register from './components/Register'
import VerifyEmail from './components/VerifyEmail'
import "./index.css"

const App = () => {
    return (
        <div className='p-0 m-0 bg-gray-50 box-border  w-screen'>
            <BrowserRouter>
                <Provider store={store}>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/verify' element={<VerifyEmail />} />
                        <Route path='/update-profile' element={<UpdateProfile />} />
                        <Route path='/messages' element={<MessagePanel />} />
                    </Routes>
                </Provider>
            </BrowserRouter>
        </div>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)