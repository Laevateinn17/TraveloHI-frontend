import styled from "@emotion/styled"
import { colors } from "../defines/colors"
interface ComponentProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
}

export const TransparentButton: React.FC<ComponentProps> = ({children, onClick, className}) => {
    const Button = styled.button`
    background-color: transparent;
    color: black;
    padding: 0.6rem 0.8rem;
    text-align: center;
    border-radius: 7px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid ${colors.border};
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    `
    
    return (
        <Button onClick={onClick} className={className}>{children}</Button>
    )
}