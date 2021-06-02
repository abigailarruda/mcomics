import Comic from "../models/Comic";

import { api } from "../services/api";

export default class ComicController {
  static async getAllComics() {
    const { data } = await api.get("/api/quadrinho/BuscarListaQuadrinhos1");

    const comics: Comic[] = [];
    // characters: Character[] = [];

    for (const d of data) {
      /* for (const c of d.personagens) {
        const { data } = await api.get(
          `/api/personagens/BuscarPersonagem${c.id}`
        );
         const character = new Character(
          data.nome,
          data.descricao,
          data.imagem,
          data.quadrinhos,
          data.eventos
        );
        character.setCharacterId(c.id);
        characters.push(character); 
      } */
      const comic = new Comic(
        d.titulo,
        d.descricao,
        d.imagens,
        d.miniatura,
        d.criadores,
        d.personagens,
        d.eventos,
        d.numeroDaEdicao
      );

      comic.setComicId(d.id);

      comics.push(comic);
    }

    return comics;
  }

  static async getComicsByName(name: string) {
    const { data } = await api.get("/api/quadrinho/BuscarListaQuadrinhos1", {
      params: { nome: name },
    });

    const comics: Comic[] = [];

    for (const d of data) {
      const comic = new Comic(
        d.titulo,
        d.descricao,
        d.imagens,
        d.miniatura,
        d.criadores,
        d.personagens,
        d.eventos,
        d.numeroDaEdicao
      );

      comic.setComicId(d.id);

      comics.push(comic);
    }

    return comics;
  }
}
