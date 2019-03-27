import React from 'react';
import { Switch, Route } from "react-mdl";
import landingpage from './landingpage';

const Main = () => (
  <Switch>
  <Route exact path="/" component={landingpage} />
  </Switch>
);

export default Main;