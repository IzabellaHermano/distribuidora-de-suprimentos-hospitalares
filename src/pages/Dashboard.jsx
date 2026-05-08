import React from "react";
import Layout from "../components/Layout";
import {
  Card, CardContent, Typography, Button, Box, Chip, Divider,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { getInsumos } from "../services/insumoService";
import { getData } from "../utils/storage";
import { getUsuarioLogado, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

function MetricCard({ icon, label, value, color = "primary.main", bg = "#E8F4FD" }) {
  return (
    <Card sx={{ flex: 1, minWidth: 140 }}>
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ bgcolor: bg, borderRadius: 2, p: 1.2, display: "flex" }}>
          {React.cloneElement(icon, { sx: { fontSize: 28, color } })}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{value}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  const insumos = getInsumos();
  const movimentacoes = getData("movimentacoes");
  const navigate = useNavigate();
  const user = getUsuarioLogado();

  const estoqueBaixo = insumos.filter((i) => i.quantidade <= i.estoqueMinimo);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Box>
          <Typography variant="h5">Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">
            Bem-vinda, <strong>{user?.nome}</strong>
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          color="inherit"
          size="small"
        >
          Sair
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
        <MetricCard
          icon={<InventoryIcon />}
          label="Total de Insumos"
          value={insumos.length}
          color="#1B6CA8"
          bg="#E8F4FD"
        />
        <MetricCard
          icon={<WarningAmberIcon />}
          label="Estoque Baixo"
          value={estoqueBaixo.length}
          color="#E65100"
          bg="#FFF3E0"
        />
        <MetricCard
          icon={<SwapHorizIcon />}
          label="Movimentações"
          value={movimentacoes.length}
          color="#0F8A5F"
          bg="#E8F5E9"
        />
      </Box>

      {estoqueBaixo.length > 0 && (
        <Card sx={{ border: "1px solid #FFCC80" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <WarningAmberIcon sx={{ color: "#E65100" }} />
              <Typography variant="subtitle1" sx={{ color: "#E65100", fontWeight: 600 }}>
                Alertas de Estoque Mínimo
              </Typography>
            </Box>
            <Divider sx={{ mb: 1.5 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {estoqueBaixo.map((i) => (
                <Chip
                  key={i.id}
                  label={`${i.nome} — ${i.quantidade} un.`}
                  color="warning"
                  size="small"
                  variant="outlined"
                  icon={<WarningAmberIcon />}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {estoqueBaixo.length === 0 && insumos.length > 0 && (
        <Card sx={{ border: "1px solid #A5D6A7", bgcolor: "#F1F8E9" }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: "#2E7D32", fontWeight: 500 }}>
              Todos os insumos estão com estoque adequado.
            </Typography>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
}
