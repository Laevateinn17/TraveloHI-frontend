import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { User } from "../interfaces/user"
import { DefaultProps } from "../interfaces/default-props"
import { BiCookie } from "react-icons/bi"
import { FetchUser } from "../controllers/user-controller"
import { SESSION_COOKIE } from "../defines/defines"

export interface AuthContextType {
    user: User | undefined
    setUser: Dispatch<SetStateAction<User | undefined>>
    refreshPage: CallableFunction
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

export function getCookie(cookieName: string) {
    const name = `${cookieName}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return null; // Cookie not found
}
const AuthContext = createContext<AuthContextType>(null!)
export const GetAuthContext = () => useContext(AuthContext)

export const AuthProvider: React.FC<DefaultProps> = ({children}) => {
    const [user, setUser] = useState<User>()
    const [loggedIn, setLoggedIn] = useState(false)
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        console.log("user is updated!")
    }, [refresh])

    const refreshPage = () => {
        setRefresh(!refresh)
    }
    useEffect(() => {
        const session = getCookie(SESSION_COOKIE)
        if (session) {
            setLoggedIn(true)
            FetchUser().then(user => {
                setUser(user)
            })
        }
        else {
            setLoggedIn(false)
            setUser(undefined)
        }

    }, [location.pathname, refresh])
    


    return (
        <AuthContext.Provider value={{user, setUser, refreshPage}}>
            {children}
        </AuthContext.Provider>
    )  
}