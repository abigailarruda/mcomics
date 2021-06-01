import React from "react";

import { Link } from "react-router-dom";

import "./styles.scss";

const Footer: React.FC = () => {
  return (
    <footer>
      <Link to="/">© MComics.</Link>
      <p>Made by Abigail and Jacob. All data from Marvel API.</p>
    </footer>
  );
};

export default Footer;
