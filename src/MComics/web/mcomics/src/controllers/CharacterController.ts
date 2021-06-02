import Character from "../models/Character";

import { api } from "../services/api";

export default class CharacterController {
  static async getAllCharacters() {
    const { data } = await api.get("/api/personagens/BuscarListaPersonagens1");

    const characters: Character[] = [];

    for (const d of data) {
      const character = new Character(
        d.nome,
        d.descricao,
        d.imagem + "/standard_fantastic.jpg",
        d.quadrinhos,
        d.eventos
      );

      character.setCharacterId(d.id);

      characters.push(character);
    }

    return characters;
  }

  static async getCharactersByName(name: string) {
    const { data } = await api.get("/api/personagens/BuscarListaPersonagens1", {
      params: { nome: name },
    });

    const characters: Character[] = [];

    for (const d of data) {
      const character = new Character(
        d.nome,
        d.descricao,
        d.imagem + "/standard_fantastic.jpg",
        d.quadrinhos,
        d.eventos
      );

      character.setCharacterId(d.id);

      characters.push(character);
    }

    return characters;
  }
}
