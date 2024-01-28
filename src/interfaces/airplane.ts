import { SeatConfig } from "../enums/SeatConfig"
import { Airline } from "./airline"


export interface Airplane {
    ID: number
    airplaneModel: string
    manufacturer: string
    capacity: number
    seatConfig: SeatConfig
    entertainment: boolean
    wiFi: boolean
    powerOutlets: boolean
    airline: Airline   

}