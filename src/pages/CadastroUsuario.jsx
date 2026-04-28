import React, { useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { cadastrarUsuario } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function CadastroUsuario() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    const novoUsuario = { nome, email, senha };

    cadastrarUsuario(novoUsuario);

    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

    alert("Usuário cadastrado com sucesso!");

    navigate("/dashboard");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <Card sx={{ padding: 3, width: 300 }}>
        <h2>Cadastrar</h2>

        <TextField
          fullWidth
          label="Nome"
          onChange={(e) => setNome(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

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

        <Button fullWidth variant="contained" onClick={handleCadastro}>
          Cadastrar
        </Button>
      </Card>
    </div>
  );
}