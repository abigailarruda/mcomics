import React, { useContext, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { ComicContext } from "../../contexts/ComicContext";

import { v4 as uuidv4 } from "uuid";

import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import Rating from "react-simple-star-rating";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { Clock, Eye } from "react-feather";

import "./styles.scss";
import Comic from "../../models/Comic";

function ComicPage() {
  const { getComicById } = useContext(ComicContext);

  const location = useLocation();

  const [comic, setComic] = useState<Comic>(
    new Comic("", "", [], "", [], [], [], 0)
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search).get("id");

    async function getComic() {
      setComic(
        await trackPromise(
          getComicById(Number(searchParams) || 0),
          "selectedComic"
        )
      );
    }

    getComic();
  }, [getComicById, location.search]);

  const { promiseInProgress } = usePromiseTracker({ area: "selectedComic" });

  function decideEdition(edition: number) {
    if (edition > 3 && edition < 21) return "th";

    switch (edition % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <Navbar />

      <Loader area="selectedComic" />

      {!promiseInProgress && (
        <>
          <div className="comic-container">
            <img src={comic?.thumbnail} alt={comic?.title} />

            <div className="comic-info">
              <h2>{comic?.title}</h2>

              <h4>
                {comic?.edition}
                {decideEdition(comic?.edition || 1)} edition
              </h4>

              <p>
                {comic?.description
                  ? comic?.description
                  : "This comic has no description yet."}
              </p>

              <h3>Events</h3>

              <div className="all-events">
                {!comic?.events.length && (
                  <p>This comic has no related events yet.</p>
                )}

                {comic?.events &&
                  comic?.events.map((event: any) => {
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

              <h3>Characters</h3>

              <div className="all-characters">
                {!comic?.characters.length && (
                  <p>This comic has no related characters yet.</p>
                )}

                {comic?.characters &&
                  comic?.characters.map((character: any) => {
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

            <div className="user-actions">
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                size={32}
                transition
                fillColor="#ffc82c"
                emptyColor="#8492a6"
              />

              <button disabled>
                <Eye color="#ffffff" size="1rem" />
                <span className="button-text">Read</span>
              </button>

              <button disabled>
                <Clock color="#ffffff" size="1rem" />
                <span className="button-text">Want to read</span>
              </button>
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

export default ComicPage;
