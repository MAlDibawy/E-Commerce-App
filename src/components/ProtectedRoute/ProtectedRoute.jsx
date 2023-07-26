import React from "react";
import styles from "./ProtectedRoute.module.css";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
}
