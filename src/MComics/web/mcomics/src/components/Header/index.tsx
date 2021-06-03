import React, { useContext } from "react";

import { ArrowRight } from "react-feather";

import { Link } from "react-router-dom";

import "./styles.scss";

import "../../../node_modules/react-tippy/dist/tippy.css";

import { UserContext } from "../../contexts/UserContext";

const Header: React.FC = () => {
  const { isUserLogged } = useContext(UserContext);

  return (
    <header>
      <h1>
        Track comics you've read.
        <br />
        Save those you want to read.
      </h1>
      <p>
        MComics lets you keep track of every comic you've ever read and rate
        each one on a five-star scale to record and share your reaction.
      </p>

      <button className="call-to-action">
        <Link to={isUserLogged ? "/" : "/signup"}>
          <span>{isUserLogged ? "Track now" : "Get started"}</span>
          <ArrowRight color="#ffffff" size="1rem" />
        </Link>
      </button>
    </header>
  );
};

export default Header;
