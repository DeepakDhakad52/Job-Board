import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRouteEmp({ children }) {
  const token = Cookies.get("EmployeeToken");

  if (!token) {
    alert("Please Login first as a Employee");
    return <Navigate to="/" />;
  }

  return children;
}
