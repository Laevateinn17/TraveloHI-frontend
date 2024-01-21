import axios, { Axios, AxiosError, HttpStatusCode } from "axios"
import { BACKEND_SERVER } from "../defines/connections"
import { User } from "../interfaces/user"
import { UserAuthData } from "../interfaces/user-auth-data"
import { deleteCookie } from "../contexts/AuthContext"
import { SESSION_COOKIE } from "../defines/defines"


export const RegisterUser = async (user: User, userAuth: UserAuthData) => {
    const url = `${BACKEND_SERVER}/register`

    const data = {
        user: user,
        userAuth: userAuth
    }

    const response = await axios.post(url, data)
    if (response.status == HttpStatusCode.Ok) 
    return true
}

export const Login = async (userAuth: UserAuthData) => {
    const url = `${BACKEND_SERVER}/login`
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
        if (axios.isAxiosError(exception)) {
            return exception.response?.status
        }
    }
}

export const FetchUser = async (): Promise<User | undefined> => {
    const url = `${BACKEND_SERVER}/user`
    try {
        const response = await axios.get(url, {
            withCredentials: true
        })
        return response.data as User
    }
    catch (exception) {
        console.log(exception)
    }

    return undefined
}

export const Logout = async () => {
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


}
