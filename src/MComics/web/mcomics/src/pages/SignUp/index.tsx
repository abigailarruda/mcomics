import React from "react";

import { Link } from "react-router-dom";

import { Steps, Step } from "react-step-builder";
import { ToastContainer } from "react-toastify";

import FirstStep from "../../components/Steps/FirstStep";
import SecondStep from "../../components/Steps/SecondStep";
import ThirdStep from "../../components/Steps/ThirdStep";

import "./styles.scss";

import "../../../node_modules/react-toastify/dist/ReactToastify.css";

function SignUp() {
  return (
    <div className="sign-up-container">
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

      <Steps>
        <Step component={FirstStep} />
        <Step component={SecondStep} />
        <Step component={ThirdStep} />
      </Steps>
    </div>
  );
}

export default SignUp;
