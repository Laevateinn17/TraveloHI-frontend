import { FormEvent, useRef, useState } from "react"
import { InputField } from "../components/input-field"
import { UserAuthData } from "../interfaces/user-auth-data"
import "../styles/components.scss"
import styled from "@emotion/styled"
import { SecondaryButton } from "../components/secondary-button"
import { isValidEmail } from "../libs/utils"
import { Login } from "../controllers/user-controller"
import { HttpStatusCode } from "axios"
import { useNavigate } from "react-router-dom"
import { GetAuthContext } from "../contexts/AuthContext"

 
const Title = styled.p`
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
`

const ErrorMessage = styled.p`
    font-size: 0.8rem;
    color: red;
    visibility: hidden;
`
export const LoginPage = () => {
    const [userAuth, setUserAuth] = useState<UserAuthData>({} as UserAuthData)
    const errorRef = useRef<HTMLParagraphElement>(null!)
    const navigate = useNavigate()
    const {refreshPage} = GetAuthContext()
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
        refreshPage()
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
                    <div className="mb-2">
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
                    <SecondaryButton>Log In</SecondaryButton>
                </form>
            </div>
        </div>
    )
}