import axios, { Axios, AxiosError, HttpStatusCode } from "axios"
import { BACKEND_SERVER } from "../defines/connections"
import { User } from "../interfaces/user"
import { UserAuthData } from "../interfaces/user-auth-data"


export const RegisterUser = async (user: User, userAuth: UserAuthData) => {
    const url = `${BACKEND_SERVER}/register`

    const data = {
        user: user,
        userAuth: userAuth
    }

    const response = await axios.post(url, data)
    console.log("response: ", response)
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


