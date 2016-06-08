import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/Card/Card';
import CardTitle from 'material-ui/Card/CardTitle';
import CardText from 'material-ui/Card/CardText';
import CSS from './index.css';

export default class SettingsPanel extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    expandable: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    const {
      title,
      expandable = false,
      children,
    } = this.props;

    return (
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
  }
}
