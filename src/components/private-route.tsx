import { Outlet, useNavigate } from "react-router-dom"
import { GetAuthContext } from "../contexts/AuthContext"
import { LoginPage } from "../pages/login-page"
import { useEffect } from "react"

interface PrivateRoutesParams {
    role?: string
}

export const PrivateRoute: React.FC<PrivateRoutesParams> = ({role}) => {
    const {user, isAuthenticated} = GetAuthContext()
    const navigate = useNavigate()

    //    if (employee.jobPosition === JobPosition.None) return
    // if (employee.jobPosition === JobPosition.None) return <Navigate to="/"/>
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }

    }, [])
    if (role) {
        return ((user && user.role) === role ? <Outlet/> : <div className="content-container">
        <p>Unauthorized role</p>
    </div>)
    }
    else {
        return <Outlet/>   
    }
}