import React from 'react';
import { Switch, Route } from 'react-router-dom';

import main_page from './main_page';
import statistics from './statistics';
import Menu from './menu';

const Main = () => (
  <Switch>
    <Route exact path="/" component={main_page} />
    <Route path="/menu" component={Menu} />
    <Route path="/statistics" component={statistics} />
  </Switch>
);

export default Main;
