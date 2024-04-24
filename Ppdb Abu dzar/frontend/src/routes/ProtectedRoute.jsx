import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = useSelector((state) => state.user);
  // return !auth ? <Outlet /> : <Navigate to={"/homes"} replace />;
  if (!auth) {
    return <Outlet />;
  } else if (auth && auth.roles === "ADMIN") {
    return <Navigate to={"/dashboard/home"} replace />
  } else if (auth && auth.roles === "USER") {
    return <Navigate to={"/menuuser"} replace />
  }
  // return !auth ? <Outlet /> : auth && auth.roles === "ADMIN" ? <Navigate to={"/dashboard/home"} replace /> : <Navigate to={"/homes"} replace />;
};

export default ProtectedRoute;
