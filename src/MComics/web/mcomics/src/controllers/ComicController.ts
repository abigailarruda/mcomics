import Comic from "../models/Comic";

import { api } from "../services/api";

export default class ComicController {
  static async getAllComics() {
    const { data } = await api.get("/api/quadrinho/BuscarListaQuadrinhos1");

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

  static async getComicById(id: number) {
    const { data } = await api.get(`/api/quadrinho/BuscarQuadrinho${id}`);

    const comic = new Comic(
      data.titulo,
      data.descricao,
      data.imagens,
      data.miniatura,
      data.criadores,
      data.personagens,
      data.eventos,
      data.numeroDaEdicao
    );

    comic.setComicId(data.id);

    return comic;
  }
}
