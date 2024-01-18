import styled from "@emotion/styled"
import { colors } from "../defines/colors"
interface ComponentProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const TransparentButton: React.FC<ComponentProps> = ({children, onClick}) => {
    const Button = styled.button`
    background-color: transparent;
    color: white;
    padding: 0.6rem 0.8rem;
    text-align: center;
    border-radius: 7px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    width: 100%;
    // max-height: 1.5rem;
    &:hover {
        background-color: #0185da;
    }
    `
    
    return (
        <Button onClick={onClick}>{children}</Button>
    )
}