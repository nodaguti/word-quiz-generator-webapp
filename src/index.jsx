import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from 'containers/Root';
import configureStore from 'redux/stores';

injectTapEventPlugin();

render(
  <Root store={configureStore()} />,
  document.getElementById('root')
);
