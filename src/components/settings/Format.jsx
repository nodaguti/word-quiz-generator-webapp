import { Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import TextField from 'material-ui/TextField';
import { translate } from 'react-i18next';

class FormatSettings extends Component {
  static propTypes = {
    currentSettings: PropTypes.instanceOf(Record).isRequired,
    updateFormat: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  onBlurTitle = (event) => {
    const title = event.target.value;
    this.props.updateFormat({ title });
  }

  onBlurSize = (event) => {
    const size = Number.parseInt(event.target.value, 10);
    this.props.updateFormat({ size });
  }

  onBlurInstruction = (event) => {
    const instruction = event.target.value;
    this.props.updateFormat({ instruction });
  }

  onBlurLabel = (event) => {
    const answerKeysLabel = event.target.value;
    this.props.updateFormat({ answerKeysLabel });
  }

  render() {
    const {
      currentSettings,
      t,
    } = this.props;
    const {
      title,
      size_: size,
      instruction,
      answerKeysLabel,
    } = currentSettings.toObject();

    return (
      <Panel title={t('labels.format')}>
        <TextField
          fullWidth
          floatingLabelText={t('labels.quizTitle')}
          defaultValue={title}
          onBlur={this.onBlurTitle}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText={`${t('labels.size')} *`}
          hintText={t('descriptions.size')}
          defaultValue={size || ''}
          onBlur={this.onBlurSize}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText={t('labels.instruction')}
          hintText={t('descriptions.instruction')}
          defaultValue={instruction}
          onBlur={this.onBlurInstruction}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText={t('labels.titleOfAnswerKeys')}
          hintText={t('descriptions.titleOfAnswerKeys')}
          defaultValue={answerKeysLabel}
          onBlur={this.onBlurLabel}
        />
      </Panel>
    );
  }
}

export default translate()(FormatSettings);
