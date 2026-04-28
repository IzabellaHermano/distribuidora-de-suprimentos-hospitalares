import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Insumos from "./pages/Insumos";
import Movimentacoes from "./pages/Movimentacoes";
import CadastroUsuario from "./pages/CadastroUsuario";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insumos" element={<Insumos />} />
        <Route path="/movimentacoes" element={<Movimentacoes />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}