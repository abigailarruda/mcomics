import React, { useContext, useEffect, useState } from "react";

import Comic from "../../models/Comic";
import Character from "../../models/Character";

import { ComicContext } from "../../contexts/ComicContext";
import { CharacterContext } from "../../contexts/CharacterContext";

import { v4 as uuidv4 } from "uuid";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import "./styles.scss";

function Home() {
  const { getAllComics } = useContext(ComicContext);
  const { getRandomCharacters } = useContext(CharacterContext);

  const [currentPage, setCurrentPage] = useState(1);

  const [comics, setComics] = useState<Comic[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    async function getComics() {
      setComics([
        ...comics,
        ...(await trackPromise(getAllComics(currentPage), "comics")),
      ]);
    }

    getComics();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    async function getCharacters() {
      setCharacters(await trackPromise(getRandomCharacters(1), "characters"));
    }

    getCharacters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const comicsPromise = usePromiseTracker({ area: "comics" });

  return (
    <>
      <Navbar />

      <div className="container">
        <Header />

        <section className="most-popular-container">
          <h2>Popular comics</h2>

          <hr />

          <div className="most-popular">
            {comics.map((comic: Comic) => {
              return (
                <Card
                  key={uuidv4()}
                  type="comic"
                  id={comic.id || 0}
                  title={comic.title}
                  thumbnail={comic.thumbnail}
                />
              );
            })}
          </div>

          <Loader area={"comics"} />

          {comics.length > 0 && !comicsPromise.promiseInProgress && (
            <div className="button-show-more">
              <button
                disabled={comics.length < 24}
                className="show-more"
                onClick={() => {
                  setCurrentPage(currentPage + 1);
                }}
              >
                Show more
              </button>
            </div>
          )}
        </section>

        <section className="random-container">
          <h2>Popular characters</h2>

          <hr />

          <div className="random-characters">
            {characters.map((character: Character) => {
              return (
                <Card
                  key={uuidv4()}
                  type="character"
                  id={character.id || 0}
                  title={character.name}
                  thumbnail={character.image}
                />
              );
            })}
          </div>

          <Loader area="characters" />
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;
