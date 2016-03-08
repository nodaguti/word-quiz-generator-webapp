import { Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import TextField from 'material-ui/lib/text-field';

export default class FormatSettings extends Component {
  static propTypes = {
    currentSettings: PropTypes.instanceOf(Record).isRequired,
    updateFormat: PropTypes.func.isRequired,
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
    const { currentSettings } = this.props;
    const {
      title,
      size_: size,
      instruction,
      answerKeysLabel,
    } = currentSettings.toObject();

    return (
      <Panel title="Format">
        <TextField
          fullWidth
          floatingLabelText="Quiz Title"
          defaultValue={title}
          onBlur={this.onBlurTitle}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Size *"
          hintText="The number of questions the quiz will have"
          defaultValue={size || ''}
          onBlur={this.onBlurSize}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Instruction"
          hintText="e.g. Write down the meaning of underlined phrases."
          defaultValue={instruction}
          onBlur={this.onBlurInstruction}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Title of Answer Keys Section"
          hintText="e.g. Answer Keys"
          defaultValue={answerKeysLabel}
          onBlur={this.onBlurLabel}
        />
      </Panel>
    );
  }
}
