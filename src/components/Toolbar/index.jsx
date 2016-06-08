import React, { Component, PropTypes } from 'react';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup';
import CSS from './index.css';

export default class SettingsPanel extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { className, children } = this.props;

    return (
      <Toolbar className={`${className} ${CSS.toolbar}`}>
        <ToolbarGroup firstChild float="left">
          {children}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}
