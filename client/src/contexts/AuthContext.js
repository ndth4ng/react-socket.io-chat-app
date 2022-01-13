import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { authReducer } from "../reducers/authReducer";

import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../constants";
import setAuthToken from "../utils/setAuthToken";

//socket
import io from "socket.io-client";
export const socket = io.connect("http://localhost:5000");

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const [error, setError] = useState({
    isShow: false,
    content: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const res = await axios.get(`${API_URL}/auth/`);

      if (res.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: res.data.user,
          },
        });

        socket.emit("login", res.data.user);
      }
    } catch (err) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  const loginUser = async (loginData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginData);

      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        loadUser();
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const registerUser = async (registerData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, registerData);

      if (res.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, res.data.accessToken);
        loadUser();
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  const setErrorMessage = (message) => {
    setError({
      isShow: true,
      content: message,
    });

    setTimeout(() => {
      setError({
        isShow: false,
        content: null,
      });
    }, 3000); // 3s
  };

  const authContextData = { auth, loginUser, logoutUser, registerUser, error };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
