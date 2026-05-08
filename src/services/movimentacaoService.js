import { getData, saveData } from "../utils/storage";
import { getUsuarioLogado } from "./authService";

export const getMovimentacoes = () => getData("movimentacoes");

export const registrarMovimentacao = (mov) => {
  const movimentacoes = getData("movimentacoes");
  const insumos = getData("insumos");
  const usuario = getUsuarioLogado();

  const insumo = insumos.find((i) => i.id === mov.insumoId);
  if (!insumo) return false;

  if (mov.tipo === "entrada") {
    insumo.quantidade += mov.quantidade;
  } else {
    insumo.quantidade = Math.max(0, insumo.quantidade - mov.quantidade);
  }

  movimentacoes.push({
    id: Date.now(),
    tipo: mov.tipo,
    quantidade: mov.quantidade,
    data: new Date().toISOString(),
    finalidade: mov.finalidade || "",
    usuario_id: usuario?.id,
    usuario_nome: usuario?.nome,
    insumo_id: mov.insumoId,
  });

  saveData("movimentacoes", movimentacoes);
  saveData("insumos", insumos);

  return insumo.quantidade <= insumo.estoqueMinimo;
};
