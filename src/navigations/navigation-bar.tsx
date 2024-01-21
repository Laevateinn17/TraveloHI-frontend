import image from "../assets/logo-1.png"
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { PrimaryButton } from "../components/primary-button";
import { TransparentButton } from "../components/transparent-button";
import { FaUser } from "react-icons/fa";
import "../styles/main.scss"
import { useContext, useEffect, useState } from "react";
import { GetAuthContext } from "../contexts/AuthContext";
import { User } from "../interfaces/user";

const NavbarContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0.5rem 0;
    font-size: 1rem;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
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



export const NavigationBar = () => {
    const {user} = GetAuthContext()

    return (
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
    )
}