import styled from "@emotion/styled";
import { DefaultProps } from "../interfaces/default-props";
import { NavigationBar } from "../navigations/navigation-bar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetAuthContext } from "../contexts/AuthContext";
import { GetThemeContext } from "../contexts/ThemeContext";


export const MainTemplate: React.FC<DefaultProps> = ({children}) => {
    const {color} = GetThemeContext()
    
    const Template = styled.div`
    width: 100%;
    min-height: 100vh;
    `

    const InnerTemplate = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    max-width: 100vw;
    `

    const ChildrenTemplate = styled.div`
        // flex-grow: 1;
        // display: flex;
        // flex-direction: column;
    `

    return (
        <Template className="">           
            <InnerTemplate style={{backgroundColor: color}}>
                <NavigationBar/>
                <ChildrenTemplate>
                    {children}
                </ChildrenTemplate>
            </InnerTemplate>
        </Template>)
}