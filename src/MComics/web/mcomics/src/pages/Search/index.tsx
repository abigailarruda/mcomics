import React, { useContext, useEffect, useState } from "react";

import Comic from "../../models/Comic";
import Character from "../../models/Character";
import Event from "../../models/Event";

import { useLocation } from "react-router-dom";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { ComicContext } from "../../contexts/ComicContext";
import { CharacterContext } from "../../contexts/CharacterContext";
import { EventContext } from "../../contexts/EventContext";

import { v4 as uuidv4 } from "uuid";

import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";

import "./styles.scss";

function Search() {
  const { getEventsByName } = useContext(EventContext);
  const { getComicsByName } = useContext(ComicContext);
  const { getCharactersByName } = useContext(CharacterContext);

  const [searchedComics, setSearchedComics] = useState<Comic[]>([]);
  const [searchedCharacters, setSearchedCharacters] = useState<Character[]>([]);
  const [searchedEvents, setSearchedEvents] = useState<Event[]>([]);

  const [currentComicsPage, setCurrentComicsPage] = useState(1);
  const [currentCharactersPage, setCurrentCharactersPage] = useState(1);
  const [currentEventsPage, setCurrentEventsPage] = useState(1);

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("q");

    async function getComics() {
      setSearchedComics(
        await trackPromise(
          getComicsByName(searchParams || "", 1),
          "searchedComics"
        )
      );
    }

    getComics();

    async function getCharacters() {
      setSearchedCharacters(
        await trackPromise(
          getCharactersByName(searchParams || "", 1),
          "searchedCharacters"
        )
      );
    }

    getCharacters();

    async function getEvents() {
      setSearchedEvents(
        await trackPromise(
          getEventsByName(searchParams || "", 1),
          "searchedEvents"
        )
      );
    }

    getEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("q");

    async function getComics() {
      setSearchedComics([
        ...searchedComics,
        ...(await trackPromise(
          getComicsByName(searchParams || "", currentComicsPage),
          "searchedComics"
        )),
      ]);
    }

    getComics();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentComicsPage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("q");

    async function getCharacters() {
      setSearchedCharacters([
        ...searchedCharacters,
        ...(await trackPromise(
          getCharactersByName(searchParams || "", currentCharactersPage),
          "searchedCharacters"
        )),
      ]);
    }

    getCharacters();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCharactersPage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("q");

    async function getEvents() {
      setSearchedEvents([
        ...searchedEvents,
        ...(await trackPromise(
          getEventsByName(searchParams || "", currentEventsPage),
          "searchedEvents"
        )),
      ]);
    }

    getEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEventsPage]);

  const searchedComicsPromise = usePromiseTracker({ area: "searchedComics" });

  const searchedCharactersPromise = usePromiseTracker({
    area: "searchedCharacters",
  });

  const searchedEventsPromise = usePromiseTracker({
    area: "searchedEvents",
  });

  return (
    <>
      <Navbar />

      <div className="search-container">
        <section className="comics-container">
          <h2>Comics</h2>

          <hr />

          {!searchedComics.length &&
            !searchedComicsPromise.promiseInProgress && (
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

          <Loader area="searchedComics" />

          {searchedComics.length > 0 &&
            !searchedComicsPromise.promiseInProgress && (
              <div className="button-show-more">
                <button
                  disabled={searchedComics.length < 24}
                  className="show-more"
                  onClick={() => {
                    setCurrentComicsPage(currentComicsPage + 1);
                  }}
                >
                  Show more
                </button>
              </div>
            )}
        </section>

        <section className="events-container">
          <h2>Events</h2>

          <hr />

          {!searchedEvents.length &&
            !searchedEventsPromise.promiseInProgress && (
              <p className="not-found">
                It seems we can’t find any results based on your search.
              </p>
            )}

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

          <Loader area="searchedEvents" />

          {searchedEvents.length > 0 &&
            !searchedEventsPromise.promiseInProgress && (
              <div className="button-show-more">
                <button
                  disabled={searchedEvents.length < 24}
                  className="show-more"
                  onClick={() => {
                    setCurrentEventsPage(currentEventsPage + 1);
                  }}
                >
                  Show more
                </button>
              </div>
            )}
        </section>

        <section className="characters-container">
          <h2>Characters</h2>

          <hr />

          {!searchedCharacters.length &&
            !searchedCharactersPromise.promiseInProgress && (
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

          <Loader area="searchedCharacters" />

          {searchedCharacters.length > 0 &&
            !searchedCharactersPromise.promiseInProgress && (
              <div className="button-show-more">
                <button
                  disabled={searchedCharacters.length < 24}
                  className="show-more"
                  onClick={() => {
                    setCurrentCharactersPage(currentCharactersPage + 1);
                  }}
                >
                  Show more
                </button>
              </div>
            )}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Search;
