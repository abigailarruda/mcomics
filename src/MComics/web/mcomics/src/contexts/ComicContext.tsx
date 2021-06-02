import React, { createContext, useState, ReactNode, useEffect } from "react";

import ComicController from "../controllers/ComicController";

import Comic from "../models/Comic";

import _ from "underscore";
import { trackPromise } from "react-promise-tracker";

interface ComicContextData {
  comic: Comic | null;
  mostPopular: Comic[];
  searchedComics: Comic[];
  getComicsByName(name: string): Promise<unknown>;
  getComicById(id: number): Promise<unknown>;
}

interface ComicProviderProps {
  children: ReactNode;
}

export const ComicContext = createContext({} as ComicContextData);

export function ComicProvider({ children }: ComicProviderProps) {
  const [comic, setComic] = useState<Comic | null>(null);
  const [mostPopular, setMostPopular] = useState<Comic[]>([]);

  const [searchedComics, setSearchedComics] = useState<Comic[]>([]);

  async function getMostPopular() {
    setMostPopular([]);
    const mostPop = _.sample(await ComicController.getAllComics(), 16);
    setMostPopular(mostPop);
  }

  async function getComicsByName(name: string) {
    setSearchedComics([]);
    setSearchedComics(await ComicController.getComicsByName(name));
  }

  async function getComicById(id: number) {
    setComic(await ComicController.getComicById(id));
  }

  useEffect(() => {
    trackPromise(getMostPopular());
  }, []);

  return (
    <ComicContext.Provider
      value={{
        comic,
        searchedComics,
        getComicsByName,
        mostPopular,
        getComicById,
      }}
    >
      {children}
    </ComicContext.Provider>
  );
}
