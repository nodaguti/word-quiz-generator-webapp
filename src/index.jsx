import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from 'containers/Root';
import configureStore from 'redux/stores';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

injectTapEventPlugin();

render(
  <I18nextProvider i18n={i18n}>
    <Root store={configureStore()} />
  </I18nextProvider>,
  document.getElementById('root'),
);
