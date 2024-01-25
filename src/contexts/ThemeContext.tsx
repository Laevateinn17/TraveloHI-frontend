import { SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { DefaultProps } from "../interfaces/default-props";
import { colors } from "../defines/colors";

interface ThemeContextType {
    theme : string 
    setTheme: React.Dispatch<SetStateAction<string>>
    color: string
    fontColor: string
    toggleTheme: CallableFunction
}

const ThemeContext = createContext<ThemeContextType>(null!)

export const GetThemeContext = () => useContext(ThemeContext)

export const  ThemeProvider: React.FC<DefaultProps> = ({children}) => {

    const [color, setColor] = useState('')
    const [fontColor, setFontColor] = useState('')
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        if (theme == 'dark') {
            setColor(colors.dark)
            setFontColor(colors.light)
        }
        else {
            setColor("#FFFFFF")
            setFontColor("#000000")
        }

    }, [theme])

    const toggleTheme = () => {
        if (theme == 'dark') {
            setTheme('light')
        }
        else {
            setTheme('dark')
        }
        
    }
    
    return (
        <ThemeContext.Provider value={{theme, setTheme, color, fontColor, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}