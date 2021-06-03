import React, { createContext, ReactNode } from "react";

import EventController from "../controllers/EventController";

import Event from "../models/Event";

interface EventContextData {
  getEventsByName(name: string, page: number): Promise<Event[]>;
  getEventById(id: number): Promise<Event>;
}

interface EventProviderProps {
  children: ReactNode;
}

export const EventContext = createContext({} as EventContextData);

export function EventProvider({ children }: EventProviderProps) {
  async function getEventsByName(name: string, page: number) {
    const searchedEvents = await EventController.getEventsByName(name, page);
    return searchedEvents;
  }

  async function getEventById(id: number) {
    return await EventController.getEventById(id);
  }

  return (
    <EventContext.Provider value={{ getEventsByName, getEventById }}>
      {children}
    </EventContext.Provider>
  );
}
