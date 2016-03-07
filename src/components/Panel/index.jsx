import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
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
