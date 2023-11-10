import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function PrivateRoute({ children }) {
  const token = Cookies.get("CandidateToken");
  console.log({ val: !token });

  if (!token) {
    alert("Please Login first as a candidate");
    return <Navigate to="/" />;
  }

  return children;
}
