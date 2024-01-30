import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { FlightSchedule, SearchFlightScheduleData } from "../interfaces/flight-schedule"
import { SearchFlightSchedule } from "../controllers/flight-schedule-controller"
import { FlightTicket } from "../interfaces/flight-ticket"
import styled from "@emotion/styled"
import { dateToTime } from "../libs/utils"

const TicketCard = styled.div`
    padding: 5px;
    background-color: white;
    filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
`

const Row1 = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
`
const FilterContainer = styled.div`
    width: 20%;
`

const SearchResultContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const OuterLayout = styled.div`
    display: flex;
`


export const FlightSearchPage = () => {
    const [flights, setFlights] = useState<FlightTicket[]>()
    const {state} = useLocation()
    useEffect(() => {
        if (state) {
            SearchFlightSchedule(state.searchData).then(tickets => {
                setFlights(tickets)
            })
        }
        
    }, [state])
    
    return (
        <div className="content-container">
            <OuterLayout>
                <FilterContainer>
                    <p>filters</p>
                </FilterContainer>
                <SearchResultContainer>
                    {flights && flights.map((flight, index) => {
                        console.log(flight.flightSchedules)
                        return (
                            <TicketCard key={index}>
                                <Row1>
                                    <p>{flight.flightSchedules[0].airplane.airline.name}</p>
                                    <p>{`${dateToTime(new Date(flight.flightSchedules[0].departureTime))} - ${dateToTime(new Date(flight.flightSchedules[flight.flightSchedules.length - 1].departureTime))}`}</p>
                                    <p>Rp. {flight.price}/pax</p>
                                </Row1>
                                <p>{flight.flightSchedules.length == 1 ? 'Direct' : `${flight.flightSchedules.length - 1} stop`}</p>
                            </TicketCard>
                        )
                    })}
                </SearchResultContainer>
            </OuterLayout>
        </div>
        
    )
}