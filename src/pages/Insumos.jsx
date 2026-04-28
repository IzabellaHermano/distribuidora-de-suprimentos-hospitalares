import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { TextField, Button, Card, Alert } from "@mui/material";
import { getInsumos, addInsumo, buscarInsumos } from "../services/insumoService";

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

      <Card sx={{ padding: 2 }}>
        <TextField name="nome" label="Nome" onChange={handleChange} />
        <TextField name="tipo" label="Tipo" onChange={handleChange} />
        <TextField name="tamanho" label="Tamanho" onChange={handleChange} />
        <TextField name="material" label="Material" onChange={handleChange} />
        <TextField name="quantidade" label="Quantidade" onChange={handleChange} />
        <TextField name="estoqueMinimo" label="Estoque mínimo" onChange={handleChange} />
        <TextField name="validade" label="Validade" type="date" onChange={handleChange} />

        <Button onClick={handleAdd}>Adicionar</Button>
      </Card>

      <TextField label="Buscar" onChange={(e) => setFiltro(e.target.value)} />
      <Button onClick={() => setInsumos(buscarInsumos(filtro))}>Buscar</Button>

      {insumos.map((i) => (
        <Card key={i.id} sx={{ marginTop: 2 }}>
          <p>{i.nome} ({i.tipo})</p>
          <p>{i.quantidade}</p>

          {i.quantidade <= i.estoqueMinimo && (
            <Alert severity="warning">Estoque baixo!</Alert>
          )}
        </Card>
      ))}
    </Layout>
  );
}