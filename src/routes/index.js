/*
 * news: repo.cat/news
 * new: repo.cat/new
 * show: repo.cat/show
 */

import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import AppWrapper from './AppWrapper';
import Main from '../components/Main';

const getRootRoute = (history) => (
  <Router history={history}>
    <Redirect from="/" to="/top" />
    <Route path="/" component={AppWrapper}>
      <Route path="/top" component={Main} />
      <Route path="/new" component={Main} />
      <Route path="/show" component={Main} />
      {/* @TODO: 404 */}
      <Redirect from="*" to="top" />
    </Route>
  </Router>
);

export default getRootRoute;
