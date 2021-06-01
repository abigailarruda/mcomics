import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tippy";

import "./styles.scss";

interface ComicCardProps {
  id: number;
  title: string;
  thumbnail: string;
}

const ComicCard: React.FC<ComicCardProps> = ({ id, title, thumbnail }) => {
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
        <Link to="/">
          <img src={thumbnail} alt={title} />
        </Link>
      </div>
    </Tooltip>
  );
};

export default ComicCard;
