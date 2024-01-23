import { FormEvent, useEffect, useRef, useState } from "react"
import { InputField } from "../components/input-field"
import { UserAuthData } from "../interfaces/user-auth-data"
import "../styles/components.scss"
import styled from "@emotion/styled"
import { SecondaryButton } from "../components/secondary-button"
import { isValidEmail } from "../libs/utils"
import { HttpStatusCode } from "axios"
import { useNavigate } from "react-router-dom"
import { GetAuthContext } from "../contexts/AuthContext"
import { TransparentButton } from "../components/transparent-button"
import { colors } from "../defines/colors"
import { PrimaryButton } from "../components/primary-button"
import { Modal } from "../components/modal"
import { OTPVerification } from "../components/modals/OTPVerification"

 

const Border = styled.div`
    position: absolute;
    width: 100%;
    z-index: 0;
    top: 50%;
    border-top: 1px solid ${colors.border};
`

const Text = styled.p`
    position: relative;
    display: inline;
    font-size: 0.8rem;
    padding: 0 1rem;
    color: ${colors.dark};
    z-index: 5;
    background-color: white;
`

const BorderContainer = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
`


const ForgotPasswordButton = styled.button`
    color: ${colors.primary};
    font-weight: 600;
    width: 100%;
    background-color: inherit;
    font-size: 0.9rem;
    cursor: pointer;

    &:hover {
        color: ${colors.primary_dark}
    }
`


const FormContent2 = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1.5rem;
  right: -(500px)
`

export const LoginPage = () => {
    const {Login} = GetAuthContext()

    const navigate = useNavigate()
    
    const [userAuth, setUserAuth] = useState<UserAuthData>({} as UserAuthData)

    const [showModal, setShowModal] = useState(false)
    const [changePassword, setChangePassword] = useState(false)


    
    const errorRef = useRef<HTMLParagraphElement>(null!)

    useEffect(() => {
        setShowModal(false)
    }, [changePassword])

    const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: string | boolean = evt.target.value
        setUserAuth({...userAuth, [evt.target.name]: value})
    }

    const checkEmail = () => {
        if (!userAuth.email || !isValidEmail(userAuth.email)) {
            errorRef.current.innerText = 'Email must match the format \'[example]@[domain].com\''
            return false
        }
        errorRef.current.innerText = ''
        return true
    }


    const checkPassword = () => {
        if (!userAuth.password || userAuth.password.length < 8 || userAuth.password.length > 30) {
            errorRef.current.innerText = 'Password length must be 8-30 characters'
            return false
        }
        else if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(userAuth.password)) {
            errorRef.current.innerText = 'Password must only contain letters, numbers, or common symbols'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }   


    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        if (!checkEmail() || !checkPassword()){
            errorRef.current.style.visibility = 'visible'
            return
        }

        errorRef.current.innerText = '[Error message]'
        errorRef.current.style.visibility = 'hidden'
        const status = await Login(userAuth)

        if (status == HttpStatusCode.BadRequest) {
            errorRef.current.innerText = 'Wrong email or password'
            errorRef.current.style.visibility = 'visible'
            return
        }

        navigate("/")
    }


    const HandleForgotPassword = () => {
        setShowModal(true)
    }


    return (
        <div className="empty-container center-items">
            <div className="form-container">
                {!changePassword && <div>
                    <p className="title">Sign in</p>
                    <form action="" method="POST" onSubmit={handleSubmit}>
                        <div className="mb-1">
                            <InputField
                            label="Email"
                            name="email"
                            placeholder="Example: yourname@email.com"
                            onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-1">
                            <InputField 
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="********"
                            onChange={handleOnChange}
                            />
                        </div>
                        <div className="mb-1">
                            <p className="error-message" ref={errorRef}>[Error message]</p>
                        </div>
                        <div className="mb-2">
                            <SecondaryButton >Log In</SecondaryButton>
                        </div>
                    </form>
                    <div>
                        <BorderContainer>
                            <Border></Border>
                            <Text>or log in/register with</Text>
                        </BorderContainer>
                        <div className="mb-1">
                            <TransparentButton onClick={() => {
                                
                            }}>Login with OTP</TransparentButton>
                        </div>
                        <div className="mb-1">
                            <PrimaryButton onClick={() => navigate("/register")}>Register</PrimaryButton>
                        </div>
                        <div className="text-center">
                            <ForgotPasswordButton onClick={() => navigate("/forgot-password")}>Forgot Password?</ForgotPasswordButton>
                        </div>
                    </div>
                </div>}
            </div>
            <Modal 
            onModalClose={() => {
                setShowModal(false)
            }}
            show={showModal}
            >
                {showModal && <OTPVerification email={userAuth.email} onVerify={(bool: boolean) => setChangePassword(bool)}/>}
            </Modal>
        </div>
    )
}