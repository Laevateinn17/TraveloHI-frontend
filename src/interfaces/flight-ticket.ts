import { FlightSchedule } from "./flight-schedule";
import { Passenger } from "./passenger";

export interface FlightTicket {
    passengers: Passenger[]
    flightSchedules: FlightSchedule[]
    price: number

}