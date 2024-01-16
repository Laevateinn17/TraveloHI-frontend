import styled from "@emotion/styled"

interface ComponentProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const PrimaryButton: React.FC<ComponentProps> = ({children, onClick}) => {
    const Button = styled.button`
    background-color: #0194f3;
    color: white;
    padding: 0.4rem 0.5rem;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    font-size: 0.6rem;
    &:hover {
        background-color: #0185da;
    }
    `
    
    return (
        <Button onClick={onClick}>{children}</Button>
    )
}