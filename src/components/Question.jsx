import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';

export default class Question extends Component {
  static propTypes = {
    question: PropTypes.instanceOf(Map).isRequired,
  };

  render() {
    const { question } = this.props;

    const {
      body,
      reference,
    } = question.toJS();
    const elems = [];

    body.forEach(({ text, isQuestionPart }) => {
      if (isQuestionPart) {
        elems.push(<u>{text}</u>);
      } else {
        elems.push(<span>{text}</span>);
      }
    });

    return (
      <li>
        <span>{elems}</span>
        <span style={{ marginLeft: '1em' }}>({reference})</span>
      </li>
    );
  }
}
