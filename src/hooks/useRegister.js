import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { persistor } from '../app/store'
import { setUserInfo } from "../app/userSlice"

const useRegister = () => {
        const navigate = useNavigate()
    const dispatch = useDispatch()
    const [info, setInfo] = useState({})
    const [spin, setSpin] = useState(false)
    const [isValid, setIsValid] = useState(true)

    const saveUserInfoAndNavigate = (userObj) => {
        if (!userObj) return
        setSpin(false)
        dispatch(setUserInfo(userObj))
        navigate('/update-profile')
    }
    const errorLogger = ({ message }) => {
        setInfo({ type: 'error', message })
        setSpin(false)
    }
    useEffect(() => {
        const handleLogout = async () => {
            await persistor.purge()
            localStorage.clear()
        }
        handleLogout()
    }, [])

    useEffect(() => {
        if (!isValid) {
            setInfo({
                type: 'error',
                message: `<ul>
                <li class="text-lg mb-1 text-red-500">Password should:</li>
                  <li>At least contain 8 characters long</li>
                  <li>Contain at least one uppercase letter</li>
                  <li>Contain at least one lowercase letter</li>
                  <li>Contain at least one digit</li>
                  <li>Contain at least one special character (such as @$!%*?&,+><)</li>
                  </ul>`
            })
        } else {
            setInfo({})
        }
    }, [isValid])
  return {info,saveUserInfoAndNavigate,errorLogger,setInfo,spin,setIsValid,setSpin}
}

export default useRegister