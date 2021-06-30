import React from 'react';
import {
  HashRouter, Switch, Route,
} from 'react-router-dom';
import Connect from '../pages/Connect';
import Home from '../pages/Home';
import CreateCollection from '../pages/CreateCollection';
import PolkaProvider from '../polkaSDK/PolkaProvider';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EditProfile from '../pages/ProfileEdit';
import Browsing from '../pages/Browsing';
import CreateNft from '../pages/CreateNft';

const Router = () => (
  <HashRouter>
    <Header />
    <PolkaProvider>
      <Switch>
        <Route exact strict path="/">
          <Home />
        </Route>
        <Route exact strict path="/browsing">
          <Browsing />
        </Route>
        <Route exact strict path="/connect">
          <Connect />
        </Route>
        <Route exact strict path="/profile">
          <EditProfile />
        </Route>
        <Route exact strict path="/profile/collection/create">
          <CreateCollection />
        </Route>
        <Route exact strict path="/profile/nft/create">
          <CreateNft />
        </Route>
      </Switch>
    </PolkaProvider>
    <Footer />
  </HashRouter>
);

export default Router;
