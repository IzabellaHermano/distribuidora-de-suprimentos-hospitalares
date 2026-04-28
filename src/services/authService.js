import { getData, saveData } from "../utils/storage";

export const cadastrarUsuario = (user) => {
  const usuarios = getData("usuarios");
  user.id = Date.now();
  usuarios.push(user);
  saveData("usuarios", usuarios);
};

export const login = (email, senha) => {
  if (email === "admin@gmail.com" && senha === "admin123") {
    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify({ id: 0, nome: "Admin", email })
    );
    return true;
  }

  const usuarios = getData("usuarios");
  const user = usuarios.find(
    (u) => u.email === email && u.senha === senha
  );

  if (user) {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    return true;
  }

  return false;
};

export const getUsuarioLogado = () => {
  return JSON.parse(localStorage.getItem("usuarioLogado"));
};

export const logout = () => {
  localStorage.removeItem("usuarioLogado");
};