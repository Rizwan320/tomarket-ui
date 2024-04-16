import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "context/userContext";

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  return user?.email ? children : <Navigate to="/authentication/sign-in" />;
};

export default PrivateRoute;
