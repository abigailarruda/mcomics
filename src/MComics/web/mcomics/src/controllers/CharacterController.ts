import Character from "../models/Character";

import { api } from "../services/api";

export default class CharacterController {
  static async getAllCharacters() {
    const { data } = await api.get("/api/personagens/BuscarListaPersonagens1");

    const Characters: Character[] = [];

    for (const d of data) {
      const character = new Character(
        d.nome,
        d.descricao,
        d.imagem + "/standard_fantastic.jpg",
        d.quadrinhos,
        d.eventos
      );

      character.setCharacterId(d.id);

      Characters.push(character);
    }

    return Characters;
  }

  static async getCharactersByName(name: string) {
    const { data } = await api.get("/api/personagens/BuscarListaPersonagens1", {
      params: { nome: name },
    });

    const Characters: Character[] = [];

    for (const d of data) {
      const character = new Character(
        d.nome,
        d.descricao,
        d.imagem + "/standard_fantastic.jpg",
        d.quadrinhos,
        d.eventos
      );

      character.setCharacterId(d.id);

      Characters.push(character);
    }

    return Characters;
  }
}
