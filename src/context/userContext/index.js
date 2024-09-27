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

  const updateUser = (
    userData,
    isImpersonating = user?.isSuperAdmin,
    access_token = user?.accessToken,
    refreshToken = user?.refreshToken
  ) => {
    setUser((pre) => {
      return {
        ...pre,
        isImpersonating,
        user: userData,
        accessToken: access_token,
        refreshToken: refreshToken,
      };
    });
  };

  const impersonate = (data) => {
    const adminAccessToken = localStorage.getItem("accessToken");
    const adminRefreshToken = localStorage.getItem("refreshToken");
    localStorage.setItem("accessToken", data?.access_token);
    localStorage.setItem("refreshToken", data?.refreshToken);
    const userValue = localStorage.getItem("user");
    const parsedUserValue = userValue ? JSON.parse(userValue) : null;
    const object = {
      access_token: adminAccessToken,
      refreshToken: adminRefreshToken,
      user: parsedUserValue,
    };
    localStorage.setItem("admin", JSON.stringify(object));
    localStorage.setItem("user", JSON.stringify(data));
    updateUser(data, true);
  };

  const stopImpersonate = () => {
    const admin = localStorage.getItem("admin");
    const parsedAdminValue = admin ? JSON.parse(admin) : null;
    localStorage.setItem("accessToken", parsedAdminValue?.access_token);
    localStorage.setItem("refreshToken", parsedAdminValue?.refreshToken);
    localStorage.setItem("user", JSON.stringify(parsedAdminValue?.user));
    updateUser(
      parsedAdminValue.user,
      false,
      parsedAdminValue.access_token,
      parsedAdminValue.refreshToken
    );
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser, impersonate, stopImpersonate }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
