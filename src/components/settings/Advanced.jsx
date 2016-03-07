import { Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import TextField from 'material-ui/lib/text-field';
import CSS from './settings.css';

export default class AdvancedSettings extends Component {
  static propTypes = {
    preset: PropTypes.object,
    currentSetting: PropTypes.instanceOf(Record).isRequired,
    updateAdvanced: PropTypes.func.isRequired,
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
      currentSetting,
    } = this.props;
    const {
      sentenceSeparator,
      clauseRegExp,
      wordRegExp,
      wordBoundaryRegExp,
      abbrRegExp,
    } = currentSetting.toObject();

    return (
      <Panel title="Advanced" expandable>
        <p>
          These options are for advanced users.
          Please keep them untouched unless you know what you are doing.
        </p>
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a sentence separator"
          hintText={preset.sentenceSeparator}
          defaultValue={sentenceSeparator}
          className={CSS.codeField}
          onBlur={this.onBlurSentenceSeparator}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a clause"
          hintText={preset.clauseRegExp}
          defaultValue={clauseRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurClauseRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a word"
          hintText={preset.wordRegExp}
          defaultValue={wordRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurWordRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a word boundary"
          hintText={preset.wordBoundaryRegExp}
          defaultValue={wordBoundaryRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurWordBoundaryRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a abbreviation mark"
          hintText={preset.abbrRegExp}
          defaultValue={abbrRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurAbbrRegExp}
        />
      </Panel>
    );
  }
}
