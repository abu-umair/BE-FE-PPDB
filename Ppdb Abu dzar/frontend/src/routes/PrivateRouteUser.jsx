import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteUser = () => {
  const auth = useSelector((state) => state.user);
  // return auth ? <Outlet /> : <Navigate to={"/sign-in"} replace />;
  // return auth && auth.roles === "ADMIN" ? <Outlet /> : <Navigate to={"/sign-in"} replace />;

  return auth && auth.roles === "USER" ? <Outlet /> : <Navigate to={"/sign-in"} replace />;
  // return auth && auth.roles === "USER" ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRouteUser;
