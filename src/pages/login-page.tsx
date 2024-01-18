import { useState } from "react"
import { InputField } from "../components/input-field"
import { UserAuthData } from "../interfaces/user-auth-data"
import "../styles/components.scss"
import { PrimaryButton } from "../components/primary-button"
import styled from "@emotion/styled"
import { SecondaryButton } from "../components/secondary-button"

 
const Title = styled.p`
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
`
export const LoginPage = () => {
    const [userAuth, setUserAuth] = useState<UserAuthData>({} as UserAuthData)


    
    const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: string | boolean = evt.target.value
        setUserAuth({...userAuth, [evt.target.name]: value})
    }


    return (
    <div className="empty-container">
        <div className="center-items">
            <div className="form-container">
                <Title>Sign in</Title>
                <form action="">
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
                    <SecondaryButton>Log In</SecondaryButton>
                </form>
            </div>
        </div>
    </div>
    )
}