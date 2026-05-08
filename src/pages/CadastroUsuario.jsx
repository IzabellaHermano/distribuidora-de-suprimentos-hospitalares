import React, { useState } from "react";
import {
  Box, Card, CardContent, TextField, Button,
  Typography, Alert, InputAdornment, IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../services/authService";

export default function CadastroUsuario() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", email: "", senha: "" });
  const [showSenha, setShowSenha] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCadastro = () => {
    setErro("");
    if (!form.nome || !form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (form.senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    cadastrarUsuario(form);
    navigate("/");
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
            <Box sx={{ display: "inline-flex", bgcolor: "#E8F4FD", borderRadius: "50%", p: 1.5, mb: 1.5 }}>
              <LocalHospitalIcon sx={{ fontSize: 36, color: "#1B6CA8" }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#0D2137" }}>
              Criar Conta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Preencha os dados para se cadastrar
            </Typography>
          </Box>

          {erro && <Alert severity="error" sx={{ mb: 2 }}>{erro}</Alert>}

          <TextField
            fullWidth name="nome" label="Nome completo"
            value={form.nome} onChange={handleChange} sx={{ mb: 2 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" color="action" /></InputAdornment> }}
          />
          <TextField
            fullWidth name="email" label="E-mail"
            value={form.email} onChange={handleChange} sx={{ mb: 2 }}
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" color="action" /></InputAdornment> }}
          />
          <TextField
            fullWidth name="senha" label="Senha"
            type={showSenha ? "text" : "password"}
            value={form.senha} onChange={handleChange} sx={{ mb: 3 }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" color="action" /></InputAdornment>,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowSenha(!showSenha)}>
                    {showSenha ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button fullWidth variant="contained" size="large" onClick={handleCadastro} sx={{ mb: 1.5, py: 1.2 }}>
            Cadastrar
          </Button>
          <Button fullWidth variant="text" onClick={() => navigate("/")} sx={{ color: "text.secondary" }}>
            Já tem conta? <strong style={{ marginLeft: 4 }}>Faça login</strong>
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}