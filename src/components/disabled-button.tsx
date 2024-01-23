import styled from "@emotion/styled"
import { colors } from "../defines/colors"
interface ComponentProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const DisabledButton: React.FC<ComponentProps> = ({children, onClick}) => {
    const Button = styled.button`
    background-color: #f7f9fa;
    color: #cfd0d1;
    padding: 0.6rem 0.8rem;
    text-align: center;
    border-radius: 7px;
    cursor: default;
    font-size: 0.8rem;
    font-weight: bold;
    width: 100%;
    // max-height: 1.5rem;
    &:hover {
        // background-color: #f2f3f3;
    }
    `
    
    return (
        <Button onClick={onClick}>{children}</Button>
    )
}