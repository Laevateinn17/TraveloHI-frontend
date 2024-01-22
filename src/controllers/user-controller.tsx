import axios, { Axios, AxiosError, HttpStatusCode } from "axios"
import { BACKEND_SERVER } from "../defines/connections"
import { User } from "../interfaces/user"
import { UserAuthData } from "../interfaces/user-auth-data"
import { deleteCookie } from "../contexts/AuthContext"
import { SESSION_COOKIE } from "../defines/defines"

