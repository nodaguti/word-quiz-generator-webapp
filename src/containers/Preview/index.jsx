import { Record, Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import findKey from 'lodash/findKey';
import { wordDivider, verticalRLLangs } from 'constants/displaySettings';
import Content from 'components/Content';
import Toolbar from 'components/Toolbar';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/Circular-progress';
import Header from 'components/Header';
import CSS from './index.css';
import VerticalCSS from './vertical-rl.css';

const mapStateToProps = (state) => ({
  setting: state.setting,
  quiz: state.quiz,
  presets: state.resource.presets,
});

const mapDispatchToProps = (dispatch) => ({
  routeActions: bindActionCreators(routeActions, dispatch),
});

class Preview extends Component {
  static propTypes = {
    routeActions: PropTypes.object.isRequired,
    quiz: PropTypes.instanceOf(Record).isRequired,
    setting: PropTypes.instanceOf(Record).isRequired,
    presets: PropTypes.instanceOf(Map).isRequired,
  };

  constructor() {
    super();
    this.state = {
      isVertical: false,
    };
  }

  onCancel = () => {
    const { push } = this.props.routeActions;
    push('/generate');
  }

  onPrint = () => {
    window.print();
  }

  getLang() {
    const material = this.props.setting.target.material;
    return material.get('lang');
  }

  toggleVerticalMode = () => {
    this.setState({ isVertical: !this.state.isVertical });
  }

  renderQuiz() {
    const { quiz } = this.props;
    const {
      title,
      instruction,
      answerKeysLabel,
      questions,
    } = quiz.toObject();
    const isVertical = this.state.isVertical;
    const quizClasses = CSS.quiz + (isVertical ? ` ${VerticalCSS.quiz}` : '');

    return (
      <div className={quizClasses}>
        <h2>{title}</h2>
        <p>{instruction}</p>
        <ol>
          {this.renderQuestions(questions)}
        </ol>
        <hr className={CSS.pageBreak} />
        <h2>
          <span className={CSS.quizTitleInAnswerKeys}>{title}</span>
          {answerKeysLabel}
        </h2>
        <ol>
          {this.renderAnswers(questions)}
        </ol>
      </div>
    );
  }

  renderQuestions(questions) {
    const lang = this.getLang();
    const preset = this.props.presets.get(lang) || {};
    const wordRegExp =
      this.props.setting.advanced.wordRegExp ||
      preset.wordRegExp ||
      '\\w';
    const divider = findKey(wordDivider, (langList) =>
      langList.some((regExp) => regExp.test(lang))
    );

    return questions
      .toSeq()
      .map((q) => this.renderQuestion(q, { wordRegExp, divider }))
      .toArray();
  }

  renderQuestion(question, { wordRegExp, divider }) {
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
        <span className={CSS.reference}>({reference})</span>
      </li>
    );
  }

  renderAnswers(questions) {
    return questions
      .toSeq()
      .map(this.renderAnswer)
      .toArray();
  }

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
    const { quiz } = this.props;
    const isGenerating = quiz.questions.isEmpty();
    const lang = this.getLang();
    const mayVertical = verticalRLLangs.some((regExp) => regExp.test(lang));

    return (
      <div>
        <Header className={CSS.header} title="Preview" />
        <Content>
          <Toolbar className={CSS.toolbar}>
            <RaisedButton
              label="Cancel"
              onTouchTap={this.onCancel}
            />
            <RaisedButton
              primary
              label="Print"
              onTouchTap={this.onPrint}
            />
            {
              mayVertical ?
                <RaisedButton
                  label="Toggle Vertical Mode"
                  onTouchTap={this.toggleVerticalMode}
                /> : ''
            }
          </Toolbar>
          {
            isGenerating ? <CircularProgress /> : this.renderQuiz()
          }
        </Content>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview);
