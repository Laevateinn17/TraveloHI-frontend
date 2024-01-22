import styled from "@emotion/styled"
import { DefaultProps } from "../interfaces/default-props"
import { IoMdClose } from "react-icons/io"
import { TfiClose } from "react-icons/tfi"

const Title = styled.p`
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
`
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 3s;
`

const ModalItem = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: relative;
    max-width: 400px;
    width: 100%;
`

const CloseButton = styled.div`
    position: absolute;
    right: 5%;
    cursor: pointer;
`

interface ComponentProps {
    children?: React.ReactNode
    onModalClose: CallableFunction
}


export const Modal: React.FC<ComponentProps> = ({children, onModalClose}) => {

    return (
        <ModalContainer>
            <ModalItem>
                <CloseButton onClick={() => onModalClose()}><TfiClose/></CloseButton>
                {children}
            </ModalItem>
        </ModalContainer>
    )
}