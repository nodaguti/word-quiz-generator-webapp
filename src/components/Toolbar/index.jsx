import React, { PropTypes } from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import CSS from './index.css';

const SettingsPanel = ({ className, children }) => (
  <Toolbar className={`${className} ${CSS.toolbar}`}>
    <ToolbarGroup firstChild float="left">
      {children}
    </ToolbarGroup>
  </Toolbar>
);

SettingsPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

SettingsPanel.defaultProps = {
  className: '',
};

export default SettingsPanel;
