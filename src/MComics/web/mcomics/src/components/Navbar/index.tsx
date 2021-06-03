import React, { useContext, useEffect, useState } from "react";

import { LogOut, Search, User } from "react-feather";

import { Link, useHistory } from "react-router-dom";

import { Tooltip } from "react-tippy";

import "../../../node_modules/react-tippy/dist/tippy.css";
import { UserContext } from "../../contexts/UserContext";
import "./styles.scss";

const Navbar: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [image, setImage] = useState(
    "http://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/standard_fantastic.jpg"
  );

  const { isUserLogged, logOut } = useContext(UserContext);

  function handleSearchInput(event: any) {
    const { value } = event.target;
    setSearchInput(value);
  }

  const history = useHistory();

  function submitSearchForm() {
    history.push(`/search?q=${searchInput}`);
  }

  const storage = localStorage.getItem("user");

  useEffect(() => {
    if (storage) {
      const storageImage = JSON.parse(storage || "");
      setImage(storageImage?.image || image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, storage]);

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
          title={isUserLogged ? "Sign out" : "Sign in"}
          position="bottom"
          arrow={true}
          arrowSize={"small"}
          size={"small"}
          trigger={"mouseenter"}
        >
          <Link
            to={isUserLogged ? "/" : "/signin"}
            onClick={() => {
              if (isUserLogged) {
                logOut();
              }
            }}
          >
            <button>
              {isUserLogged ? (
                <LogOut color="#d3dce6" size="1rem" />
              ) : (
                <User color="#d3dce6" size="1rem" />
              )}
            </button>
          </Link>
        </Tooltip>

        {isUserLogged ? (
          <Link to="/" className="user-image">
            <img src={image} alt="Imagem do usuário" />
          </Link>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
