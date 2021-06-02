import Comic from "../models/Comic";

import { api } from "../services/api";

export default class ComicController {
  static async getAllComics() {
    const { data } = await api.get("/api/quadrinho/BuscarListaQuadrinhos3");

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
