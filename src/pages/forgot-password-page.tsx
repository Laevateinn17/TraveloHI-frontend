import { FormEvent, useRef, useState } from "react"
import { SecondaryButton } from "../components/secondary-button"
import { InputField } from "../components/input-field"
import { UserAuthData } from "../interfaces/user-auth-data"
import { ChangePassword, GetSecurityQuestion, VerifySecurityAnswer } from "../controllers/user-controller"
import { SecurityQuestion } from "../enums/SecurityQuestion"
import { useNavigate } from "react-router-dom"
import { HttpStatusCode } from "axios"



export const ForgotPasswordPage = () => {
    const navigate = useNavigate()
    
    const [panelIndex, setPanelIndex] = useState(0)

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [userAuth, setUserAuth] = useState<UserAuthData>({} as UserAuthData)

    const errorRef = useRef<HTMLParagraphElement>(null!)
    const errorRef1 = useRef<HTMLParagraphElement>(null!)
    const errorRef2 = useRef<HTMLParagraphElement>(null!)

    const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {   
        e.preventDefault()
        if (!newPassword || newPassword.length < 8 || newPassword.length > 30) {
            errorRef.current.style.visibility = 'visible'
            errorRef.current.innerText = 'Password length must be 8-30 characters'
            return
        }
        else if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(newPassword)) {
            errorRef.current.style.visibility = 'visible'
            errorRef.current.innerText = 'Password must only contain letters, numbers, or common symbols'
            return
        }
        else if (newPassword != confirmNewPassword) {
            errorRef.current.style.visibility = 'visible'
            errorRef.current.innerText = 'Passwords do not match'
            return
        }
        errorRef.current.innerText = '[Error message]'
        errorRef.current.style.visibility = 'hidden'

        userAuth.password = newPassword
        const response = await ChangePassword(userAuth)
        if (response?.status == HttpStatusCode.Ok) {
            errorRef.current.innerText = '[Error message]'
            errorRef.current.style.visibility = 'hidden'
            navigate("/login")
        }
        else if (response?.data['error'] == "new password is the same as old one") {
            errorRef.current.innerText = 'New password can\'t be the same as old one.'
            errorRef.current.style.visibility = 'visible'
        }
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const question = await GetSecurityQuestion(userAuth) as SecurityQuestion
        
        if (!question) {
            errorRef1.current.style.visibility = 'visible'
            errorRef1.current.innerText = 'This account doesn\'t exist'
            return
        }

        errorRef1.current.style.visibility = 'hidden'
        errorRef1.current.innerText = ''
        setUserAuth({...userAuth, securityQuestion: question})
        setPanelIndex(1)
    }
    
    const verifySecurityAnswer = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const correct = await VerifySecurityAnswer(userAuth)

        if (!correct) {
            errorRef2.current.style.visibility = 'visible'
            errorRef2.current.innerText = 'Wrong answer'
            return
        }
        errorRef2.current.style.visibility = 'hidden'
        errorRef2.current.innerText = '[Error Message]'
        setPanelIndex(2)
    }
    
    return (
        <div className="empty-container center-items">
        {panelIndex == 0 && (
            <div className="form-container">
                <p className="title">Enter Your Email</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <InputField
                        label="Email"
                        name="email"
                        placeholder="Example: yourname@email.com"
                        onChange={(e) => setUserAuth({...userAuth, email: e.target.value})}
                        />
                    </div>
                    <div className="mb-1">
                        <p className="error-message" ref={errorRef1}>[Error message]</p>
                    </div>
                    <div className="mb-1">
                        <SecondaryButton>Submit</SecondaryButton>
                    </div>
                </form>
            </div>
        )}
        {panelIndex == 1 && (
            <div className="form-container">
                <p className="title">Answer This Security Question</p>
                <form onSubmit={verifySecurityAnswer}>
                    <div className="mb-1">
                        <InputField
                        label={SecurityQuestion[userAuth.securityQuestion as keyof typeof SecurityQuestion]}
                        placeholder="Your answer"
                        onChange={(e) => setUserAuth({...userAuth, securityAnswer: e.target.value})}
                        />
                    </div>
                    <div className="mb-1">
                        <p className="error-message" ref={errorRef2}>[Error message]</p>
                    </div>
                    <div className="mb-1">
                        <SecondaryButton>Submit</SecondaryButton>
                    </div>
                </form>
            </div>
        )}
        {panelIndex == 2 && (
            <div className="form-container">
                <p className="title">Change Password</p>
                <form onSubmit={handleChangePassword}>
                    <div className="mb-1">
                        <InputField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        placeholder="********"
                        onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-1">
                        <InputField 
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        type="password"
                        placeholder="********"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-1">
                        <p className="error-message" ref={errorRef}>[Error message]</p>
                    </div>
                    <div className="mb-2">
                        <SecondaryButton>Change password</SecondaryButton>
                    </div>
                </form>
            </div>
        
        )}
        </div>
    )
    
    
}