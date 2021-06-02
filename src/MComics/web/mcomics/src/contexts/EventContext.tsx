import React, { createContext, useState, ReactNode } from "react";

import EventController from "../controllers/EventController";

import Event from "../models/Event";

//import _ from "underscore";
//import { trackPromise } from "react-promise-tracker";

interface EventContextData {
  //event: Event;
  searchedEvents: Event[];
  getEventsByName(name: string): Promise<unknown>;
}

interface EventProviderProps {
  children: ReactNode;
}

export const EventContext = createContext({} as EventContextData);

export function EventProvider({ children }: EventProviderProps) {
  //const [event, setEvent] = useState(initialEvent);
  const [searchedEvents, setSearchedEvents] = useState<Event[]>([]);

  async function getEventsByName(name: string) {
    setSearchedEvents([]);
    setSearchedEvents(await EventController.getEventsByName(name));
  }

  return (
    <EventContext.Provider
      value={{ /* event, */ searchedEvents, getEventsByName }}
    >
      {children}
    </EventContext.Provider>
  );
}
