import image from "../assets/logo-1.png"
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { PrimaryButton } from "../components/primary-button";

    const NavbarContainer = styled.div`
        display: flex;
        justify-content: space-around;
        align-items: center;
        max-width: 100%;
        margin: 0;
        padding: 0.5rem 0;
        font-size: 1rem;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    `    

    const NavbarIcon = styled.img`
        max-width: 135px;
    `

    const NavbarItemsContainer = styled.ul`
        display: flex;
        gap: 20px;
        align-items: center;
    `

    const LoginButton = styled.li`
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;

    `
export const NavigationBar = () => {
    const navigate = useNavigate()
    
    return (
        <NavbarContainer>
            <div className="">
                <Link to="/">
                    <NavbarIcon src={image} alt=""/>
                </Link>
            </div>
            <NavbarItemsContainer>
                <LoginButton><Link to={"/login"}>Log in</Link></LoginButton>
                <li><PrimaryButton onClick={() => navigate("/register")}>Register</PrimaryButton></li>
            </NavbarItemsContainer>
        </NavbarContainer>
    )
}