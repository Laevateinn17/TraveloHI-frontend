import styled from "@emotion/styled"
import { DefaultProps } from "../interfaces/default-props"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CenterItems: React.FC<DefaultProps> = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}