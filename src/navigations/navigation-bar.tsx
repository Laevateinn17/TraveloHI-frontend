import image from "../assets/logo-1.png"
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { PrimaryButton } from "../components/primary-button";
import { TransparentButton } from "../components/transparent-button";
import { FaUser } from "react-icons/fa";
import "../styles/main.scss"
import { GetAuthContext } from "../contexts/AuthContext";

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0.5rem 10vw;
    font-size: 1rem;
    border-bottom: 1px solid rgba(104,113,118,0.25);
    z-index: 1;
    background-color: white;
` 

const NavbarIcon = styled.img`
    max-width: 135px;
`

const NavbarItemsContainer = styled.ul`
    display: flex;
    gap: 20px;
    align-items: center;
`

const Navbar = styled.div`
    position: fixed;
    width: 100%;
    justify-content: center;
`

const SecondNavbarContainer = styled.div`
    display: flex;
    font-size: 0.8rem;
    justify-content: space-between;
    padding: 0.5rem 10vw;
    background-color: white;
    border-bottom: 1px solid rgba(104,113,118,0.25);
`

const SecondNavbarItemContainer = styled.ul`
    display: flex;
    gap: 25px;
`


export const NavigationBar = () => {
    const {user} = GetAuthContext()

    return (
        <Navbar>
            <NavbarContainer>
                <div className="">
                    <Link to="/">
                        <NavbarIcon src={image} alt=""/>
                    </Link>
                </div>
                <NavbarItemsContainer>
                    {user != undefined ?( 
                        <>
                            <li><Link to="/logout">Logout</Link></li>
                        </>
                    ) : (
                        <>
                            <li>
                            <Link to="/login">
                                <TransparentButton>
                                    <div className="flex gap-3">
                                        <FaUser size={14}/>
                                        <p>Log in</p>
                                    </div>
                                </TransparentButton>
                            </Link>
                            </li>
                            <li><Link to="/register"><PrimaryButton>Register</PrimaryButton></Link></li>
                        </>
                    )}
                </NavbarItemsContainer>
            </NavbarContainer>
            <SecondNavbarContainer>
                <div className="">
                    <SecondNavbarItemContainer>
                        <li><Link to="">Hotels</Link></li>
                        <li><Link to="">Flights</Link></li>
                    </SecondNavbarItemContainer>
                </div>
            </SecondNavbarContainer>
        </Navbar>
    )
}