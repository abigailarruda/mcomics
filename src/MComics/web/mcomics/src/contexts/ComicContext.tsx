import React, { createContext, useState, ReactNode, useEffect } from "react";
import ComicController from "../controllers/ComicController";

import Character from "../models/Character";
import Comic from "../models/Comic";
import Event from "../models/Event";

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
    "Título",
    "Descrição",
    ["URL1", "URL2"],
    "URL",
    ["Criador"],
    [new Character("Nome", "Descrição", "URL", [], [])],
    [new Event("Título", "Descrição", "URL", [], [])],
    10
  );

  //const [comic, setComic] = useState(initialComic);
  const [mostPopular, setMostPopular] = useState<Comic[]>([initialComic]);

  async function getMostPopular() {
    setMostPopular((await ComicController.getAllComics()).slice(0, 6));
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
