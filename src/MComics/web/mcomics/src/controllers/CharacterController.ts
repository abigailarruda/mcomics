import Character from "../models/Character";

import { api } from "../services/api";

export default class CharacterController {
  static async getAllCharacters(page: number) {
    const { data } = await api.get(
      `/api/personagens/BuscarListaPersonagens${page}`
    );

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

  static async getCharactersByName(name: string, page: number) {
    const { data } = await api.get(
      `/api/personagens/BuscarListaPersonagens${page}`,
      {
        params: { nome: name },
      }
    );

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

  static async getCharacterById(id: number) {
    const { data } = await api.get(`/api/personagens/BuscarPersonagem${id}`);

    const character = new Character(
      data.nome,
      data.descricao,
      data.imagem + "/standard_fantastic.jpg",
      data.quadrinhos,
      data.eventos
    );

    character.setCharacterId(data.id);

    return character;
  }
}
