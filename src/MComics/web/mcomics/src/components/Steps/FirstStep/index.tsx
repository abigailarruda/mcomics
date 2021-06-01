import React, { useState } from "react";

import "../styles.scss";

import { StepComponentProps } from "react-step-builder";

const FirstStep: React.FC<StepComponentProps> = (props: StepComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleEmail(event: any) {
    const { value } = event.target;
    setEmail(value);
  }

  function handlePassword(event: any) {
    const { value } = event.target;
    setPassword(value);
  }

  function handlePasswordConfirmation(event: any) {
    const { value } = event.target;
    setPasswordConfirmation(value);
  }

  return (
    <div className="step-container">
      <h1>Let's set up!</h1>
      <p>Start by creating your account</p>

      <input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={handleEmail}
      />

      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={handlePassword}
      />

      <input
        type="password"
        id="passwordConfirmation"
        placeholder="Confirm password"
        value={passwordConfirmation}
        onChange={handlePasswordConfirmation}
      />

      <button
        onClick={props.next}
        disabled={!email && !password && !passwordConfirmation}
      >
        Next
      </button>
    </div>
  );
};

export default FirstStep;
