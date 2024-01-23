import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainTemplate } from "./layouts/main-template";
import "./styles/main.scss"
import { HomePage } from "./pages/home-page";
import { RegisterPage } from "./pages/register-page";
import { LoginPage } from "./pages/login-page";
import { AuthProvider } from "./contexts/AuthContext";
import { LogoutPage } from "./pages/logout-page";
import { ForgotPasswordPage } from "./pages/forgot-password-page";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainTemplate>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/logout" element={<LogoutPage/>}/>
            <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
          </Routes>
        </MainTemplate>
    </AuthProvider>
      </BrowserRouter>
  )
}

export default App;
