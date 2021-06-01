import React from "react";

import { Router, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";

import history from "./history";

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  </Router>
);

export default Routes;
