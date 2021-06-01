import React from "react";

import { LogOut, Search, User } from "react-feather";

import { Link } from "react-router-dom";

import { Tooltip } from "react-tippy";

import "../../../node_modules/react-tippy/dist/tippy.css";
import "./styles.scss";

const Navbar: React.FC = () => {
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
          // value={search}
          // onChange={handleSearchInput}
        />
        <button
          className="search-button"
          // onClick={submitSearchForm}
          // disabled={!search}
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
          <button>
            {true ? (
              <LogOut color="#d3dce6" size="1rem" />
            ) : (
              <User color="#d3dce6" size="1rem" />
            )}
          </button>
        </Tooltip>

        {true ? (
          <Link to="/" className="user-image">
            <img
              src="https://uploads.jovemnerd.com.br/wp-content/uploads/2018/10/coreano-friendly-neighborhood-spider-man-1210x540.png"
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
