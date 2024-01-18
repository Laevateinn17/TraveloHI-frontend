import styled from "@emotion/styled"
import { ChangeEventHandler } from "react"

interface ComponentProps {
    name?: string
    label: string
    onChange: ChangeEventHandler<HTMLInputElement>
    checked?: boolean
}
export const InputCheckbox: React.FC<ComponentProps> = ({name, label, onChange, checked}) => {
    const Label = styled.p`
        display: inline;
        font-size: 0.7rem;
        margin-left: 3px;
    `

    const Container = styled.div`
        display: flex;
        align-items: center;
    `
    
    return (
        <Container>
            <input type="checkbox" name={name} id="" onChange={onChange} checked={checked}/>
            <Label>{label}</Label>
        </Container>
    )
}