import styled from "@emotion/styled"
import { ChangeEventHandler } from "react"

interface ComponentProps {
    label?: string
    name?: string
    children: React.ReactNode
    onChange: ChangeEventHandler<HTMLSelectElement>
    placeholder?: string
}
const Label = styled.p`
    font-size: 0.7rem;
    margin-bottom: 4px;
    text-wrap: nowrap;
`
const Select = styled.select`
    width: 100%;
    padding: 0.3rem 0.1rem;
    border-radius: 3px;
    border-color: #cdd0d1;
`

export const InputSelect: React.FC<ComponentProps> = ({label, placeholder, name, children, onChange}) => {
    return (
        <div className="">
            {label && <Label>{label}</Label>}
            <Select name={name} onChange={onChange} defaultValue={placeholder}>
                <option disabled >{placeholder ? placeholder : label}</option>
                {children}
            </Select>
        </div>
    )
}