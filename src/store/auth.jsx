import { createContext, useContext, useEffect, useState } from "react";
import { Config } from "../constants/config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [user, setuser] = useState("");
  const authorizationToken = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("Token", serverToken);
  };

  //checking for logged in or not
  let isLoggedIn = !!token;

  // manage logout functionality

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("Token");
  };

  // jwt Authenticate - get current user data

  const userAuthentication = async () => {
    try {
      if (!token) return true;
      const response = await fetch(`${Config.APIUrl}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setuser(data.userData);
      }
    } catch (error) {
      console.log("error in fetching users data");
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeToken, LogoutUser, user, authorizationToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
