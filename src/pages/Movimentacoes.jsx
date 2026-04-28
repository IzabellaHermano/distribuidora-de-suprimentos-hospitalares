import React, { useState } from "react";
import Layout from "../components/Layout";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { registrarMovimentacao } from "../services/movimentacaoService";
import { getInsumos } from "../services/insumoService";

export default function Movimentacoes() {
  const [insumoId, setInsumoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [quantidade, setQuantidade] = useState(0);
  const [finalidade, setFinalidade] = useState("");

  const insumos = getInsumos();

  const handleMov = () => {
    const alerta = registrarMovimentacao({
      insumoId,
      tipo,
      quantidade: Number(quantidade),
      finalidade,
    });

    if (alerta) alert("⚠️ Estoque baixo!");
  };

  return (
    <Layout>
      <h2>Movimentações</h2>

      <Select fullWidth onChange={(e) => setInsumoId(e.target.value)}>
        {insumos.map((i) => (
          <MenuItem key={i.id} value={i.id}>{i.nome}</MenuItem>
        ))}
      </Select>

      <Select fullWidth onChange={(e) => setTipo(e.target.value)}>
        <MenuItem value="entrada">Entrada</MenuItem>
        <MenuItem value="saida">Saída</MenuItem>
      </Select>

      <TextField label="Quantidade" onChange={(e) => setQuantidade(e.target.value)} />
      <TextField label="Finalidade" onChange={(e) => setFinalidade(e.target.value)} />

      <Button onClick={handleMov}>Registrar</Button>
    </Layout>
  );
}