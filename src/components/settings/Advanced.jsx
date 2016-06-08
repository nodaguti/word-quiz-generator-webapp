import { Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import TextField from 'material-ui/lib/text-field';
import { translate } from 'react-i18next';
import CSS from './settings.css';

class AdvancedSettings extends Component {
  static propTypes = {
    preset: PropTypes.object,
    currentSettings: PropTypes.instanceOf(Record).isRequired,
    updateAdvanced: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  onBlurSentenceSeparator = (event) => {
    const sentenceSeparator = event.target.value;
    this.props.updateAdvanced({ sentenceSeparator });
  }

  onBlurClauseRegExp = (event) => {
    const clauseRegExp = event.target.value;
    this.props.updateAdvanced({ clauseRegExp });
  }

  onBlurWordRegExp = (event) => {
    const wordRegExp = event.target.value;
    this.props.updateAdvanced({ wordRegExp });
  }

  onBlurWordBoundaryRegExp = (event) => {
    const wordBoundaryRegExp = event.target.value;
    this.props.updateAdvanced({ wordBoundaryRegExp });
  }

  onBlurAbbrRegExp = (event) => {
    const abbrRegExp = event.target.value;
    this.props.updateAdvanced({ abbrRegExp });
  }

  render() {
    const {
      preset = {},
      currentSettings,
      t,
    } = this.props;
    const {
      sentenceSeparator,
      clauseRegExp,
      wordRegExp,
      wordBoundaryRegExp,
      abbrRegExp,
    } = currentSettings.toObject();

    return (
      <Panel title={t('labels.advanced')} expandable>
        <p>
          {t('descriptions.advanced')}
        </p>
        <TextField
          fullWidth
          floatingLabelText={t('labels.sentenceSeparatorRegExp')}
          hintText={preset.sentenceSeparator}
          defaultValue={sentenceSeparator}
          className={CSS.codeField}
          onBlur={this.onBlurSentenceSeparator}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText={t('labels.clauseRegExp')}
          hintText={preset.clauseRegExp}
          defaultValue={clauseRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurClauseRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText={t('labels.wordRegExp')}
          hintText={preset.wordRegExp}
          defaultValue={wordRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurWordRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText={t('labels.wordBoundaryRegExp')}
          hintText={preset.wordBoundaryRegExp}
          defaultValue={wordBoundaryRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurWordBoundaryRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText={t('labels.abbrRegExp')}
          hintText={preset.abbrRegExp}
          defaultValue={abbrRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurAbbrRegExp}
        />
      </Panel>
    );
  }
}

export default translate()(AdvancedSettings);
