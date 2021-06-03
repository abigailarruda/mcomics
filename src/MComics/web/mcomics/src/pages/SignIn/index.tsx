import React, { useContext, useState } from "react";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";

import { UserContext } from "../../contexts/UserContext";

import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Loader from "../../components/Loader";

import "./styles.scss";

import "../../../node_modules/react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authUser } = useContext(UserContext);

  function handleEmail(event: any) {
    const { value } = event.target;
    setEmail(value);
  }

  function handlePassword(event: any) {
    const { value } = event.target;
    setPassword(value);
  }

  async function auth() {
    trackPromise(authUser(email, password), "authUser");
    setEmail("");
    setPassword("");
  }

  const { promiseInProgress } = usePromiseTracker({ area: "authUser" });

  return (
    <div className="sign-in-container">
      <h1 className="brand">
        <Link to="/">
          <span>M</span>Comics
        </Link>
      </h1>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />

      <div className="sign-in">
        <h1>We missed you!</h1>
        <p>Let's sign you in</p>

        <Loader area="authUser" />
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

            <button onClick={auth}>Sign in</button>

            <p>
              Don't have an account? <Link to="/signup">Sign up.</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SignIn;
