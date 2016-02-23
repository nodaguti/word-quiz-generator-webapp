import React, { Component, PropTypes } from 'react';
import CSS from './index.css';

export default class SettingsPanel extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children } = this.props;

    return (
      <div className={CSS.content}>{children}</div>
    );
  }
}
