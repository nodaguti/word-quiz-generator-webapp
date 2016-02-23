import { Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import TextField from 'material-ui/lib/text-field';
import CSS from './settings.css';

export default class AdvancedSettings extends Component {
  static propTypes = {
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
    const { currentSetting } = this.props;
    const {
      sentenceSeparator,
      clauseRegExp,
      wordRegExp,
      wordBoundaryRegExp,
      abbrRegExp,
    } = currentSetting.toObject();

    return (
      <Panel title="Advanced">
        <p>
          These options are for advanced users.
          Please keep them untouched unless you know what you are doing.
        </p>
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a sentence separator"
          hintText={sentenceSeparator}
          className={CSS.codeField}
          onBlur={this.onBlurSentenceSeparator}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a clause"
          hintText={clauseRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurClauseRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a word"
          hintText={wordRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurWordRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a word boundary"
          hintText={wordBoundaryRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurWordBoundaryRegExp}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Regular expression of a abbreviation mark"
          hintText={abbrRegExp}
          className={CSS.codeField}
          onBlur={this.onBlurAbbrRegExp}
        />
      </Panel>
    );
  }
}
