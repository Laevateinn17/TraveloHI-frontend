import { HomePage } from "../pages/home-page";
import { NavigationLink } from "./navigation-link";


export const DEFAULT_LINKS: NavigationLink[] = [
    {
        path: '/',
        name: 'Home',
        element: <HomePage/>
    },

]