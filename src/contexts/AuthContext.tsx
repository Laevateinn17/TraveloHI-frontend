import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { User } from "../interfaces/user"
import { DefaultProps } from "../interfaces/default-props"
import { SESSION_COOKIE } from "../defines/defines"
import { useLocation } from "react-router-dom"
import { BACKEND_SERVER } from "../defines/connections"
import { UserAuthData } from "../interfaces/user-auth-data"
import axios, { HttpStatusCode } from "axios"

export interface AuthContextType {
    user: User | undefined
    setUser: Dispatch<SetStateAction<User | undefined>>
    isAuthenticated: boolean | null
    RegisterUser: CallableFunction
    Login: CallableFunction
    LoginByEmail: CallableFunction
    FetchUser: CallableFunction
    Logout: CallableFunction
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const location = useLocation()
    useEffect(() => {
        if (isAuthenticated) {
            FetchUser().then(user => {
                setUser(user)
            })

        }
        else {
            setUser(undefined)
        }
    }, [isAuthenticated])
    
    useEffect(() => {
        const session = getCookie(SESSION_COOKIE)
        console.log(session)
        if (session) {
            setIsAuthenticated(true)
        }
        else {
            setIsAuthenticated(false)
        }

    }, [document.cookie])
    

    const RegisterUser = async (user: User, userAuth: UserAuthData, captcha: string) => {
        const url = `${BACKEND_SERVER}/register`

        const data = {
            user: user,
            userAuth: userAuth,
            captcha: captcha
        }

        try {
            const response = await axios.post(url, data)
            if (response.status == HttpStatusCode.Ok) return true
        }
        catch (exception) {
            console.log(exception)
            if (axios.isAxiosError(exception)) {
                return exception.response?.data
            }
        }

        
    }

    const Login = async (userAuth: UserAuthData, captcha: string) => {
        const url = `${BACKEND_SERVER}/login`
        try {
            const response = await axios.post(url, {userAuth: userAuth, captcha: captcha}, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.status
        }
        catch(exception)
        {
            console.log(exception)
            if (axios.isAxiosError(exception)) {
                return exception.response?.status
            }
        }
    }

    const LoginByEmail = async (userAuth: UserAuthData) => {
        const url = `${BACKEND_SERVER}/email-login`
        try {
            const response = await axios.post(url, userAuth, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.status
        }
        catch(exception)
        {
            console.log(exception)
            if (axios.isAxiosError(exception)) {
                return exception.response?.status
            }
        }
        
    }

    const FetchUser = async (): Promise<User | undefined> => {
        const url = `${BACKEND_SERVER}/user`
        try {
            const response = await axios.get(url, {
                withCredentials: true
            })
            return response.data as User
        }
        catch (exception) {
        }

        return undefined
    }

    const Logout = async () => {
        const url = `${BACKEND_SERVER}/logout`

        try {
            const response = await axios.post(url, {
                withCredentials: true
            })
                deleteCookie(SESSION_COOKIE)
            return response.data as User
        }
        catch (exception) {
            console.log(exception)
        }
        setIsAuthenticated(false)

    }


    return (
        <AuthContext.Provider value={{user, setUser, isAuthenticated, RegisterUser, Login, LoginByEmail, FetchUser, Logout}}>
            {children}
        </AuthContext.Provider>
    )  
}