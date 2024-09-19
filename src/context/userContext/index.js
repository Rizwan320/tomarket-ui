import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  admin: localStorage.getItem("admin") || null,
  isAdmin: false,
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
        isAdmin: user?.isSuperAdmin ? true : false,
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
    localStorage.setItem("admin", null);
    setUser(initialState);
    localStorage.clear();
  };

  const updateUser = (userData, isAdmin = false) => {
    setUser((pre) => {
      return {
        ...pre,
        isAdmin,
        user: userData,
      };
    });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const AdminData = (data) => {
    localStorage.setItem("accessToken", data?.access_token);
    localStorage.setItem("refreshToken", data?.refreshToken);
    const userValue = localStorage.getItem("user");
    const parsedUserValue = userValue ? JSON.parse(userValue) : null;
    localStorage.setItem("admin", JSON.stringify(parsedUserValue));
    updateUser(data, true);
  };

  const stopImpersonate = () => {
    const admin = localStorage.getItem("admin");
    const parsedAdminValue = admin ? JSON.parse(admin) : null;
    localStorage.setItem("user", JSON.stringify(parsedAdminValue));
    updateUser(parsedAdminValue);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, AdminData, stopImpersonate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
