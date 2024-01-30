import { FlightSchedule } from "./flight-schedule";
import { Passenger } from "./passenger";

export interface FlightTicket {
    ID: number
    passengers: Passenger[]
    flightSchedules: FlightSchedule[]
    price: number

}