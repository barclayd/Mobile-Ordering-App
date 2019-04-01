import React from 'react';
import { Switch, Route } from 'react-router-dom';

import main_page from './mainPage/main_page';
import statistics from './statistics/statistics';
import Menu from './menu/menu';
import account from './account/account';
import setUp from './initialSetUp/setUp'

const Main = () => (
  <Switch>
    <Route exact path="/" component={main_page} />
    <Route path="/menu" component={Menu} />
    <Route path="/statistics" component={statistics} />
    <Route path="/account" component={account} />
    <Route path="/setUp" component={setUp} />
  </Switch>
);

export default Main;
