import styled from "@emotion/styled"
import { InputField } from "../components/input-field"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { SearchFlightScheduleData } from "../interfaces/flight-schedule"
import { SecondaryButton } from "../components/secondary-button"
import { PiMagnifyingGlass } from "react-icons/pi"
import { DropdownSearch } from "../components/dropdown-search"
import { Airport } from "../interfaces/airport"
import { GetAirports } from "../controllers/airport-controller"
import { useNavigate } from "react-router-dom"

const FirstInputContainer = styled.div`
    display: flex;
    gap: 10px;
`

const AirportInputContainer = styled.div`
    display: flex;
    gap: 10px;
`

const DateInputContainer = styled.div`
    display: flex;
    gap: 10px;
`

const SearchFlightContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
`
const ButtonLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
`





export const FlightPage = () => {
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState<SearchFlightScheduleData>({} as SearchFlightScheduleData)

    const [airports, setAirports] = useState<Airport[]>()

    useEffect(() => {
        GetAirports().then(airports => setAirports(airports))
    }, [])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: any = e.target.value

        if (e.target.name == 'departureDate' || e.target.name == 'returnDate') value = new Date(e.target.value).toISOString()
        
        setSearchData({...searchData, [e.target.name]: value})
        if (e.target.name == 'departureTime' && searchData.returnDate == undefined) {
            setSearchData((prev) => ({...prev, returnDate: value}))
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        navigate('/flights/search', {state: {
            searchData
            // departureAirport : searchData.departureAirport,
            // destinationAirport: searchData.destinationAirport,
            // departureDate: searchData.departureTime,
            // passengerCount: passengerCount
        }})
    }
    
    return (
        <div className="content-container center-items">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <SearchFlightContainer>
                        <FirstInputContainer>
                            <AirportInputContainer>
                                <DropdownSearch label="From" 
                                list={airports ? airports.map(airport => `${airport.country} / ${airport.city} / ${airport.name} (${airport.code})`) : ['Loading...']}
                                onChange={e => {
                                    setSearchData({...searchData, departureAirport: airports?.find(airport => e.target.value.includes(airport.code) && e.target.value.includes(airport.name))!})
                                }}/>
                                {/* <InputField onChange={handleOnChange} label="From"/> */}
                                <DropdownSearch label="To" 
                                list={airports ? airports.map(airport => `${airport.country} / ${airport.city} / ${airport.name} (${airport.code})`) : ['Loading...']}
                                onChange={e => {
                                    setSearchData({...searchData, destinationAirport: airports?.find(airport => e.target.value.includes(airport.code) && e.target.value.includes(airport.name))!})
                                }}/>
                                {/* <InputField onChange={handleOnChange} label="To"/> */}
                            </AirportInputContainer>
                            <div className="">
                                <InputField label="No. of Passengers" type="number" onChange={(e) => setSearchData({...searchData, passengerCount: parseInt(e.target.value)})}/>
                            </div>
                        </FirstInputContainer>
                        <DateInputContainer>
                            <InputField name="departureDate" type="date" onChange={handleOnChange} label="Departure Date"/>
                            {/* <InputField name="arrivalTime" type="date" onChange={handleOnChange} label="Return Date"/> */}
                        </DateInputContainer>
                    <SecondaryButton>
                        <ButtonLayout>
                            <PiMagnifyingGlass/>
                            <p>Search Flights</p>
                        </ButtonLayout>
                    </SecondaryButton>
                    </SearchFlightContainer>
                </form>
            </div>
        </div>
    )
}