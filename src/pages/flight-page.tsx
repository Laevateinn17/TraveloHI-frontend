import styled from "@emotion/styled/macro"
import { InputField } from "../components/input-field"


const SearchFlightContainer = styled.div`
    padding: 0.5 rem 0.2rem
`

export const FlightPage = () => {
    return (
        <div className="empty-container center-items">
            <div className="">
                <InputField onChange={}/>
            </div>
        </div>
    )
}