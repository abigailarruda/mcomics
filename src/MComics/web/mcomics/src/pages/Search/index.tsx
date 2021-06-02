import React, { useContext, useEffect } from "react";

import Comic from "../../models/Comic";
import Character from "../../models/Character";

import { useLocation } from "react-router-dom";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { ComicContext } from "../../contexts/ComicContext";
import { CharacterContext } from "../../contexts/CharacterContext";

import { v4 as uuidv4 } from "uuid";

import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import "./styles.scss";

import { EventContext } from "../../contexts/EventContext";
import Event from "../../models/Event";

function Search() {
  const { getEventsByName, searchedEvents } = useContext(EventContext);

  const { getComicsByName, searchedComics } = useContext(ComicContext);

  const { getCharactersByName, searchedCharacters } =
    useContext(CharacterContext);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("q");

    trackPromise(getCharactersByName(searchParams || ""));

    trackPromise(getComicsByName(searchParams || ""));

    trackPromise(getEventsByName(searchParams || ""));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      <Navbar />

      <div className="search-container">
        <section className="comics-container">
          <h2>Comics</h2>

          <hr />

          <Loader />

          {!searchedComics.length && !promiseInProgress && (
            <p className="not-found">
              It seems we can’t find any results based on your search.
            </p>
          )}

          <div className="comics">
            {searchedComics &&
              searchedComics.map((comic: Comic) => {
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

          {!searchedEvents.length && !promiseInProgress && (
            <p className="not-found">
              It seems we can’t find any results based on your search.
            </p>
          )}

          <Loader />

          <div className="events">
            {searchedEvents &&
              searchedEvents.map((event: Event) => {
                return (
                  <Card
                    key={uuidv4()}
                    type="event"
                    id={event.id || 0}
                    title={event.title}
                    thumbnail={event.image}
                  />
                );
              })}
          </div>
        </section>

        <section className="characters-container">
          <h2>Characters</h2>

          <hr />

          <Loader />

          {!searchedCharacters.length && !promiseInProgress && (
            <p className="not-found">
              It seems we can’t find any results based on your search.
            </p>
          )}

          <div className="characters">
            {searchedCharacters &&
              searchedCharacters.map((character: Character) => {
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
