import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainTemplate } from "./layouts/main-template";
import "./styles/main.scss"
import { HomePage } from "./pages/home-page";
import { RegisterPage } from "./pages/register-page";
import { LoginPage } from "./pages/login-page";
import { AuthProvider } from "./contexts/AuthContext";
import { LogoutPage } from "./pages/logout-page";
import { ForgotPasswordPage } from "./pages/forgot-password-page";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PrivateRoute } from "./components/private-route";
import { UserRole } from "./enums/user-role";
import { AddFlightPage } from "./pages/admin/add-flight-page";
import { FlightPage } from "./pages/flight-page";
import { FlightSearchPage } from "./pages/flight-search-page";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <ThemeProvider>
            <MainTemplate>
                <Routes>
                  <Route path="/" element={<HomePage/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/login" element={<LoginPage/>} />
                  <Route path="/logout" element={<LogoutPage/>}/>
                  <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                  <Route path="/flights" element={<FlightPage/>}/>
                  <Route path="/flights/search" element={<FlightSearchPage/>}/>
                  <Route element={<PrivateRoute role={UserRole.Admin}/>}>
                    <Route path="/add-flight" element={<AddFlightPage/>}/>
                  </Route>
                </Routes>
            </MainTemplate>
          </ThemeProvider>
    </AuthProvider>
      </BrowserRouter>
  )
}

export default App;
