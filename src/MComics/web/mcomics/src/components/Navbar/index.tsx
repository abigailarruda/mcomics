import React, { useState } from "react";

import { LogOut, Search, User } from "react-feather";

import { Link, useHistory } from "react-router-dom";

import { Tooltip } from "react-tippy";

import "../../../node_modules/react-tippy/dist/tippy.css";
import "./styles.scss";

const Navbar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInput(event: any) {
    const { value } = event.target;
    setSearchInput(value);
  }

  const history = useHistory();

  function submitSearchForm() {
    history.push(`/search?q=${searchInput}`);
  }

  return (
    <nav>
      <h1>
        <Link to="/">
          <span>M</span>Comics
        </Link>
      </h1>

      <div className="search">
        <input
          type="text"
          id="search"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInput}
        />
        <button
          className="search-button"
          onClick={submitSearchForm}
          disabled={!searchInput}
        >
          <Search color="#d3dce6" size="1rem" />
        </button>
      </div>

      <div className="user">
        <Tooltip
          title={true ? "Sign out" : "Sign in"}
          position="bottom"
          arrow={true}
          arrowSize={"small"}
          size={"small"}
          trigger={"mouseenter"}
        >
          <Link to={true ? "/" : "/signin"}>
            <button>
              {true ? (
                <LogOut color="#d3dce6" size="1rem" />
              ) : (
                <User color="#d3dce6" size="1rem" />
              )}
            </button>
          </Link>
        </Tooltip>

        {true ? (
          <Link to="/" className="user-image">
            <img
              src="http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350.jpg"
              alt="Imagem do usuário"
            />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
