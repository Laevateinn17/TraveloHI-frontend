import { useEffect } from "react"
import { GetAuthContext, deleteCookie, getCookie } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { SESSION_COOKIE } from "../defines/defines"
import { Logout } from "../controllers/user-controller"



export const LogoutPage = () => {
    const {user, refreshPage} = GetAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            if (getCookie(SESSION_COOKIE)) {
            }
        }
        navigate('/') 
        Logout().then(refreshPage())
    }, [])

    return (
        <>
        </>
    )
}