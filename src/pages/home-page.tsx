import { useEffect } from "react"
import { GetAuthContext } from "../contexts/AuthContext"


export const HomePage = () => {
    const {user} = GetAuthContext()
    
    useEffect(() => {
        document.title = 'Home'
    }, [])
    return (
        <div>hi</div>    
    )
}