import React from "react";

import "../styles.scss";

import { StepComponentProps } from "react-step-builder";
import { Link } from "react-router-dom";

const ThirdStep: React.FC<StepComponentProps> = (props: StepComponentProps) => {
  return (
    <div className="step-container">
      <h1>Congrats!</h1>
      <p>You can start using MComics now</p>

      <Link to="/">
        <button>Get started</button>
      </Link>
    </div>
  );
};

export default ThirdStep;
