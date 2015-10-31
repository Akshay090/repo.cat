/*
 * news: foo.com/news
 * new: foo.com/new
 * show: foo.com/show
 */

import React from 'react';
import { Router, Route, Redirect } from 'react-router';

import AppWrapper from './AppWrapper';
import App from '../components/App';

const rootRoute = (history) => (
  <Router history={history}>
    <Redirect from="/" to="top" />
    <Route path="/" component={AppWrapper}>
      <Route path="top" component={App} />
      <Route path="new" component={App} />
      <Route path="show" component={App} />
      {/* @TODO: 404 */}
      <Redirect from="*" to="top" />
    </Route>
  </Router>
);

export default rootRoute;
