import React, { useState } from "react";
import {
  Box, Card, CardContent, TextField, Button,
  Typography, InputAdornment, IconButton, Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    setErro("");
    if (!email || !senha) {
      setErro("Preencha e-mail e senha.");
      return;
    }
    if (login(email, senha)) {
      navigate("/dashboard");
    } else {
      setErro("E-mail ou senha incorretos.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D2137 0%, #1B6CA8 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 400, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Box
              sx={{
                display: "inline-flex",
                bgcolor: "#E8F4FD",
                borderRadius: "50%",
                p: 1.5,
                mb: 1.5,
              }}
            >
              <LocalHospitalIcon sx={{ fontSize: 36, color: "#1B6CA8" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0D2137" }}>
              MedStock
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Controle de Insumos Hospitalares
            </Typography>
          </Box>

          {erro && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {erro}
            </Alert>
          )}

          <TextField
            fullWidth
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Senha"
            type={showSenha ? "text" : "password"}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowSenha(!showSenha)}>
                    {showSenha ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{ mb: 1.5, py: 1.2 }}
          >
            Entrar
          </Button>

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/cadastro")}
            sx={{ color: "text.secondary" }}
          >
            Não tem conta? <strong style={{ marginLeft: 4 }}>Cadastre-se</strong>
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
