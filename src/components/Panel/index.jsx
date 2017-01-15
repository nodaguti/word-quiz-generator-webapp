import React, { PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CSS from './index.css';

const SettingsPanel = ({ title, expandable, children }) => (
  <Card className={CSS.card}>
    <CardTitle
      title={title}
      actAsExpander={expandable}
      showExpandableButton={expandable}
    />
    <CardText expandable={expandable}>
      {children}
    </CardText>
  </Card>
);

SettingsPanel.propTypes = {
  title: PropTypes.string.isRequired,
  expandable: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

SettingsPanel.defaultProps = {
  expandable: false,
};

export default SettingsPanel;
