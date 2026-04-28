import React, { useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { cadastrarUsuario } from "../services/authService";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    cadastrarUsuario({ nome, email, senha });
    alert("Usuário cadastrado!");
  };

  return (
    <Card sx={{ padding: 2 }}>
      <h2>Cadastrar Usuário</h2>
      <TextField label="Nome" fullWidth onChange={(e) => setNome(e.target.value)} />
      <TextField label="Email" fullWidth onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Senha" type="password" fullWidth onChange={(e) => setSenha(e.target.value)} />
      <Button variant="contained" onClick={handleCadastro}>Cadastrar</Button>
    </Card>
  );
}