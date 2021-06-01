import React, { useContext } from "react";

import Comic from "../../models/Comic";
import Character from "../../models/Character";

import { ComicContext } from "../../contexts/ComicContext";
import { CharacterContext } from "../../contexts/CharacterContext";

import { v4 as uuidv4 } from "uuid";

import ReactLoading from "react-loading";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Footer from "../../components/Footer";

import "./styles.scss";

function Home() {
  const { mostPopular } = useContext(ComicContext);
  const { randomCharacters } = useContext(CharacterContext);

  return (
    <>
      <Navbar />

      <div className="container">
        <Header />

        <section className="most-popular-container">
          <h2>Popular comics</h2>

          <hr />

          {mostPopular.length === 1 ? (
            <div className="loader">
              <ReactLoading
                type={"bubbles"}
                color={"#c0ccda"}
                height={40}
                width={40}
              />
            </div>
          ) : (
            <div className="most-popular">
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
          )}
        </section>

        <section className="random-container">
          <h2>Popular characters</h2>

          <hr />

          {randomCharacters.length === 1 ? (
            <div className="loader">
              <ReactLoading
                type={"bubbles"}
                color={"#c0ccda"}
                height={40}
                width={40}
              />
            </div>
          ) : (
            <div className="random-characters">
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
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Home;
