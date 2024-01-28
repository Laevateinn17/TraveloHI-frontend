import image from "../assets/logo-1.png"
import { Link, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { PrimaryButton } from "../components/primary-button";
import { TransparentButton } from "../components/transparent-button";
import { FaUser } from "react-icons/fa";
import "../styles/main.scss"
import { GetAuthContext } from "../contexts/AuthContext";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { GetThemeContext } from "../contexts/ThemeContext";
import { UserRole } from "../enums/user-role";

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0.5rem 10vw;
    font-size: 1rem;
    border-bottom: 1px solid rgba(104,113,118,0.25);
    z-index: 2;
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
    z-index: 1;
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

const ThemeToggleContainer = styled.div`
    // position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
    overflow:hidden;
    cursor: pointer;
`

const NavbarPadding = styled.div`
    height: 64px;
    background-color: transparent;
`

const SecondNavbarPadding = styled.div`
    height: 33px;
    background-color: transparent;
`



export const NavigationBar = () => {
    const {user} = GetAuthContext()
    const { theme, toggleTheme, fontColor} = GetThemeContext()
    const location = useLocation()

    const links = ['/login', '/register']

    
    return (
        <>
        <Navbar>
            <NavbarContainer className={theme == "dark" ? 'dark-theme' : 'light-theme'}>
                <div className="">
                    <Link to="/">
                        <NavbarIcon src={image} alt=""/>
                    </Link>
                </div>
                <NavbarItemsContainer >
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
                                        <FaUser size={14} color={fontColor}/>
                                        <p style={{color: fontColor}}>Log in</p>
                                    </div>
                                </TransparentButton>
                            </Link>
                            </li>
                            <li><Link to="/register"><PrimaryButton>Register</PrimaryButton></Link></li>
                        </>
                    )}
                    <ThemeToggleContainer onClick={() => toggleTheme()}>
                        <BsMoonStars className={`theme-icon ${theme != 'dark' ? 'inactive-theme' : ''}`}/>
                        <BsSun className={`theme-icon ${theme != 'light' ? 'inactive-theme' : ''}`} fontSize={"1.1rem"}/>
                        {/* </div> */}
                    </ThemeToggleContainer>
                </NavbarItemsContainer>
            </NavbarContainer>
            {!links.includes(location.pathname) && (!user || user.role == UserRole.Customer) && 
            <>
            <SecondNavbarContainer className={`${theme == "dark" ? "dark-theme" : ''}`}>
                <div className="">
                    <SecondNavbarItemContainer>
                        <li><Link to="">Hotels</Link></li>
                        <li><Link to="/flights">Flights</Link></li>
                    </SecondNavbarItemContainer>
                </div>
            </SecondNavbarContainer>
            </>}
            {!links.includes(location.pathname) && user?.role == UserRole.Admin && 
            <>
            <SecondNavbarContainer>
                <div className="">
                    <SecondNavbarItemContainer>
                        <li><Link to="/add-flight">Add Flight</Link></li>
                    </SecondNavbarItemContainer>
                </div>
            </SecondNavbarContainer>
            </>
            }
        </Navbar>
        <NavbarPadding></NavbarPadding>
            {!links.includes(location.pathname) && <SecondNavbarPadding/>}
        </>
    )
}