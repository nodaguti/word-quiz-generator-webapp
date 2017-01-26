import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import routes from 'routes';
import 'global.css';
import 'yumincho-hack.css';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Root;
