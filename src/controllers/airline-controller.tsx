import axios from "axios"
import { BACKEND_SERVER } from "../defines/connections"


export const GetAirlines = async () => {
    const url = `${BACKEND_SERVER}/airlines-data`

    try {
        const response = await axios.get(url)
        return response.data['airlines']
    }
    catch (exception) {
        if (axios.isAxiosError(exception)) {
            console.log(exception)
            return undefined
        }
    }
}