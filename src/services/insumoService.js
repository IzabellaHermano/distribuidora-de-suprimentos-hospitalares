import { getData, saveData } from "../utils/storage";

export const getInsumos = () => getData("insumos");

export const addInsumo = (insumo) => {
  const insumos = getData("insumos");
  insumo.id = Date.now();
  insumos.push(insumo);
  saveData("insumos", insumos);
};

export const editInsumo = (insumoAtualizado) => {
  let insumos = getData("insumos");
  insumos = insumos.map((i) =>
    i.id === insumoAtualizado.id ? { ...i, ...insumoAtualizado } : i
  );
  saveData("insumos", insumos);
};

export const deleteInsumo = (id) => {
  let insumos = getData("insumos");
  insumos = insumos.filter((i) => i.id !== id);
  saveData("insumos", insumos);
};

export const buscarInsumos = (filtro) => {
  const insumos = getData("insumos");
  const f = filtro.toLowerCase();
  return insumos.filter(
    (i) =>
      (i.nome && i.nome.toLowerCase().includes(f)) ||
      (i.tipo && i.tipo.toLowerCase().includes(f)) ||
      (i.tamanho && i.tamanho.toLowerCase().includes(f)) ||
      (i.material && i.material.toLowerCase().includes(f))
  );
};
