import styled from "@emotion/styled"
import { ChangeEventHandler, FocusEventHandler } from "react"

interface ComponentProps {
    name?: string
    label?: string
    placeholder?: string
    onChange: ChangeEventHandler<HTMLInputElement>
    type?: string
    value?: string
    onBlur?: FocusEventHandler<HTMLInputElement>
}

const Label = styled.p`
    font-size: 0.7rem;
    margin-bottom: 4px;
    text-wrap: nowrap;
`

const Input = styled.input`
    padding: 0.3rem 0.3rem;
    font-size: 0.7rem;
    border-radius: 3px;
    border: 1px solid #cdd0d1;
    width: 100%;
`
export const InputField: React.FC<ComponentProps> = ({label, value, name, placeholder, onChange, type="text", onBlur}) => {

    return (
        <div>
        {label && <Label>{label}</Label>}
        <Input name={name} value={value} placeholder={placeholder ? placeholder : ""} onChange={onChange} onBlur={onBlur ? onBlur : (e) => {}} type={type}/>
        </div>
    )
}