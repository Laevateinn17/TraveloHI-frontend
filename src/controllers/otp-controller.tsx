import axios, { HttpStatusCode } from "axios"
import { BACKEND_SERVER } from "../defines/connections"
import { OTP } from "../interfaces/otp"


export const RequestOTP = async (email: string) => {
    const url = `${BACKEND_SERVER}/otp`
    console.log(email)
    const response = await axios.post(url, {email: email})

    return response.data as OTP
}

export const VerifyOTP = async (otp: OTP) => {
    console.log(otp)
    const url = `${BACKEND_SERVER}/check-otp`
    const response = await axios.post(url, otp)

    return response.status == HttpStatusCode.Ok ? true : false
}