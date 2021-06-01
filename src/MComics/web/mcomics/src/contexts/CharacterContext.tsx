import React, { createContext, useState, ReactNode, useEffect } from "react";

import CharacterController from "../controllers/CharacterController";

import Character from "../models/Character";

import _ from "underscore";

interface CharacterContextData {
  //character: Character;
  randomCharacters: Character[];
  searchedCharacters: Character[];
  getCharactersByName(name: string): void;
}

interface CharacterProviderProps {
  children: ReactNode;
}

export const CharacterContext = createContext({} as CharacterContextData);

export function CharacterProvider({ children }: CharacterProviderProps) {
  const initialCharacter = new Character(
    "Deathbird",
    "Descrição",
    "http://i.annihil.us/u/prod/marvel/i/mg/2/60/4c004041be770/standard_fantastic.jpg",
    [],
    []
  );

  //const [character, setCharacter] = useState(initialCharacter);
  const [randomCharacters, setRandomCharacters] = useState<Character[]>([
    initialCharacter,
  ]);

  const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);

  async function getRandomCharacters() {
    const randCharacters = _.sample(
      await CharacterController.getAllCharacters(),
      8
    );
    setRandomCharacters(_.sortBy(randCharacters, "name"));
  }

  async function getCharactersByName(name: string) {
    setSearchedCharacters(await CharacterController.getCharactersByName(name));
  }

  useEffect(() => {
    getRandomCharacters();
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
