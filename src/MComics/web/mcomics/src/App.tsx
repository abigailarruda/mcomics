import React from "react";

import Routes from "./routes";

import { ComicProvider } from "./contexts/ComicContext";
import { EventProvider } from "./contexts/EventContext";
import { CharacterProvider } from "./contexts/CharacterContext";

import "./assets/styles/global.scss";

function App() {
  return (
    <div className="App">
      <EventProvider>
        <CharacterProvider>
          <ComicProvider>
            <Routes />
          </ComicProvider>
        </CharacterProvider>
      </EventProvider>
    </div>
  );
}

export default App;
