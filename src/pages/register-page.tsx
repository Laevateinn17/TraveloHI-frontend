import { FormEvent, useEffect, useRef, useState } from "react";
import { DefaultProps } from "../interfaces/default-props";
import { InputField } from "../components/input-field";
import styled from "@emotion/styled";
import { InputSelect } from "../components/input-select";
import { Gender } from "../enums/Gender";
import { SecurityQuestion } from "../enums/SecurityQuestion";
import { InputCheckbox } from "../components/input-checkbox";
import { User } from "../interfaces/user";
import { hasNumber, hasSymbol, isValidEmail } from "../libs/utils";
import { RegisterUser } from "../controllers/user-controller";
import { UserAuthData } from "../interfaces/user-auth-data";
import { SecondaryButton } from "../components/secondary-button";


    const NameInputContainer = styled.div`
        display: flex;
        gap: 5px;
        margin-bottom: 0.8rem;
    `

    const ErrorMessage = styled.p`
        font-size: 0.8rem;
        color: red;
        visibility: hidden;
    `
    
    const Title = styled.p`
        font-size: 1.4rem;
        margin-bottom: 1.5rem;
    `

export const RegisterPage: React.FC<DefaultProps> = ({}) => {
    const [user, setUser] = useState<User>({isBanned: false} as User)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [securityQuestion, setSecurityQuestion] = useState<string>()
    const [securityAnswer, setSecurityAnswer] = useState<string>()
    const errorRef = useRef<HTMLParagraphElement>(null!);
    
    

    useEffect(() => {
        document.title = 'Create an account'
    }, [])

    const checkFirstName = () => {
        if (!user.firstName || user.firstName.length <= 5) {
            errorRef.current.innerText = 'First name must be at least 5 characters'
            return false
        }
        else if (hasSymbol(user.firstName) || hasNumber(user.firstName)) {
            errorRef.current.innerText = 'First name must not contain any number or symbol'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }

    const checkLastName = () => {
        if (!user.lastName || user.lastName.length <= 5) {
            errorRef.current.innerText = 'Last name must be at least 5 characters'
            return false
        }
        else if (hasSymbol(user.lastName) || hasNumber(user.lastName)) {
            errorRef.current.innerText = 'Last name must not contain any number or symbol'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }

    const checkAge = () => {
        const age = new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear()
        if (!user.dateOfBirth || age < 13) {
            errorRef.current.innerText = 'You must be at least 13 years old'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }

    const checkGender = () => {
        if (!(Object.values(Gender) as string[]).includes(user.gender)) {
            errorRef.current.innerText = 'Gender must be either \'Male\' or \'Female\''
            return false
        }
        return true
    }
    

    const checkEmail = () => {
        if (!email || !isValidEmail(email)) {
            errorRef.current.innerText = 'Email must match the format \'[example]@[domain].com\''
            return false
        }
        errorRef.current.innerText = ''
        return true
    }


    const checkPassword = () => {
        if (password.length < 8 || password.length > 30) {
            errorRef.current.innerText = 'Password length must be 8-30 characters'
            return false
        }
        else if (!/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(password)) {
            errorRef.current.innerText = 'Password must only contain letters, numbers, or common symbols'
            return false
        }
        else if (password != confirmPassword) {
            errorRef.current.innerText = 'Passwords do not match'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }   
    
    const checkSecurityQuestion = () => {
        if (!securityQuestion) {
            errorRef.current.innerText = 'Select a security question'
            return false
        }
        else if (!securityAnswer) {
            errorRef.current.innerText = 'Fill security question\'s answer'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }

    const handleSubmit = async (evt : FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        
        if (!checkFirstName()|| 
        !checkLastName() || 
        !checkAge() || 
        !checkGender() || 
        !checkEmail() || 
        !checkPassword() ||
        !checkSecurityQuestion()) {
            errorRef.current.style.visibility = 'visible'
            return
        }
        errorRef.current.innerText = '[Error message]'
        errorRef.current.style.visibility = 'hidden'
        await RegisterUser(user, {email: email, password: password, securityQuestion: securityQuestion, securityAnswer: securityAnswer} as UserAuthData)
        
    }


    const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: string | boolean = evt.target.value
        if (evt.target.name === "dateOfBirth") value = new Date(value).toISOString()
        else if(evt.target.name === 'isSubscriber') value = (evt.target as HTMLInputElement).checked
        setUser({...user, [evt.target.name]: value})
    }


    
    
    return (
    <div className="empty-container">
        <div className="center-items">
            <div className="form-container">
                <Title>Create an account</Title>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <NameInputContainer>
                        <InputField
                        label="First name"
                        placeholder="Input first name" 
                        name="firstName"
                        onChange={e => {handleOnChange(e)}}
                        type="text"/>

                        <InputField
                        label="Middle name (optional)"
                        placeholder="Input middle name" 
                        name="middleName"
                        onChange={handleOnChange}
                        type="text"/>

                        <InputField
                        label="Last name"
                        placeholder="Input last name" 
                        name="lastName"
                        onChange={handleOnChange}
                        type="text"/>
                    </NameInputContainer>
                    <div className="mb-1">
                        <InputField type="date" name="dateOfBirth" label="Birth date" onChange={handleOnChange}/>
                    </div>
                    <div className="mb-1">
                        <InputSelect onChange={handleOnChange} label="Gender" name="gender" placeholder="Input your gender">   
                            {Object.keys(Gender).filter(key => (Gender as any)[key] != Gender.None).map(key => <option key={key} value={(Gender as any)[key]}>{key}</option>)}
                        </InputSelect>
                    </div>
                    <div className="mb-1">
                        <InputField 
                        label="Email"
                        placeholder="Example: yourname@example.com"
                        name="email"
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-1">
                        <InputField
                        label="Password"
                        placeholder="**********" 
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        type="password"/>
                    </div>
                    <div className="mb-1">
                        <InputField
                        label="Confirm Password"
                        placeholder="**********" 
                        name="confirmPassword"
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"/>
                    </div>
                    <div className="mb-1">
                        <InputSelect label="Security question" onChange={e => setSecurityQuestion(e.target.value)} name="securityQuestion" placeholder="Select a security question">
                            {Object.keys(SecurityQuestion).map(key => <option key={key} value={key}>{(SecurityQuestion as any)[key]}</option>)}
                        </InputSelect>
                    </div>
                    <div className="mb-1">
                        <InputField label="Answer" onChange={e => setSecurityAnswer(e.target.value)} placeholder="Answer for the security question" name="securityAnswer"/>
                    </div>
                    <div className="mb-1">
                        <InputCheckbox onChange={handleOnChange} label="Subscribe to our newsletter service" name="isSubscriber" checked={user.isSubscriber}/>
                    </div>
                    <div className="mb-1">
                        <ErrorMessage ref={errorRef}>[Error message]</ErrorMessage>
                    </div>
                    <SecondaryButton>Register account</SecondaryButton>
                </form>
            </div>
        </div>
    </div>
    )
}