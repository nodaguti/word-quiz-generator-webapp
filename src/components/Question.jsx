import { Map } from 'immutable';
import React, { Component, PropTypes } from 'react';

export default class Question extends Component {
  static propTypes = {
    question: PropTypes.instanceOf(Map).isRequired,
    wordRegExp: PropTypes.string.isRequired,
    divider: PropTypes.string.isRequired,
  };

  render() {
    const {
      question,
      wordRegExp,
      divider,
    } = this.props;

    // Assume that the word devider is a space.
    // If the language uses a non-space character as the word devider,
    // you should convert it with a preprocessor.
    const blockRegExp = new RegExp(`(${wordRegExp})(\\s+)?`, 'g');
    const {
      sentence,
      wordIndexes,
      reference,
    } = question.toJS();
    const questionJSXs = [];
    let currentWordIndex = 0;
    let prevLastIndex = 0;
    let matched;

    // Set underlines at target expressions.
    // eslint-disable-next-line no-cond-assign
    while ((matched = blockRegExp.exec(sentence))) {
      const [, word, hasDivider] = matched;
      const divider_ = !!hasDivider ? divider : '';
      const punctuation = sentence.substring(prevLastIndex, matched.index);

      if (wordIndexes[0] === currentWordIndex) {
        const isSuccessive = (wordIndexes[0] + 1) === wordIndexes[1];

        if (isSuccessive) {
          questionJSXs.push(<span>{punctuation}<u>{word}{divider_}</u></span>);
        } else {
          questionJSXs.push(<span>{punctuation}<u>{word}</u>{divider_}</span>);
        }

        wordIndexes.shift();
      } else {
        questionJSXs.push(<span>{punctuation}{word}{divider_}</span>);
      }

      currentWordIndex++;
      prevLastIndex = blockRegExp.lastIndex;
    }

    const stopPunctuation = sentence.substring(prevLastIndex);
    questionJSXs.push(<span>{stopPunctuation}</span>);

    return (
      <li>
        <span>{questionJSXs}</span>
        <span style={{ marginLeft: '1em' }}>({reference})</span>
      </li>
    );
  }
}
