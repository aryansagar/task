
import Header from "./components/Header.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home.jsx"
import { useState } from "react"
function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
