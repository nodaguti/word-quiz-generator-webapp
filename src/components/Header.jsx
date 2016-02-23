import React, { Component, PropTypes } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';

const githubIcon = (<IconButton
  iconClassName="fa fa-github"
  href="https://github.com/nodaguti/word-quiz-generator-webapp"
  linkButton
/>);

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  render() {
    const { className, title } = this.props;

    return (
      <AppBar
        className={className}
        title={`Word Quiz Generator: ${title}`}
        iconElementLeft={<div></div>}
        iconElementRight={githubIcon}
      />
    );
  }
}
