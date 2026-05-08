import React from "react";
import { Navigate } from "react-router-dom";
import { getUsuarioLogado } from "../services/authService";

export default function PrivateRoute({ children }) {
  const user = getUsuarioLogado();
  return user ? children : <Navigate to="/" replace />;
}
