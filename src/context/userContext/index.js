import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const initialState = {
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  admin: JSON.parse(localStorage.getItem("admin")) || null,
  isImpersonating: !!localStorage.getItem("admin"),
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
        isImpersonating: user?.isSuperAdmin ? true : false,
      };
    });
    if (user?.isSuperAdmin) {
      localStorage.setItem("admin", JSON.stringify(user));
    }
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

  const updateUser = (userData, isImpersonating = user?.isSuperAdmin) => {
    setUser((pre) => {
      return {
        ...pre,
        isImpersonating,
        user: userData,
      };
    });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const adminData = (data) => {
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
    <UserContext.Provider value={{ user, login, logout, updateUser, adminData, stopImpersonate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
