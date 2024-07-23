import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const login = (userData) => {
    const { access_token, refreshToken, ...user } = userData;
    setUser((pre) => {
      return {
        ...pre,
        accessToken: access_token,
        refreshToken,
        isAuthenticated: true,
        user: user,
      };
    });
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.setItem("accessToken", null);
    localStorage.setItem("refreshToken", null);
    localStorage.setItem("user", null);
    setUser(initialState);
    localStorage.clear();
  };

  const updateUser = (userData) => {
    setUser((pre) => {
      return {
        ...pre,
        user: userData,
      };
    });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
