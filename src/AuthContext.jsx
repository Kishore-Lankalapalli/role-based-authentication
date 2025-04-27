import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { apiUrls } from "./api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState();

  const fetchUserDetails = async () => {
    try {
      const token = Cookies.get("jwt-token");

      console.log(token , "token recived")

      const url = apiUrls.fetchUserDetails;

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, options);
      const responseData = await response.json();

      console.log(response, "user response");
      console.log(responseData, "response data");

      if (response.ok) {
        setUser(responseData?.data);
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const state = {
    token,
    setToken,
    user,
    setUser,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};
