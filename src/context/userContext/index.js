import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (userData) => {
    const { access_token, refreshToken } = userData;
    setUser((pre) => {
      return {
        ...pre,
        accessToken: access_token,
        refreshToken,
        isAuthenticated: true,
        user: userData.userName,
      };
    });
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const logout = () => {
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
    setUser(initialState);
    localStorage.clear();
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
