import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Grid, TextField, Button, Card, Alert, Box } from "@mui/material";
import {
  getInsumos,
  addInsumo,
  buscarInsumos,
} from "../services/insumoService";

export default function Insumos() {
  const [insumos, setInsumos] = useState([]);
  const [form, setForm] = useState({});
  const [filtro, setFiltro] = useState("");

  useEffect(() => carregar(), []);

  const carregar = () => setInsumos(getInsumos());

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    addInsumo({
      ...form,
      quantidade: Number(form.quantidade),
      estoqueMinimo: Number(form.estoqueMinimo),
    });
    carregar();
  };

  return (
    <Layout>
      <h2>Insumos</h2>

      <Card sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tipo"
              name="tipo"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Tamanho"
              name="tamanho"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Material"
              name="material"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Quantidade"
              name="quantidade"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Estoque mínimo"
              name="estoqueMinimo"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Validade"
              name="validade"
              type="date"
              value={form.validade || ""}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={handleAdd}>
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
        <TextField
          label="Buscar"
          onChange={(e) => setFiltro(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={() => setInsumos(buscarInsumos(filtro))}
        >
          Buscar
        </Button>
      </Box>

      {insumos.map((i) => (
        <Card key={i.id} sx={{ marginTop: 2 }}>
          <p>
            {i.nome} ({i.tipo})
          </p>
          <p>{i.quantidade}</p>

          {i.quantidade <= i.estoqueMinimo && (
            <Alert severity="warning">Estoque baixo!</Alert>
          )}
        </Card>
      ))}
    </Layout>
  );
}
