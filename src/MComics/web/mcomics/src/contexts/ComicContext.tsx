import React, { createContext, useState, ReactNode, useEffect } from "react";

import ComicController from "../controllers/ComicController";

import Character from "../models/Character";
import Comic from "../models/Comic";
import Event from "../models/Event";

import _ from "underscore";

interface ComicContextData {
  //comic: Comic;
  mostPopular: Comic[];
}

interface ComicProviderProps {
  children: ReactNode;
}

export const ComicContext = createContext({} as ComicContextData);

export function ComicProvider({ children }: ComicProviderProps) {
  const initialComic = new Comic(
    "Essential Iron Man Vol. 2 (Trade Paperback)",
    "Descrição",
    ["URL1", "URL2"],
    "http://i.annihil.us/u/prod/marvel/i/mg/c/00/4bc6b23923edb",
    ["Criador"],
    [new Character("Nome", "Descrição", "URL", [], [])],
    [new Event("Título", "Descrição", "URL", [], [])],
    10
  );

  //const [comic, setComic] = useState(initialComic);
  const [mostPopular, setMostPopular] = useState<Comic[]>([initialComic]);

  async function getMostPopular() {
    const mostPop = _.sample(await ComicController.getAllComics(), 16);
    setMostPopular(mostPop);
  }

  useEffect(() => {
    getMostPopular();
  }, []);

  return (
    <ComicContext.Provider value={{ /* comic, */ mostPopular }}>
      {children}
    </ComicContext.Provider>
  );
}
