import React from "react";

import Routes from "./routes";

import { ComicProvider } from "./contexts/ComicContext";
import { EventProvider } from "./contexts/EventContext";
import { CharacterProvider } from "./contexts/CharacterContext";
import { UserProvider } from "./contexts/UserContext";

import "./assets/styles/global.scss";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <EventProvider>
          <CharacterProvider>
            <ComicProvider>
              <Routes />
            </ComicProvider>
          </CharacterProvider>
        </EventProvider>
      </UserProvider>
    </div>
  );
}

export default App;
