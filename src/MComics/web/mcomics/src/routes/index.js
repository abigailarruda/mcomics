import React from "react";

import { Router, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Search from "../pages/Search";
import ComicPage from "../pages/Comic";
import CharacterPage from "../pages/Character";
import EventPage from "../pages/Event";

import history from "./history";

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/comic" component={ComicPage} />
      <Route exact path="/character" component={CharacterPage} />
      <Route exact path="/event" component={EventPage} />
    </Switch>
  </Router>
);

export default Routes;
