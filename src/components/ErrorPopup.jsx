import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class ErrorPopup extends Component {
  static propTypes = {
    errors: PropTypes.instanceOf(List).isRequired,
    dismissError: PropTypes.func.isRequired,
  };

  handleClose = () => {
    this.props.dismissError();
  }

  renderDetails(details) {
    const {
      name,
      message,
      stack,
    } = details;

    return (
      <div>
        <hr />
        <h4>Error Name</h4>
        <div>{name}</div>
        <h4>Error Message</h4>
        <div>{message}</div>
        <h4>Stacktrace</h4>
        <pre><code>{stack}</code></pre>
      </div>
    );
  }

  render() {
    const latestError = this.props.errors.last();

    if (!latestError) {
      return (<div></div>);
    }

    const isDev = process.env.NODE_ENV === 'development';
    const actions = [
      <FlatButton
        label="OK"
        primary
        keyboardFocused
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <Dialog
        title={latestError.name}
        actions={actions}
        open
        onRequestClose={this.handleClose}
      >
        <p>{latestError.message}</p>
        {isDev ? this.renderDetails(latestError.details) : ''}
      </Dialog>
    );
  }
}
