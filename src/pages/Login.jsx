import React, { useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (login(email, senha)) {
      navigate("/dashboard");
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card sx={{ padding: 3, width: 300 }}>
        <h2>Login</h2>

        <TextField
          fullWidth
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          type="password"
          label="Senha"
          onChange={(e) => setSenha(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <Button fullWidth variant="contained" onClick={handleLogin}>
          Entrar
        </Button>
      </Card>
    </div>
  );
}