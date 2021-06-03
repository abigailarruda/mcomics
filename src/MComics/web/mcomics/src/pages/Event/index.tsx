import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { EventContext } from "../../contexts/EventContext";

import { v4 as uuidv4 } from "uuid";

import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import "./styles.scss";
import Event from "../../models/Event";

function EventPage() {
  const { getEventById } = useContext(EventContext);

  const [event, setEvent] = useState<Event>(new Event("", "", "", [], []));

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("id");

    async function getEvent() {
      setEvent(
        await trackPromise(
          getEventById(Number(searchParams) || 0),
          "selectedEvent"
        )
      );
    }

    getEvent();
  }, [getEventById, location.search]);

  const { promiseInProgress } = usePromiseTracker({ area: "selectedEvent" });

  return (
    <>
      <Navbar />

      <Loader area="selectedEvent" />

      {!promiseInProgress && (
        <>
          <div className="event-container">
            <img src={event?.image} alt={event?.title} />

            <div className="event-info">
              <h2>{event?.title}</h2>

              <p>
                {event?.description
                  ? event?.description
                  : "This event has no description yet."}
              </p>

              <h3>Comics</h3>

              <div className="all-comics">
                {!event?.comics.length && (
                  <p>This event has no related comics yet.</p>
                )}

                {event?.comics &&
                  event?.comics.map((comic: any) => {
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

              <h3>Characters</h3>

              <div className="all-characters">
                {!event?.characters.length && (
                  <p>This event has no related characters yet.</p>
                )}

                {event?.characters &&
                  event?.characters.map((character: any) => {
                    return (
                      <Link
                        key={uuidv4()}
                        to={`/character?id=${character.id}`}
                        className="tag"
                      >
                        {character.nome}
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

export default EventPage;
