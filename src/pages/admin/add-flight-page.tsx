import { ChangeEvent, useEffect, useRef, useState } from "react"
import { InputField } from "../../components/input-field"
import { FlightSchedule } from "../../interfaces/flight-schedule"
import { InputSelect } from "../../components/input-select"
import { Airport } from "../../interfaces/airport"
import { GetAirports } from "../../controllers/airport-controller"
import { Airline } from "../../interfaces/airline"
import { GetAirlines } from "../../controllers/airline-controller"
import { Airplane } from "../../interfaces/airplane"
import { GetAirplanes, GetAvailableAirplanes } from "../../controllers/airplane-controller"
import { InputCheckbox } from "../../components/input-checkbox"
import { SecondaryButton } from "../../components/secondary-button"
import { dateToInputDateTime } from "../../libs/utils"
import { AddFlightSchedule } from "../../controllers/flight-schedule-controller"
import { HttpStatusCode } from "axios"



export const AddFlightPage = () => {
    const [schedule, setSchedule] = useState<FlightSchedule>({} as FlightSchedule)
    const [airports, setAirports] = useState<Airport[]>()
    const [airlines, setAirlines] = useState<Airline[]>()
    const [airplanes, setAirplanes] = useState<Airplane[]>()
    
    const [airline, setAirline] = useState<Airline>()


    const checkTime = () => {
        const departureTime = new Date(schedule.departureTime).getTime()
        const arrivalTime = new Date(schedule.arrivalTime).getTime()

        if (arrivalTime <= departureTime) {
            errorRef.current.innerText = 'Arrival time must be after departure time'
            errorRef.current.style.visibility = 'visible'
            return
        }
        errorRef.current.innerText = '[Error message]'
        errorRef.current.style.visibility = 'hidden'
    }

    const errorRef = useRef<HTMLParagraphElement>(null!)

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: any = e.target.value

        if (e.target.name == 'departureTime' || e.target.name == 'arrivalTime') value = new Date(e.target.value).toISOString()
        if (e.target.name == 'price') value = parseInt(value)
        
        setSchedule({...schedule, [e.target.name]: value})
        if (e.target.name == 'departureTime' && schedule.arrivalTime == undefined) {
            setSchedule(prev => ({...prev, arrivalTime: value}))
        }
    }

    useEffect(() => {
        GetAirports().then(airports => setAirports(airports))
        GetAirlines().then(airlines => setAirlines(airlines))
    }, [])

    useEffect(() => {
        if (airline && schedule.departureTime && schedule.arrivalTime) {
            GetAvailableAirplanes(airline, new Date(schedule.departureTime), new Date(schedule.arrivalTime)).then(airplanes => {
                if (airplanes) {
                    setAirplanes(airplanes)
                }
            })
        }

    }, [airline, schedule.departureTime, schedule.arrivalTime])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(schedule)

        const result = await AddFlightSchedule(schedule)
        if (result?.status != HttpStatusCode.Ok) {
            errorRef.current.style.visibility = 'visible'
            if (result?.data == 'duplicate flight number') {
                errorRef.current.innerText = 'Flight with this Flight number is already exist'
            }
            else if (result?.data == 'airplane is not available within the time period') {
                errorRef.current.innerText = 'Airplane is not avilable within that time period'
            }
        }
        else {
            errorRef.current.style.visibility = 'hidden'
            errorRef.current.innerText = '[Error Message]'
        }
        

    }
    
    return (
        <div className="content-container center-items">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <InputField label="Flight number" name="flightNumber" onChange={handleOnChange}/>
                </div>
                <div className="mb-1">
                    <InputField type="datetime-local" label="Departure time" name="departureTime" onChange={handleOnChange} />
                </div>
                <div className="mb-1">
                    <InputField type="datetime-local" label="Arrival time" name="arrivalTime" onChange={handleOnChange} value={schedule.arrivalTime ? dateToInputDateTime(new Date(schedule.arrivalTime)) : ''}/>
                </div>
                <div className="mb-1">
                    <InputSelect label="Departure airport" name="departureAirport" onChange={e => setSchedule({...schedule, departureAirport: airports?.find(airport => airport.ID == e.target.value)!})} placeholder="Departure Country / City / Airport">
                        {airports && airports.map(airport => <option key={airport.code} value={airport.ID}>{`${airport.country} / ${airport.city} / ${airport.name} (${airport.code})`}</option>)}
                    </InputSelect>
                </div>
                <div className="mb-1">
                    <InputSelect label="Destination airport" name="destinationAirport" onChange={e => setSchedule({...schedule, destinationAirport: airports?.find(airport => airport.ID == e.target.value)!})} placeholder="Destination Country / City / Airport">
                        {airports ? airports.map(airport => <option key={airport.code} value={airport.ID}>{`${airport.country} / ${airport.city} / ${airport.name} (${airport.code})`}</option>) : <option disabled>Loading...</option>}
                    </InputSelect>
                </div>
                <div className="mb-1">
                    <InputSelect label="Airline" name="airline" onChange={(e) => setAirline(airlines?.find(airline => airline.ID == parseInt(e.target.value)))} placeholder="Select airline">
                        {airlines ? airlines.map(airline => <option key={airline.ID} value={airline.ID}>{airline.name}</option>) : <option disabled>Loading...</option>}
                    </InputSelect>
                </div>
                <div className="mb-1">
                    <InputSelect label="Airplane" name="airplane" onChange={e => setSchedule({...schedule, airplane: airplanes?.find(airplane => airplane.ID == parseInt(e.target.value))!})} placeholder="Select airplane">
                        {airline && schedule.departureTime && schedule.arrivalTime && airplanes ? 
                            airplanes.filter(airplane => airplane.airline.name == airline.name).map(airplane => <option key={airplane.ID} value={airplane.ID}>{`${airplane.manufacturer} ${airplane.airplaneModel}`}</option>)
                        : <option disabled>Please input airline, departure time, and arrival time</option>}
                    </InputSelect>
                </div>
                <div className="mb-3">
                    <InputField type="number" label="Price" name="price" onChange={handleOnChange}/>
                </div>
                <div className="mb-3">
                    <p className="title-sm">Services</p>
                    <InputCheckbox checked={schedule.foodService} onChange={(e) => setSchedule({...schedule, foodService: e.target.checked})} label="Food service"/>
                </div>
                <div className="mb-1">
                    <p className="error-message" ref={errorRef}>[Error Message]</p>
                </div>
                <SecondaryButton>Add Flight</SecondaryButton>
                </form>
            </div>
        </div>
    )
}