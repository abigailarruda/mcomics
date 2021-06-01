import React from "react";

import { Link } from "react-router-dom";

import { Steps, Step } from "react-step-builder";

import FirstStep from "../../components/Steps/FirstStep";
import SecondStep from "../../components/Steps/SecondStep";
import ThirdStep from "../../components/Steps/ThirdStep";

import "./styles.scss";

function SignUp() {
  return (
    <div className="sign-up-container">
      <h1 className="brand">
        <Link to="/">
          <span>M</span>Comics
        </Link>
      </h1>

      <Steps>
        <Step component={FirstStep} />
        <Step component={SecondStep} />
        <Step component={ThirdStep} />
      </Steps>
    </div>
  );
}

export default SignUp;
