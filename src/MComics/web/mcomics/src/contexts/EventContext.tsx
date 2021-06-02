import React, { createContext, useState, ReactNode } from "react";

import EventController from "../controllers/EventController";

import Event from "../models/Event";

interface EventContextData {
  event: Event | null;
  searchedEvents: Event[];
  getEventsByName(name: string): Promise<unknown>;
  getEventById(id: number): Promise<unknown>;
}

interface EventProviderProps {
  children: ReactNode;
}

export const EventContext = createContext({} as EventContextData);

export function EventProvider({ children }: EventProviderProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [searchedEvents, setSearchedEvents] = useState<Event[]>([]);

  async function getEventsByName(name: string) {
    setSearchedEvents([]);
    setSearchedEvents(await EventController.getEventsByName(name));
  }

  async function getEventById(id: number) {
    setEvent(await EventController.getEventById(id));
  }

  return (
    <EventContext.Provider
      value={{ event, searchedEvents, getEventsByName, getEventById }}
    >
      {children}
    </EventContext.Provider>
  );
}
