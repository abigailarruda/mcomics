import Event from "../models/Event";

import { api } from "../services/api";

export default class EventController {
  static async getAllEvents() {
    const { data } = await api.get("/api/personagens/BuscarListaEventos1");

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

  static async getEventsByName(name: string) {
    const { data } = await api.get("/api/personagens/BuscarListaEventos1", {
      params: { nome: name },
    });

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
}
