import React from 'react';
import { Route, Redirect } from 'react-router';
import App from 'components/App';
import Generator from 'containers/Generator';
import Preview from 'containers/Preview';

export default (
  <Route component={App}>
    <Route path="/generate" component={Generator} />
    <Route path="/preview" component={Preview} />
    <Redirect from="/" to="/generate" />
  </Route>
);
