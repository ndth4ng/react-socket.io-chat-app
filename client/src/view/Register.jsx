import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({
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
    setRegisterData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // loginUser(loginData);
  };
  return (
    <div className="flex h-screen bg-gray-700">
      <div className="w-full max-w-md px-16 py-10 m-auto bg-white rounded-lg">
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
          Register your account 🔐
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
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              name="confirm-password"
              type="password"
              className="w-full p-2 mb-4 text-sm transition duration-150 ease-in-out border rounded-md outline-none text-primary"
              placeholder="Your confirm Password"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <button className="px-6 py-2 text-sm text-white bg-green-500 rounded">
              Register
            </button>
          </div>
          <div className="flex justify-between mt-6">
            <p>Already have an account?</p>
            <Link to="/login">
              <button className="px-4 py-1 text-sm text-white bg-green-500 rounded">
                Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
