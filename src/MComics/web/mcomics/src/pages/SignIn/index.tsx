import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./styles.scss";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(event: any) {
    const { value } = event.target;
    setEmail(value);
  }

  function handlePassword(event: any) {
    const { value } = event.target;
    setPassword(value);
  }

  return (
    <div className="sign-in-container">
      <h1 className="brand">
        <Link to="/">
          <span>M</span>Comics
        </Link>
      </h1>

      <div className="sign-in">
        <h1>We missed you!</h1>
        <p>Let's sign you in</p>

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

        <button>Sign in</button>

        <p>
          Don't have an account? <Link to="/signup">Sign up.</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
