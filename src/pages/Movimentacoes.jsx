import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  TextField, Button, Card, CardContent, Typography, Box,
  Select, MenuItem, FormControl, InputLabel, Grid, Chip,
  Divider, Alert,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { registrarMovimentacao, getMovimentacoes } from "../services/movimentacaoService";
import { getInsumos } from "../services/insumoService";

export default function Movimentacoes() {
  const [insumoId, setInsumoId] = useState("");
  const [tipo, setTipo] = useState("entrada");
  const [quantidade, setQuantidade] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);

  useEffect(() => {
    setInsumos(getInsumos());
    setMovimentacoes(getMovimentacoes());
  }, []);

  const handleMov = () => {
    if (!insumoId || !quantidade || Number(quantidade) <= 0) {
      alert("Selecione um insumo e informe uma quantidade válida.");
      return;
    }
    const estoqueAlerta = registrarMovimentacao({
      insumoId: Number(insumoId),
      tipo,
      quantidade: Number(quantidade),
      finalidade,
    });
    setAlerta(estoqueAlerta);
    setSucesso(true);
    setInsumoId("");
    setQuantidade("");
    setFinalidade("");
    setInsumos(getInsumos());
    setMovimentacoes(getMovimentacoes());
    setTimeout(() => setSucesso(false), 3000);
  };

  const nomePorId = (id) => insumos.find((i) => i.id === id)?.nome || id;

  return (
    <Layout>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Movimentações
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <SwapHorizIcon color="primary" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Registrar Movimentação
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {sucesso && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Movimentação registrada com sucesso!
                </Alert>
              )}
              {alerta && (
                <Alert severity="warning" sx={{ mb: 2 }} icon={<span>⚠️</span>}>
                  Atenção: estoque abaixo do mínimo após esta movimentação!
                </Alert>
              )}

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Insumo *</InputLabel>
                <Select
                  value={insumoId}
                  label="Insumo *"
                  onChange={(e) => setInsumoId(e.target.value)}
                  size="small"
                >
                  {insumos.map((i) => (
                    <MenuItem key={i.id} value={i.id}>
                      {i.nome} ({i.quantidade} un.)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tipo *</InputLabel>
                <Select value={tipo} label="Tipo *" onChange={(e) => setTipo(e.target.value)} size="small">
                  <MenuItem value="entrada">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ArrowUpwardIcon fontSize="small" sx={{ color: "#0F8A5F" }} />
                      Entrada
                    </Box>
                  </MenuItem>
                  <MenuItem value="saida">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ArrowDownwardIcon fontSize="small" sx={{ color: "#E65100" }} />
                      Saída
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth label="Quantidade *" type="number"
                value={quantidade} onChange={(e) => setQuantidade(e.target.value)}
                sx={{ mb: 2 }} inputProps={{ min: 1 }}
              />
              <TextField
                fullWidth label="Finalidade"
                value={finalidade} onChange={(e) => setFinalidade(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Button fullWidth variant="contained" onClick={handleMov} startIcon={<SwapHorizIcon />}>
                Registrar
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Histórico de Movimentações
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {movimentacoes.length === 0 && (
                <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
                  <Typography>Nenhuma movimentação registrada ainda.</Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[...movimentacoes].reverse().map((m) => (
                  <Box
                    key={m.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: m.tipo === "entrada" ? "#F1F8E9" : "#FFF3E0",
                      border: `1px solid ${m.tipo === "entrada" ? "#A5D6A7" : "#FFCC80"}`,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      {m.tipo === "entrada" ? (
                        <ArrowUpwardIcon sx={{ color: "#2E7D32", fontSize: 20 }} />
                      ) : (
                        <ArrowDownwardIcon sx={{ color: "#E65100", fontSize: 20 }} />
                      )}
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {nomePorId(m.insumo_id)}
                        </Typography>
                        {m.finalidade && (
                          <Typography variant="caption" color="text.secondary">
                            {m.finalidade}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Chip
                        label={`${m.tipo === "entrada" ? "+" : "-"}${m.quantidade} un.`}
                        size="small"
                        color={m.tipo === "entrada" ? "success" : "warning"}
                        variant="outlined"
                      />
                      <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                        {new Date(m.data).toLocaleDateString("pt-BR")}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}
