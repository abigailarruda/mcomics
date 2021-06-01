import React from "react";

import Routes from "./routes";

import { ComicProvider } from "./contexts/ComicContext";
import { CharacterProvider } from "./contexts/CharacterContext";

import "./assets/styles/global.scss";

function App() {
  return (
    <div className="App">
      <CharacterProvider>
        <ComicProvider>
          <Routes />
        </ComicProvider>
      </CharacterProvider>
    </div>
  );
}

export default App;
