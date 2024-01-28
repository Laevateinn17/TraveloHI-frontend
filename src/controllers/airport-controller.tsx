import axios from "axios"
import { BACKEND_SERVER } from "../defines/connections"


export const GetAirports = async () => {
    const url = `${BACKEND_SERVER}/airports-data`

    try {
        const response = await axios.get(url)
        return response.data['airports']
    }
    catch (exception) {
        if (axios.isAxiosError(exception)) {
            console.log(exception)
            return undefined
        }
    }
}