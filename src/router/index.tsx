import React from 'react';
import {
  HashRouter, Switch, Route,
} from 'react-router-dom';
import Home from '../pages/Home';

const Router = () => (
  <HashRouter>
    <Switch>
      <Route exact strict path="/">
        <Home />
      </Route>
    </Switch>
  </HashRouter>
);

export default Router;
