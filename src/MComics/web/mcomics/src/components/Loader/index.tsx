import React from "react";

import { usePromiseTracker } from "react-promise-tracker";

import ReactLoading from "react-loading";

const Loader: React.FC = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      {promiseInProgress && (
        <div className="loader">
          <ReactLoading
            type={"bubbles"}
            color={"#c0ccda"}
            height={40}
            width={40}
          />
        </div>
      )}
    </>
  );
};

export default Loader;
