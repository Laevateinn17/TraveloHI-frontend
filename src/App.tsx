import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainTemplate } from "./layouts/main-template";
import "./styles/main.css"
import { HomePage } from "./pages/home-page";
import { RegisterPage } from "./pages/register-page";
function App() {
  return (
    <BrowserRouter>
      <MainTemplate>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </MainTemplate>
    </BrowserRouter>
  )
}

export default App;
