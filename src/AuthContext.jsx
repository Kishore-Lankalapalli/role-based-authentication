import { createContext, useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { apiUrls } from "./api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("jwt-token") || "");
  const [user, setUser] = useState();

  const fetchUserDetails = async () => {
    try {
      const token = Cookies.get("jwt-token");
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
        Cookies.remove("jwt-token");
        // navigate("/login");
        setUser(null);
      }
    } catch (e) {
      Cookies.remove("jwt-token");
      // navigate("/login");
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
