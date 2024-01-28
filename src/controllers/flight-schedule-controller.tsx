import axios from "axios";
import { BACKEND_SERVER } from "../defines/connections";
import { FlightSchedule } from "../interfaces/flight-schedule";


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