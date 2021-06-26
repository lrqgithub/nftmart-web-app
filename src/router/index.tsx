import React from 'react';
import {
  HashRouter, Switch, Route,
} from 'react-router-dom';
import Connect from '../pages/Connect';
import Home from '../pages/Home';
import Create from '../pages/Create';
import CreateCollection from '../pages/CreateCollection';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProfile from '../pages/ProfileEdit';

const Router = () => (
  <HashRouter>
    <Header />
    <Switch>
      <Route exact strict path="/">
        <Home />
      </Route>
      <Route exact strict path="/connect">
        <Connect />
      </Route>
      <Route exact strict path="/profile">
        <EditProfile />
      </Route>
      <Route exact strict path="/create">
        <Create />
      </Route>
      <Route exact strict path="/createcollection">
        <CreateCollection />
      </Route>
    </Switch>
    <Footer />
  </HashRouter>
);

export default Router;
