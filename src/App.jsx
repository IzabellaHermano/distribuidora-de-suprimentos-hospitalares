import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insumos from "./pages/Insumos";
import Movimentacoes from "./pages/Movimentacoes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insumos" element={<Insumos />} />
        <Route path="/movimentacoes" element={<Movimentacoes />} />
      </Routes>
    </BrowserRouter>
  );
}