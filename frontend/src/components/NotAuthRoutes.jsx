import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function NotAuthRoutes({ isAuth }) {
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
}
