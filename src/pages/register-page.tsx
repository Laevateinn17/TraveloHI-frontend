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
import { UserAuthData } from "../interfaces/user-auth-data";
import { SecondaryButton } from "../components/secondary-button";
import { GetAuthContext } from "../contexts/AuthContext";
import ReCAPTCHA from "react-google-recaptcha"
import { useNavigate } from "react-router-dom";
import { UserRole } from "../enums/user-role";


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
    const { RegisterUser } = GetAuthContext()

    const navigate = useNavigate()
    
    const [user, setUser] = useState<User>({isSubscriber: false, role: UserRole.Customer} as User)
    const [userAuth, setUserAuth] = useState<UserAuthData>({isBanned: false} as UserAuthData)
    const [confirmPassword, setConfirmPassword] = useState('')

    const errorRef = useRef<HTMLParagraphElement>(null!);
    const reCaptchaRef = useRef(null)
    
    const [captcha, setCaptcha] = useState<string | null>(null)
    const [captchaKey, setCaptchaKey] = useState(0)
    

    useEffect(() => {
        document.title = 'Create an account'
    }, [])

    const checkFirstName = () => {
        if (!user.firstName || user.firstName.length < 5) {
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
        if (!user.lastName || user.lastName.length < 5) {
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
        else if (userAuth.password != confirmPassword) {
            errorRef.current.innerText = 'Passwords do not match'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }   
    
    const checkSecurityQuestion = () => {
        if (!userAuth.securityQuestion) {
            errorRef.current.innerText = 'Select a security question'
            return false
        }
        else if (!userAuth.securityAnswer) {
            errorRef.current.innerText = 'Fill security question\'s answer'
            return false
        }
        errorRef.current.innerText = ''
        return true
    }

    const checkCaptcha = () => {
        if (captcha == null || captcha == '') {
            errorRef.current.innerText = 'Complete the captcha'
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
        !checkSecurityQuestion() ||
        !checkCaptcha()) {
            errorRef.current.style.visibility = 'visible'
            return
        }
        errorRef.current.innerText = '[Error message]'
        errorRef.current.style.visibility = 'hidden'

        const response = await RegisterUser(user,  userAuth, captcha)
        setCaptchaKey(captchaKey + 1)
        setCaptcha(null)

        if (response == "email is already used") {
            errorRef.current.innerText = 'Email is already used'
            errorRef.current.style.visibility = 'visible'
            return
        }
        navigate('/login')
    }


    const handleOnChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value: string | boolean = evt.target.value
        if (evt.target.name === "dateOfBirth") value = new Date(value).toISOString()
        else if(evt.target.name === 'isSubscriber') value = (evt.target as HTMLInputElement).checked

        if (['email', 'password', 'securityQuestion', 'securityAnswer'].includes(evt.target.name)) setUserAuth({...userAuth, [evt.target.name]: value})
        else setUser({...user, [evt.target.name]: value})
    }


    
    
    return (
        <div className="empty-container center-items">
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
                        onChange={handleOnChange}/>
                    </div>
                    <div className="mb-1">
                        <InputField
                        label="Password"
                        placeholder="**********" 
                        name="password"
                        onChange={handleOnChange}
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
                        <InputSelect label="Security question" onChange={handleOnChange} name="securityQuestion" placeholder="Select a security question">
                            {Object.keys(SecurityQuestion).map(key => <option key={key} value={key}>{(SecurityQuestion as any)[key]}</option>)}
                        </InputSelect>
                    </div>
                    <div className="mb-1">
                        <InputField label="Answer" onChange={handleOnChange} placeholder="Answer for the security question" name="securityAnswer"/>
                    </div>
                    <div className="mb-1">
                        <InputCheckbox onChange={handleOnChange} label="Subscribe to our newsletter service" name="isSubscriber" checked={user.isSubscriber}/>
                    </div>
                    <div className="mb-1">
                        <ReCAPTCHA className="g-recaptcha" sitekey="6LehlFopAAAAAN7Kr_LO9IoWv2Gohy19lyuweBcA" ref={reCaptchaRef} onChange={value => setCaptcha(value)}/>
                    </div>
                    <div className="mb-1">
                        <ErrorMessage ref={errorRef}>[Error message]</ErrorMessage>
                    </div>
                    <SecondaryButton>Register account</SecondaryButton>
                </form>
            </div>
        </div>
    )
}