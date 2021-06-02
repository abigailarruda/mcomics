import React, { createContext, useState, ReactNode, useEffect } from "react";

import ComicController from "../controllers/ComicController";

import Comic from "../models/Comic";

import _ from "underscore";
import { trackPromise } from "react-promise-tracker";

interface ComicContextData {
  //comic: Comic;
  mostPopular: Comic[];
}

interface ComicProviderProps {
  children: ReactNode;
}

export const ComicContext = createContext({} as ComicContextData);

export function ComicProvider({ children }: ComicProviderProps) {
  //const [comic, setComic] = useState(initialComic);
  const [mostPopular, setMostPopular] = useState<Comic[]>([]);

  async function getMostPopular() {
    setMostPopular([]);
    const mostPop = _.sample(await ComicController.getAllComics(), 16);
    setMostPopular(mostPop);
  }

  useEffect(() => {
    trackPromise(getMostPopular());
  }, []);

  return (
    <ComicContext.Provider value={{ /* comic, */ mostPopular }}>
      {children}
    </ComicContext.Provider>
  );
}
