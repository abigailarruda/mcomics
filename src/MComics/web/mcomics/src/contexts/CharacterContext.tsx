import React, { createContext, ReactNode } from "react";

import CharacterController from "../controllers/CharacterController";

import Character from "../models/Character";

import _ from "underscore";

interface CharacterContextData {
  getRandomCharacters(page: number): Promise<Character[]>;
  getCharactersByName(name: string, page: number): Promise<Character[]>;
  getCharacterById(id: number): Promise<Character>;
}

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterContext = createContext({} as CharacterContextData);

export function CharacterProvider({ children }: CharacterProviderProps) {
  async function getRandomCharacters(page: number) {
    const randCharacters = _.sortBy(
      _.sample(await CharacterController.getAllCharacters(page), 8),
      "name"
    );
    return randCharacters;
  }

  async function getCharactersByName(name: string, page: number) {
    const searchedCharacters = await CharacterController.getCharactersByName(
      name,
      page
    );
    return searchedCharacters;
  }

  async function getCharacterById(id: number) {
    return await CharacterController.getCharacterById(id);
  }

  return (
    <CharacterContext.Provider
      value={{
        getRandomCharacters,
        getCharactersByName,
        getCharacterById,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
