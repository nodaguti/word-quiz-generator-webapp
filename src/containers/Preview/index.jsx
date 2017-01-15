import { Record, List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as errorActions from 'redux/actions/error';
import verticalRLLangs from 'constants/displaySettings';
import ErrorPopup from 'components/ErrorPopup';
import Content from 'components/Content';
import Toolbar from 'components/Toolbar';
import Quiz from 'components/Quiz';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Header from 'components/Header';
import { translate } from 'react-i18next';
import CSS from './index.css';

const mapStateToProps = (state) => ({
  settings: state.settings,
  quiz: state.quiz,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  errorActions: bindActionCreators(errorActions, dispatch),
});

class Preview extends Component {
  static propTypes = {
    quiz: PropTypes.instanceOf(Record).isRequired,
    settings: PropTypes.instanceOf(Record).isRequired,
    errors: PropTypes.instanceOf(List).isRequired,
    errorActions: PropTypes.shape({
      dismissError: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      vertical: false,
    };
  }

  onCancel = () => {
    browserHistory.push('/generate');
  }

  onPrint = () => {
    window.print();
  }

  toggleVerticalMode = () => {
    this.setState({ vertical: !this.state.vertical });
  }

  render() {
    const {
      quiz,
      settings,
      errors,
      t,
    } = this.props;
    const { dismissError } = this.props.errorActions;
    const isGenerating = quiz.questions.isEmpty();
    const lang = settings.target.material.get('lang');
    const mayVertical = verticalRLLangs.some((regExp) => regExp.test(lang));

    return (
      <div>
        <ErrorPopup
          errors={errors}
          dismissError={dismissError}
        />
        <Header className={CSS.header} title="Preview" />
        <Content>
          <Toolbar className={CSS.toolbar}>
            <RaisedButton
              label={t('labels.cancel')}
              onTouchTap={this.onCancel}
            />
            <RaisedButton
              primary
              label={t('labels.print')}
              onTouchTap={this.onPrint}
            />
            {
              mayVertical ?
                <RaisedButton
                  label={t('labels.toggleVerticalMode')}
                  onTouchTap={this.toggleVerticalMode}
                /> : ''
            }
          </Toolbar>
          {
            isGenerating ?
              <CircularProgress /> :
              <Quiz
                {...quiz.toObject()}
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
  mapDispatchToProps,
)(
  translate()(
    Preview,
  ),
);
