import React from "react";

import Routes from "./routes";

import { ComicProvider } from "./contexts/ComicContext";

import "./assets/styles/global.scss";

function App() {
  return (
    <div className="App">
      <ComicProvider>
        <Routes />
      </ComicProvider>
    </div>
  );
}

export default App;
