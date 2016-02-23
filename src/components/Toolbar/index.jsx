import React, { Component, PropTypes } from 'react';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
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
