import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";

import "./styles.scss";

interface CardProps {
  id: number;
  type: string;
  title: string;
  thumbnail: string;
}

const Card: React.FC<CardProps> = ({ id, type, title, thumbnail }) => {
  return (
    <Tooltip
      title={title}
      position="top"
      arrow={true}
      arrowSize={"small"}
      size={"small"}
      trigger={"mouseenter"}
    >
      <div className="comic-card">
        <Link to={`/${type}?id=${id}`}>
          <img src={thumbnail} alt={title} />
        </Link>
      </div>
    </Tooltip>
  );
};

export default Card;
