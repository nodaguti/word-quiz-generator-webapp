import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

const githubIcon = (<IconButton
  iconClassName="fa fa-github"
  href="https://github.com/nodaguti/word-quiz-generator-webapp"
  linkButton
/>);

const Header = ({ className, title }) => (
  <AppBar
    className={className}
    title={`Word Quiz Generator: ${title}`}
    iconElementLeft={<div />}
    iconElementRight={githubIcon}
  />
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;
