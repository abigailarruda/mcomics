import React from "react";

import { usePromiseTracker } from "react-promise-tracker";

import ReactLoading from "react-loading";

import "./styles.scss";

interface LoaderProps {
  area: string;
}

const Loader: React.FC<LoaderProps> = (props) => {
  const { promiseInProgress } = usePromiseTracker({ area: props.area });

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
