import { getData, saveData } from "../utils/storage";

export const getInsumos = () => getData("insumos");

export const addInsumo = (insumo) => {
  const insumos = getData("insumos");
  insumo.id = Date.now();
  insumos.push(insumo);
  saveData("insumos", insumos);
};

export const deleteInsumo = (id) => {
  let insumos = getData("insumos");
  insumos = insumos.filter((i) => i.id !== id);
  saveData("insumos", insumos);
};

export const buscarInsumos = (filtro) => {
  const insumos = getData("insumos");
  return insumos.filter((i) =>
    i.nome.toLowerCase().includes(filtro.toLowerCase())
  );
};