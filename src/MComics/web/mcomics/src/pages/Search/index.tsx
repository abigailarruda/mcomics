import React, { useContext } from "react";

import Comic from "../../models/Comic";
import Character from "../../models/Character";

import { ComicContext } from "../../contexts/ComicContext";
import { CharacterContext } from "../../contexts/CharacterContext";

import { v4 as uuidv4 } from "uuid";

import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

import "./styles.scss";
import Loader from "../../components/Loader";

function Search() {
  const { mostPopular } = useContext(ComicContext);
  const { randomCharacters } = useContext(CharacterContext);

  return (
    <>
      <Navbar />

      <div className="search-container">
        <section className="comics-container">
          <h2>Comics</h2>

          <hr />

          <Loader />
          <div className="comics">
            {mostPopular.map((comic: Comic) => {
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
        </section>

        <section className="events-container">
          <h2>Events</h2>

          <hr />

          <Loader />
          <div className="events">
            {mostPopular.map((comic: Comic) => {
              return (
                <Card
                  key={uuidv4()}
                  type="event"
                  id={comic.id || 0}
                  title={comic.title}
                  thumbnail={comic.thumbnail}
                />
              );
            })}
          </div>
        </section>

        <section className="characters-container">
          <h2>Characters</h2>

          <hr />

          <Loader />
          <div className="characters">
            {randomCharacters.map((character: Character) => {
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
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Search;
