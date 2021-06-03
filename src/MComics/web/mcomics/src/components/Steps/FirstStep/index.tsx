import React, { useContext, useState } from "react";

import "../styles.scss";

import { StepComponentProps } from "react-step-builder";
import { UserContext } from "../../../contexts/UserContext";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loader from "../../Loader";

const FirstStep: React.FC<StepComponentProps> = (props: StepComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { createNewUser } = useContext(UserContext);

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

  async function createUser() {
    await trackPromise(
      createNewUser(email, password, passwordConfirmation),
      "user"
    );
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    props.next();
  }

  const { promiseInProgress } = usePromiseTracker({ area: "user" });

  return (
    <div className="step-container">
      <h1>Let's set up!</h1>
      <p>Start by creating your account</p>

      <Loader area="user" />

      {!promiseInProgress && (
        <>
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

          <button className="Teste" onClick={createUser}>
            Next
          </button>
        </>
      )}
    </div>
  );
};

export default FirstStep;
