import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element= {<LoginPage />} />
              <Route path="/" element={<HomePage/>}/>
              <Route path="/register" element={<RegisterPage/>}/>
          </Routes>
      </BrowserRouter>
     )
}

export default App
