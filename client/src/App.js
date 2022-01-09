import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";
import AuthContextProvider from "./contexts/AuthContext";
import Home from "./view/Home";
import Login from "./view/Login";

function App() {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
