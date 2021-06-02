import React, { createContext, useState, ReactNode, useEffect } from "react";

import CharacterController from "../controllers/CharacterController";

import Character from "../models/Character";

import _ from "underscore";
import { trackPromise } from "react-promise-tracker";

interface CharacterContextData {
  //character: Character;
  randomCharacters: Character[];
  searchedCharacters: Character[];
  getCharactersByName(name: string): Promise<unknown>;
}

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterContext = createContext({} as CharacterContextData);

export function CharacterProvider({ children }: CharacterProviderProps) {
  //const [character, setCharacter] = useState(initialCharacter);
  const [randomCharacters, setRandomCharacters] = useState<Character[]>([]);

  const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);

  async function getRandomCharacters() {
    setRandomCharacters([]);
    const randCharacters = _.sample(
      await CharacterController.getAllCharacters(),
      8
    );
    setRandomCharacters(_.sortBy(randCharacters, "name"));
  }

  async function getCharactersByName(name: string) {
    setSearchedCharacters([]);
    setSearchedCharacters(await CharacterController.getCharactersByName(name));
  }

  useEffect(() => {
    trackPromise(getRandomCharacters());
  }, []);

  return (
    <CharacterContext.Provider
      value={{
        /* Character, */ randomCharacters,
        searchedCharacters,
        getCharactersByName,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
