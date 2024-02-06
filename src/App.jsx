import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './app/store'
import Login from './components/Login'
import MainPage from './components/MainPage'
import UpdateProfile from './components/UpdateProfile'
import Register from './components/Register'
import "./index.css"
import { StrictMode } from 'react'

const AnimatedPage = () => {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/update-profile' element={<UpdateProfile />} />
            </Routes>
        </AnimatePresence>
    )
}

const App = () => {
    return (
        <div className='p-0 m-0 bg-gray-50 box-border  w-screen'>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor} >
                        <AnimatedPage />
                    </PersistGate>
                </Provider>
            </BrowserRouter>
        </div>
    )
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<StrictMode>
    <App />
</StrictMode>)