import React, { createContext, ReactNode } from "react";

import ComicController from "../controllers/ComicController";

import Comic from "../models/Comic";

import _ from "underscore";

interface ComicContextData {
  getAllComics(page: number): Promise<Comic[]>;
  getComicsByName(name: string, page: number): Promise<Comic[]>;
  getComicById(id: number): Promise<Comic>;
}

interface ComicProviderProps {
  children: ReactNode;
}

export const ComicContext = createContext({} as ComicContextData);

export function ComicProvider({ children }: ComicProviderProps) {
  async function getAllComics(page: number) {
    const allComics = _.sample(await ComicController.getAllComics(page), 24);
    return allComics;
  }

  async function getComicsByName(name: string, page: number) {
    const searchedComics = await ComicController.getComicsByName(name, page);
    return searchedComics;
  }

  async function getComicById(id: number) {
    return await ComicController.getComicById(id);
  }

  return (
    <ComicContext.Provider
      value={{
        getAllComics,
        getComicsByName,
        getComicById,
      }}
    >
      {children}
    </ComicContext.Provider>
  );
}
