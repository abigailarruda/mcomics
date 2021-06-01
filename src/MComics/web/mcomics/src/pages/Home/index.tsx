import React, { useContext, useEffect } from "react";

import { ComicContext } from "../../contexts/ComicContext";

import { v4 as uuidv4 } from "uuid";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import ComicCard from "../../components/ComicCard";

import "./styles.scss";
import Comic from "../../models/Comic";

function Home() {
  const { mostPopular } = useContext(ComicContext);

  useEffect(() => {
    console.log(mostPopular);
  }, [mostPopular]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Header />
        <section className="most-popular-container">
          <h2>Popular comics</h2>
          <hr />
          <div className="most-popular">
            {mostPopular.map((comic: Comic) => {
              return (
                <ComicCard
                  key={uuidv4()}
                  id={comic.id || 0}
                  title={comic.title}
                  thumbnail={comic.thumbnail}
                />
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
