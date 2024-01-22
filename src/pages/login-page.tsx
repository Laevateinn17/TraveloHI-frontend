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
import { RequestOTP, VerifyOTP } from "../controllers/otp-controller"
import { Modal } from "../components/modal"
import { DisabledButton } from "../components/disabled-button"
import { OTP } from "../interfaces/otp"

 
const Title = styled.p`
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
`

const ErrorMessage = styled.p`
    font-size: 0.8rem;
    color: red;
    visibility: hidden;
`
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

const VerificationContainer = styled.div`
    p {
        font-size: 0.8rem;
        font-weight: bold;
        text-align: center;
    }

    input[type=text] {
        width: 100%
    }
`


export const LoginPage = () => {
    const {Login} = GetAuthContext()

    const navigate = useNavigate()
    
    const [userAuth, setUserAuth] = useState<UserAuthData>({} as UserAuthData)

    const [showModal, setShowModal] = useState(false)

    const [otp, setOtp] = useState<OTP>()
    
    const [otpInput, setOtpInput] = useState('')
    
    const errorRef = useRef<HTMLParagraphElement>(null!)
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

    const HandleVerifyOTP = async () => {
        await VerifyOTP({email: userAuth.email, code: otpInput} as OTP)
    }

    return (
        <div className="empty-container center-items">
            <div className="form-container">
                <Title>Sign in</Title>
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
                        <ErrorMessage ref={errorRef}>[Error message]</ErrorMessage>
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
                        <ForgotPasswordButton onClick={async () => {
                            const otp = await RequestOTP(userAuth.email)
                            setOtp(otp)
                            console.log((new Date(otp.expiresAt).getTime() - new Date().getTime()))
                            setShowModal(true)
                        }}>Forgot Password?</ForgotPasswordButton>
                    </div>
                </div>
            </div>
            {showModal && 
            <Modal onModalClose={() => setShowModal(false)}>
                <Title>Input Verification Code</Title>
                <p className="text-sm mb-1">To verify your account, you need to confirm your Traveloka account. Please input the verification code that we sent to you:</p>
                <VerificationContainer className="mb-1">
                    <p className="mb-1">Verification Code</p>
                    <input type="text" onChange={e => setOtpInput(e.target.value)}/>
                </VerificationContainer>
                    <div className="mb-1">
                        <DisabledButton>Resend verification code</DisabledButton>
                    </div>
                    <div className="mb-1">
                        <PrimaryButton onClick={HandleVerifyOTP}>Verify</PrimaryButton>
                    </div>
            </Modal>}
        </div>
    )
}