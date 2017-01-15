import React, { PropTypes } from 'react';
import CSS from './index.css';

const SettingsPanel = ({ children }) => (
  <div className={CSS.content}>{children}</div>
);

SettingsPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SettingsPanel;
