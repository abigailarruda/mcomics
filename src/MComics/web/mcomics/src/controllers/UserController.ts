//import User from "../models/User";
import { api } from "../services/api";

export default class UserController {
  static async createNewUser(
    email: string,
    password: string,
    passwordConfirmation: string
  ) {
    return await api.post("/api/identidade/CriarNovaConta", {
      email: email,
      senha: password,
      senhaConfirmacao: passwordConfirmation,
    });
  }

  static async authUser(email: string, password: string) {
    return await api.post("/api/identidade/Autenticar", {
      email: email,
      senha: password,
    });
  }

  static async setUserImage(id: string, image: string) {
    return await api.post("/api/identidade/InserirImagemUsuario", {
      id,
      url: image,
    });
  }

  static async getUserImage(id: number) {
    const { data } = await api.get(`/api/identidade/BuscarImagemUsuario${id}`);

    return data;
  }
}
