import axios from "axios";
import { BACKEND_SERVER } from "../defines/connections";
import { FlightSchedule, SearchFlightScheduleData } from "../interfaces/flight-schedule";
import { FlightTicket } from "../interfaces/flight-ticket";


export const AddFlightSchedule = async (flightSchedule: FlightSchedule) => {
    const url = `${BACKEND_SERVER}/add-flight`

    
    try {
        const response = await axios.post(url, flightSchedule)
        console.log(response)
        return response
    }
    catch (exception) {
        console.log(exception)
        if (axios.isAxiosError(exception)) {
            return exception.response

        }
    }

}

export const SearchFlightSchedule = async (searchData: SearchFlightScheduleData) => {
    const url = `${BACKEND_SERVER}/search-flights`

    try {
        const response = await axios.post(url, {...searchData})
        console.log(response)
        return response.data as FlightTicket[]
    }
    catch (exception) {
        console.log(exception)
        if (axios.isAxiosError(exception)) {
            return undefined

        }
    }
}