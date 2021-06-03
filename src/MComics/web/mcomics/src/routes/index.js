import React from "react";

import { Router, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";

import history from "./history";
import Search from "../pages/Search";
import Comic from "../pages/Comic";
import Character from "../pages/Character";
import Event from "../pages/Event";

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/comic" component={Comic} />
      <Route exact path="/character" component={Character} />
      <Route exact path="/event" component={Event} />
    </Switch>
  </Router>
);

export default Routes;
