import axios, { HttpStatusCode } from "axios"
import { UserAuthData } from "../interfaces/user-auth-data"
import { BACKEND_SERVER } from "../defines/connections"
import { AxiosResponse } from "axios"

export const GetSecurityQuestion = async (userAuth: UserAuthData) => {
    const url = `${BACKEND_SERVER}/security-question`
    try {

        const response = await axios.post(url, userAuth)
        const result = response.data as UserAuthData
        return result.securityQuestion
    }
    catch (exception) {
        return undefined
    }

}

export const VerifySecurityAnswer = async (userAuth: UserAuthData) => {
    const url = `${BACKEND_SERVER}/security-answer`
    try {

        const response = await axios.post(url, userAuth)

        return response.status == HttpStatusCode.Ok
    }
    catch (exception) {
        return false
    }
}

export const ChangePassword = async (userAuth: UserAuthData)  => {
    const url = `${BACKEND_SERVER}/change-password`
    try {
        const response = await axios.post(url, userAuth)
        return response
    }
    catch (exception) {
        if (axios.isAxiosError(exception)) {
            return exception.response
        }
    }
}