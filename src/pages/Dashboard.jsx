import React from "react";
import Layout from "../components/Layout";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { getInsumos } from "../services/insumoService";
import { getUsuarioLogado, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const insumos = getInsumos();
  const navigate = useNavigate();

  const user = getUsuarioLogado();

  const estoqueBaixo = insumos.filter(
    (i) => i.quantidade <= i.estoqueMinimo
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <h2>Dashboard</h2>

      <h3>Bem-vinda, {user?.nome}</h3>

      <Button variant="outlined" onClick={handleLogout}>
        Sair
      </Button>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card sx={{ width: 200 }}>
          <CardContent>
            <Typography>Total de Insumos</Typography>
            <Typography variant="h5">{insumos.length}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 200 }}>
          <CardContent>
            <Typography>Estoque Baixo</Typography>
            <Typography variant="h5">{estoqueBaixo.length}</Typography>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}