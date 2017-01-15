import { Map } from 'immutable';
import React, { PropTypes } from 'react';

const Question = ({ question }) => {
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
};

Question.propTypes = {
  question: PropTypes.instanceOf(Map).isRequired,
};

export default Question;
