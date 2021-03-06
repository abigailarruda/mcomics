import Event from "../models/Event";

import { api } from "../services/api";

export default class EventController {
  static async getAllEvents(page: number) {
    const { data } = await api.get(
      `/api/personagens/BuscarListaEventos${page}`
    );

    const events: Event[] = [];

    for (const d of data) {
      const event = new Event(
        d.titulo,
        d.descricao,
        d.imagem,
        d.quadrinhos,
        d.personagens
      );

      event.setEventId(d.id);

      events.push(event);
    }

    return events;
  }

  static async getEventsByName(name: string, page: number) {
    const { data } = await api.get(
      `/api/personagens/BuscarListaEventos${page}`,
      {
        params: { nome: name },
      }
    );

    const events: Event[] = [];

    for (const d of data) {
      const event = new Event(
        d.titulo,
        d.descricao,
        d.imagem,
        d.quadrinhos,
        d.personagens
      );

      event.setEventId(d.id);

      events.push(event);
    }

    return events;
  }

  static async getEventById(id: number) {
    const { data } = await api.get(`/api/personagens/BuscarEvento${id}`);

    const event = new Event(
      data.titulo,
      data.descricao,
      data.imagem,
      data.quadrinhos,
      data.personagens
    );

    event.setEventId(data.id);

    return event;
  }
}
