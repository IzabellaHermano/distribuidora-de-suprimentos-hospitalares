import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Box,
  Typography,
  Chip,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  getInsumos,
  addInsumo,
  deleteInsumo,
  editInsumo,
  buscarInsumos,
} from "../services/insumoService";

const FORM_VAZIO = {
  nome: "",
  tipo: "",
  tamanho: "",
  material: "",
  quantidade: "",
  estoqueMinimo: "",
  validade: "",
};

export default function Insumos() {
  const [insumos, setInsumos] = useState([]);
  const [form, setForm] = useState(FORM_VAZIO);
  const [filtro, setFiltro] = useState("");
  const [editando, setEditando] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmarDelete, setConfirmarDelete] = useState(null);

  useEffect(() => carregar(), []);

  const carregar = () => setInsumos(getInsumos());

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSalvar = () => {
    if (!form.nome || !form.tipo || !form.quantidade || !form.estoqueMinimo) {
      alert(
        "Preencha os campos obrigatórios: Nome, Tipo, Quantidade e Estoque Mínimo.",
      );
      return;
    }
    const dados = {
      ...form,
      quantidade: Number(form.quantidade),
      estoqueMinimo: Number(form.estoqueMinimo),
    };
    if (editando) {
      editInsumo({ ...dados, id: editando });
    } else {
      addInsumo(dados);
    }
    setForm(FORM_VAZIO);
    setEditando(null);
    setDialogOpen(false);
    carregar();
  };

  const handleEditar = (insumo) => {
    setForm({
      nome: insumo.nome || "",
      tipo: insumo.tipo || "",
      tamanho: insumo.tamanho || "",
      material: insumo.material || "",
      quantidade: String(insumo.quantidade),
      estoqueMinimo: String(insumo.estoqueMinimo),
      validade: insumo.validade || "",
    });
    setEditando(insumo.id);
    setDialogOpen(true);
  };

  const handleDeletar = (id) => {
    deleteInsumo(id);
    setConfirmarDelete(null);
    carregar();
  };

  const handleBuscar = () => {
    if (filtro.trim() === "") {
      carregar();
    } else {
      setInsumos(buscarInsumos(filtro));
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5">Insumos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setForm(FORM_VAZIO);
            setEditando(null);
            setDialogOpen(true);
          }}
        >
          Novo Insumo
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Buscar por nome, tipo, tamanho ou material"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleBuscar}
              sx={{ px: 3, whiteSpace: "nowrap" }}
            >
              Buscar
            </Button>
            {filtro && (
              <Button
                variant="outlined"
                onClick={() => {
                  setFiltro("");
                  carregar();
                }}
              >
                Limpar
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {insumos.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6, color: "text.secondary" }}>
          <Typography>Nenhum insumo encontrado.</Typography>
        </Box>
      )}

      <Grid container spacing={2}>
        {insumos.map((i) => {
          const baixo = i.quantidade <= i.estoqueMinimo;
          return (
            <Grid item xs={12} sm={6} md={4} key={i.id}>
              <Card
                sx={{
                  border: baixo ? "1px solid #FFCC80" : undefined,
                  position: "relative",
                }}
              >
                {baixo && (
                  <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                    <Tooltip title="Estoque abaixo do mínimo">
                      <WarningAmberIcon
                        sx={{ color: "#E65100", fontSize: 20 }}
                      />
                    </Tooltip>
                  </Box>
                )}
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, pr: 3, mb: 0.5 }}
                  >
                    {i.nome}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flexWrap: "wrap",
                      mb: 1.5,
                    }}
                  >
                    {i.tipo && (
                      <Chip
                        label={i.tipo}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                    {i.tamanho && (
                      <Chip
                        label={`Tam: ${i.tamanho}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {i.material && (
                      <Chip
                        label={i.material}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Quantidade
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: baixo ? "#E65100" : "inherit",
                        }}
                      >
                        {i.quantidade} un.
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Estoque Mínimo
                      </Typography>
                      <Typography variant="body2">
                        {i.estoqueMinimo} un.
                      </Typography>
                    </Grid>
                    {i.validade && (
                      <Grid item xs={12}>
                        <Typography variant="caption" color="text.secondary">
                          Validade
                        </Typography>
                        <Typography variant="body2">{i.validade}</Typography>
                      </Grid>
                    )}
                  </Grid>

                  {baixo && (
                    <Alert
                      severity="warning"
                      sx={{ mt: 1.5, py: 0 }}
                      icon={<WarningAmberIcon fontSize="small" />}
                    >
                      Estoque abaixo do mínimo
                    </Alert>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 1.5,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEditar(i)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => setConfirmarDelete(i)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog: Adicionar/Editar */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editando ? "Editar Insumo" : "Novo Insumo"}
        </DialogTitle>
        <br />
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nome *"
                name="nome"
                value={form.nome}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tipo *"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tamanho"
                name="tamanho"
                value={form.tamanho}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Material"
                name="material"
                value={form.material}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Quantidade *"
                name="quantidade"
                type="number"
                value={form.quantidade}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Estoque Mínimo *"
                name="estoqueMinimo"
                type="number"
                value={form.estoqueMinimo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Validade"
                name="validade"
                type="date"
                value={form.validade}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& input::-webkit-datetime-edit-fields-wrapper": {
                    display: form.validade ? "flex" : "none",
                  },
                  "& input::-webkit-date-and-time-value": {
                    opacity: form.validade ? 1 : 0,
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button variant="outlined" onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSalvar}>
            {editando ? "Salvar alterações" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: Confirmar exclusão */}
      <Dialog
        open={!!confirmarDelete}
        onClose={() => setConfirmarDelete(null)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Excluir insumo</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja excluir{" "}
            <strong>{confirmarDelete?.nome}</strong>? Esta ação não pode ser
            desfeita.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button variant="outlined" onClick={() => setConfirmarDelete(null)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeletar(confirmarDelete.id)}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}
