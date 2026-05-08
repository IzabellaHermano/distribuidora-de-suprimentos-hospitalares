import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 220;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Insumos", icon: <InventoryIcon />, path: "/insumos" },
  { label: "Movimentações", icon: <SwapHorizIcon />, path: "/movimentacoes" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0D2137",
            borderRight: "none",
          },
        }}
      >
        <Toolbar sx={{ gap: 1, px: 2, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <LocalHospitalIcon sx={{ color: "#3A8CC9", fontSize: 26 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 700, lineHeight: 1.2, fontSize: 14 }}>
              MedStock
            </Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: 11 }}>
              Controle de Estoque
            </Typography>
          </Box>
        </Toolbar>

        <List sx={{ px: 1, pt: 2 }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: active ? "#fff" : "rgba(255,255,255,0.6)",
                  backgroundColor: active ? "rgba(58,140,201,0.2)" : "transparent",
                  borderLeft: active ? "3px solid #3A8CC9" : "3px solid transparent",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.07)", color: "#fff" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 36, "& svg": { fontSize: 20 } }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 400 }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mt: "auto" }} />
        <Box sx={{ p: 2 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textAlign: "center" }}>
            v1.0 — Insumos Hospitalares
          </Typography>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
