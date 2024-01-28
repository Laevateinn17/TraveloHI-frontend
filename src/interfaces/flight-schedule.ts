import { Airplane } from "./airplane"
import { Airport } from "./airport"
import { Passenger } from "./passenger"


export interface FlightSchedule {
	ID: number
    flightNumber: number 
    departureTime: string
    arrivalTime: string
    departureAirport: Airport
    destinationAirport: Airport
    airplane: Airplane
    price: number

	foodService: boolean
	
	passengers: Passenger[]

	// FlightNumber         string    `json:"flightNumber"`
	// DepartureTime        time.Time `json:"departureTime"`
	// ArrivalTime          time.Time `json:"arrivalTime"`
	// DepartureAirportID   uint      `json:"-"`
	// DestinationAirportID uint      `json:"-"`
	// AirplaneID           uint      `json:"-"`
	// FlightTicketID       uint      `json:"-"`
	// Price                uint64    `json:"price"`
}