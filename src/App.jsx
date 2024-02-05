import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './app/store'
import Login from './components/Login'
import MainPage from './components/MainPage'
import MessagePanel from './components/MessagePanel'
import UpdateProfile from './components/UpdateProfile'
import Register from './components/Register'
import "./index.css"
import { StrictMode } from 'react'

const App = () => {
    return (
        <div className='p-0 m-0 bg-gray-50 box-border  w-screen'>
            <BrowserRouter>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor} >
                        <Routes>
                            <Route path='/' element={<MainPage />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/update-profile' element={<UpdateProfile />} />
                            <Route path='/messages' element={<MessagePanel />} />
                        </Routes>
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