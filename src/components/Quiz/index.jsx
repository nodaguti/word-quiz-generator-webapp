import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import findKey from 'lodash/findKey';
import { wordDivider } from 'constants/displaySettings';
import Question from 'components/Question';
import CSS from './index.css';
import VerticalCSS from './vertical-rl.css';

export default class Quiz extends Component {
  static propTypes = {
    title: PropTypes.string,
    instruction: PropTypes.string,
    answerKeysLabel: PropTypes.string,
    questions: PropTypes.instanceOf(List).isRequired,
    lang: PropTypes.string.isRequired,
    wordRegExp: PropTypes.string.isRequired,
    vertical: PropTypes.bool.isRequired,
  };

  renderAnswer(question) {
    const {
      answer,
      phrase,
    } = question.toObject();

    return (
      <li>{`${answer} (${phrase})`}</li>
    );
  }

  render() {
    const {
      title,
      instruction,
      answerKeysLabel,
      questions,
      lang,
      wordRegExp,
      vertical,
    } = this.props;

    const divider = findKey(wordDivider, (langs) =>
      langs.some((re) => re.test(lang))
    );

    return (
      <div className={`${CSS.quiz} ${vertical ? VerticalCSS.quiz : ''}`}>
        <h2>{title}</h2>
        <p>{instruction}</p>
        <ol>
          {
            questions
              .toSeq()
              .map((question) => (
                <Question
                  question={question}
                  wordRegExp={wordRegExp}
                  divider={divider}
                />
              ))
              .toArray()
          }
        </ol>
        <hr
          className={`${CSS.pageBreak} ${vertical ? VerticalCSS.pageBreak : ''}`}
        />
        <h2>
          <span className={CSS.quizTitleInAnswerKeys}>{title}</span>
          {answerKeysLabel}
        </h2>
        <ol>
          {
            questions
              .toSeq()
              .map(this.renderAnswer)
              .toArray()
          }
        </ol>
      </div>
    );
  }
}
