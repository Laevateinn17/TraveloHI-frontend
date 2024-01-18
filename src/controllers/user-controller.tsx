import axios from "axios"
import { BACKEND_SERVER } from "../defines/connections"
import { User } from "../interfaces/user"
import { UserAuthData } from "../interfaces/user-auth-data"


export const RegisterUser = async (user: User, userAuth: UserAuthData) => {
    const url = `${BACKEND_SERVER}/register`

    const data = {
        user: user,
        userAuth: userAuth
    }

    console.log(data)
    const response = await axios.post(url, data)
    
}