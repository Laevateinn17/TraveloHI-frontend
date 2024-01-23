import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { RequestOTP, VerifyOTP } from "../../controllers/otp-controller"
import { OTP } from "../../interfaces/otp"
import { DisabledButton } from "../disabled-button"
import { PrimaryButton } from "../primary-button"


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

interface ComponentProps {
    email: string
    onVerify: CallableFunction
}

export const OTPVerification: React.FC<ComponentProps> = ({email, onVerify}) => {

    const [otp, setOtp] = useState<OTP>()
    const [otpInput, setOtpInput] = useState('')

    useEffect(() => {
        console.log("component mounted")
        RequestOTP(email).then(otp => {
            setOtp(otp)
            console.log(otp)
        })
    }, [])


    const HandleVerifyOTP = async () => {
        const response = await VerifyOTP({email: email, code: otpInput} as OTP)
        if (response) {
            onVerify(true)
        }
    }

    
    return (
        <>
        <p className="title">Input Verification Code</p>
        <p className="text-sm mb-1">To verify your account, you need to confirm your Traveloka account. Please input the verification code that we sent to you:</p>
        <VerificationContainer className="mb-1">
            <p className="mb-1">Verification Code</p>
            <input type="text" onChange={e => setOtpInput(e.target.value)}/>
        </VerificationContainer>
            <div className="mb-1">
                {otp ? 
                    <DisabledButton>Resend verification code</DisabledButton>
                    : 
                    <DisabledButton>Sending your OTP code...</DisabledButton>
                }
            </div>
            <div className="mb-1">
                {otp ?
                    <PrimaryButton onClick={HandleVerifyOTP}>Verify</PrimaryButton>
                :
                    <DisabledButton>Verify</DisabledButton>
                }
            </div>
        </>
    )
}