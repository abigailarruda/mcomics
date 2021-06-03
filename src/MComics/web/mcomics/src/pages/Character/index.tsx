import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { CharacterContext } from "../../contexts/CharacterContext";

import { v4 as uuidv4 } from "uuid";

import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import "./styles.scss";
import Character from "../../models/Character";

function CharacterPage() {
  const { getCharacterById } = useContext(CharacterContext);

  const [character, setCharacter] = useState<Character>(
    new Character("", "", "", [], [])
  );

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("id");

    async function getCharacter() {
      setCharacter(
        await trackPromise(
          getCharacterById(Number(searchParams) || 0),
          "selectedCharacter"
        )
      );
    }

    getCharacter();
  }, [getCharacterById, location.search]);

  const { promiseInProgress } = usePromiseTracker({
    area: "selectedCharacter",
  });

  return (
    <>
      <Navbar />

      <Loader area="selectedCharacter" />

      {!promiseInProgress && (
        <>
          <div className="character-container">
            <img src={character?.image} alt={character?.name} />

            <div className="character-info">
              <h2>{character?.name}</h2>

              <p>
                {character?.description
                  ? character?.description
                  : "This character has no description yet."}
              </p>

              <h3>Events</h3>

              <div className="all-events">
                {!character?.events.length && (
                  <p>This character has no related events yet.</p>
                )}

                {character?.events &&
                  character?.events.map((event: any) => {
                    return (
                      <Link
                        key={uuidv4()}
                        to={`/event?id=${event.id}`}
                        className="tag"
                      >
                        {event.nome}
                      </Link>
                    );
                  })}
              </div>

              <h3>Comics</h3>

              <div className="all-comics">
                {!character?.comics.length && (
                  <p>This character has no related comics yet.</p>
                )}

                {character?.comics &&
                  character?.comics.map((comic: any) => {
                    return (
                      <Link
                        key={uuidv4()}
                        to={`/comic?id=${comic.id}`}
                        className="tag"
                      >
                        {comic.nome}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default CharacterPage;
