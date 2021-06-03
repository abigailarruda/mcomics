import React, { useContext, useEffect, useState } from "react";

import { CharacterContext } from "../../../contexts/CharacterContext";

import Character from "../../../models/Character";

import { StepComponentProps } from "react-step-builder";

import { v4 as uuidv4 } from "uuid";

import { Search } from "react-feather";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import Loader from "../../Loader";

import "../styles.scss";

const SecondStep: React.FC<StepComponentProps> = (
  props: StepComponentProps
) => {
  const { getCharactersByName } = useContext(CharacterContext);

  const [selectedItem, setSelectedItem] = useState(0);
  const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);

  function onValueChange(event: any) {
    const { value } = event.target;
    setSelectedItem(value);
  }

  const [search, setSearch] = useState("");

  function handleSearch(event: any) {
    const { value } = event.target;
    setSearch(value);
  }

  async function searchCharacters() {
    setSearchedCharacters(
      await trackPromise(
        getCharactersByName(search || "", 1),
        "characterImages"
      )
    );
  }

  useEffect(() => {}, [searchedCharacters]);

  const { promiseInProgress } = usePromiseTracker({ area: "characterImages" });

  return (
    <div className="step-container">
      <h1>Choose your fighter</h1>
      <p>Search your favorite character for your icon</p>

      <div className="input-search-container">
        <input
          type="text"
          id="character"
          placeholder="Search..."
          className="search"
          value={search}
          onChange={handleSearch}
        />

        <button className="search-button" onClick={searchCharacters}>
          <Search color="#d3dce6" size="1rem" />
        </button>
      </div>

      <Loader area="characterImages" />

      <div className="icons">
        {!promiseInProgress &&
          searchedCharacters &&
          searchedCharacters.map((character: Character) => {
            return (
              <label key={uuidv4()} className="character-card">
                <input
                  id={character.name}
                  type="radio"
                  name="characters"
                  value={selectedItem}
                  onChange={onValueChange}
                />

                <img src={character.image} alt={character.name} />
              </label>
            );
          })}
      </div>

      <button onClick={props.next}>Next</button>
    </div>
  );
};

export default SecondStep;
