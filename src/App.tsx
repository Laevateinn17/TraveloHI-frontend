import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainTemplate } from "./layouts/main-template";
import "./styles/main.scss"
import { HomePage } from "./pages/home-page";
import { RegisterPage } from "./pages/register-page";
import { LoginPage } from "./pages/login-page";
function App() {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  )
}

export default App;
