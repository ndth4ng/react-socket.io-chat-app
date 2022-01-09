import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const {
    auth: { isAuthenticated },
    loginUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    // Check auth user
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(loginData);
  };
  return (
    <div className="flex h-screen bg-gray-700">
      <div className="w-full max-w-md px-16 py-10 m-auto bg-white rounded-lg">
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
          Log in to your account 🔐
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Username</label>
            <input
              name="username"
              type="text"
              className="w-full p-2 mb-4 text-sm transition duration-150 ease-in-out border rounded-md outline-none text-primary"
              placeholder="Your Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              className="w-full p-2 mb-4 text-sm transition duration-150 ease-in-out border rounded-md outline-none text-primary"
              placeholder="Your Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button className="px-6 py-2 text-sm text-white bg-green-500 rounded">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
