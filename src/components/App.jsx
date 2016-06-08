import React, { PropTypes } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <main>
      {children}
    </main>
  </MuiThemeProvider>
);

App.propTypes = {
  children: PropTypes.element,
};

export default App;
