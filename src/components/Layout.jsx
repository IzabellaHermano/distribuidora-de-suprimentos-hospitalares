import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 200;

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={() => navigate("/insumos")}>
            <ListItemText primary="Insumos" />
          </ListItem>

          <ListItem button onClick={() => navigate("/movimentacoes")}>
            <ListItemText primary="Movimentações" />
          </ListItem>
        </List>
      </Drawer>

      <main style={{ flexGrow: 1, padding: 20 }}>{children}</main>
    </div>
  );
}