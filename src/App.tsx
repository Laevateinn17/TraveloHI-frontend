import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainTemplate } from "./layouts/main-template";
import "./styles/main.scss"
import { HomePage } from "./pages/home-page";
import { RegisterPage } from "./pages/register-page";
import { LoginPage } from "./pages/login-page";
import { AuthProvider } from "./contexts/AuthContext";
import { LogoutPage } from "./pages/logout-page";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainTemplate>
          <Routes>
            <Route key={1} path="/" element={<HomePage/>}/>
            <Route key={2} path="/register" element={<RegisterPage/>}/>
            <Route key={3} path="/login" element={<LoginPage/>} />
            <Route key={4} path="/logout" element={<LogoutPage/>}/>
          </Routes>
        </MainTemplate>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
