import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import Home from "./view/Home";
import Login from "./view/Login";
import Register from "./view/Register";
import AppContextProvider from "./contexts/AppContext";

function App() {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default App;
