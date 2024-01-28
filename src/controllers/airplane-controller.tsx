import axios from "axios"
import { BACKEND_SERVER } from "../defines/connections"
import { Airplane } from "../interfaces/airplane"
import { Airline } from "../interfaces/airline"


export const GetAirplanes = async () => {
    const url = `${BACKEND_SERVER}/airplanes-data`

    try {
        const response = await axios.get(url)
        console.log(response.data['airplanes'])
        return response.data['airplanes']
    }
    catch (exception) {
        if (axios.isAxiosError(exception)) {
            console.log(exception)
            return undefined
        }
    }
}

export const GetAvailableAirplanes = async (airline: Airline, departureTime: Date, arrivalTime: Date)  : Promise<Airplane[] | undefined> => {
    const url = `${BACKEND_SERVER}/available-planes`

    console.log(airline, departureTime, arrivalTime)
    try {
        const response = await axios.post(url, {
            airline: airline,
            departureTime: departureTime,
            arrivalTime: arrivalTime
        })
        return response.data['airplanes']
    } 
    catch (exception) {
        if (axios.isAxiosError(exception)) {
            console.log(exception)
            return undefined
        }
    }
}