import { Record, Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import { verticalRLLangs } from 'constants/displaySettings';
import Content from 'components/Content';
import Toolbar from 'components/Toolbar';
import Quiz from 'components/Quiz';
import RaisedButton from 'material-ui/lib/raised-button';
import CircularProgress from 'material-ui/lib/Circular-progress';
import Header from 'components/Header';
import CSS from './index.css';

const mapStateToProps = (state) => ({
  settings: state.settings,
  quiz: state.quiz,
  presets: state.resources.presets,
});

const mapDispatchToProps = (dispatch) => ({
  routeActions: bindActionCreators(routeActions, dispatch),
});

class Preview extends Component {
  static propTypes = {
    routeActions: PropTypes.object.isRequired,
    quiz: PropTypes.instanceOf(Record).isRequired,
    settings: PropTypes.instanceOf(Record).isRequired,
    presets: PropTypes.instanceOf(Map).isRequired,
  };

  constructor() {
    super();
    this.state = {
      vertical: false,
    };
  }

  onCancel = () => {
    const { push } = this.props.routeActions;
    push('/generate');
  }

  onPrint = () => {
    window.print();
  }

  toggleVerticalMode = () => {
    this.setState({ vertical: !this.state.vertical });
  }

  render() {
    const { quiz } = this.props;
    const isGenerating = quiz.questions.isEmpty();
    const lang = this.props.settings.target.material.get('lang');
    const preset = this.props.presets.get(lang) || {};
    const wordRegExp =
      this.props.settings.advanced.wordRegExp ||
      preset.wordRegExp ||
      '\\w';
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
            isGenerating ?
              <CircularProgress /> :
              <Quiz
                {...quiz.toObject()}
                lang={lang}
                wordRegExp={wordRegExp}
                vertical={this.state.vertical}
              />
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
