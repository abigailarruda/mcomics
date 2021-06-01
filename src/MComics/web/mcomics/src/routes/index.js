import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import history from "./history";

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default Routes;
