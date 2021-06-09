import React from 'react';
import {
  HashRouter, Switch, Route,
} from 'react-router-dom';
import Connect from '../pages/Connect';
import Home from '../pages/Home';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact strict path="/">
        <Home />
      </Route>
      <Route exact strict path="/connect">
        <Connect />
      </Route>
    </Switch>
  </HashRouter>
);

export default Router;
