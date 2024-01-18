import styled from "@emotion/styled"
import { ChangeEventHandler, FocusEventHandler, useState } from "react"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"

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
    font-size: 0.8rem;
    margin-bottom: 7px;
    // margin-left: 2px;
    text-wrap: nowrap;
`

const Input = styled.input`
    padding: 0.4rem 0.3rem;
    padding-left: 0.4rem;
    border-radius: 3px;
    border: 1px solid #cdd0d1;
    max-height:2rem;
    width: 100%;
    &:focus {
        outline: none;
        border-color: #555555;
    }
`

const ToggleContainer = styled.span`
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    border-radius: 50%;
`


export const InputField: React.FC<ComponentProps> = ({label, value, name, placeholder = "", onChange, type="text", onBlur}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div>
        {label && <Label>{label}</Label>}
            <div className="relative">
                <Input name={name} 
                value={value} 
                placeholder={placeholder} 
                onChange={onChange} 
                onBlur={(e) => {
                    if (onBlur) {
                        onBlur(e)
                    }
                }}
                type={type != "password" ? type : showPassword ? "text" : type}/>
                {type == "password" &&
                <ToggleContainer
                onMouseDown={e => {
                    setShowPassword(true)
                }}
                onMouseUp={e => {
                    setShowPassword(false)
                }}>
                    {showPassword ? <IoEyeOffOutline className="toggle-password"/> : <IoEyeOutline className="toggle-password" />}
                </ToggleContainer>}
            </div>
        </div>
    )
}