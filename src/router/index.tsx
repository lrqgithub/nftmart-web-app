import React from 'react';
import {
  HashRouter, Switch, Route,
} from 'react-router-dom';
import Home from '../pages/Home';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Router = () => (
  <HashRouter>
    <Header />
    <Switch>
      <Route exact strict path="/">
        <Home />
      </Route>
    </Switch>
    <Footer />
  </HashRouter>
);

export default Router;
