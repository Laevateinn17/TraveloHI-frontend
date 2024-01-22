import { useEffect } from "react"
import { GetAuthContext, deleteCookie, getCookie } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { SESSION_COOKIE } from "../defines/defines"



export const LogoutPage = () => {
    const {user, Logout} = GetAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            if (getCookie(SESSION_COOKIE)) {
            }
        }
        Logout().then(() => navigate('/'))
    }, [])

    return (
        <>
        </>
    )
}