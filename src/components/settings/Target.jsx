import { List, Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import MaterialDetails from 'components/MaterialDetails';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

export default class TargetSettings extends Component {
  static propTypes = {
    materials: PropTypes.instanceOf(List).isRequired,
    currentSettings: PropTypes.instanceOf(Record).isRequired,
    updateMaterial: PropTypes.func.isRequired,
    updateSections: PropTypes.func.isRequired,
  };

  onChangeMaterial = (event, index, value) => {
    const {
      materials,
      currentSettings,
      updateMaterial,
    } = this.props;
    const oldMaterial = currentSettings.material;

    if (value !== oldMaterial.get('id')) {
      const newMaterial = materials.find((item) => item.get('id') === value);
      const oldLang = oldMaterial.get('lang');
      const newLang = newMaterial.get('lang');
      const isLangUpdated = oldLang !== newLang;

      updateMaterial({ material: newMaterial, isLangUpdated });
    }
  }

  onBlurSections = (event) => {
    const {
      currentSettings,
      updateSections,
    } = this.props;

    if (event.target.value !== currentSettings.sections) {
      const sections = event.target.value;
      updateSections(sections);
    }
  }

  renderMaterialList() {
    const { materials } = this.props;

    return materials
      .toSeq()
      .map(this.renderMaterial)
      .toArray();
  }

  renderMaterial(material) {
    const {
      id,
      name,
      lang,
      ansLang,
    } = material.toObject();
    const nameWithLang = `${name} (${lang}-${ansLang})`;

    return (
      <MenuItem value={id} key={id} label={name} primaryText={nameWithLang} />
    );
  }

  render() {
    const { currentSettings } = this.props;
    const currentMaterial = currentSettings.material;
    const {
      id: materialId,
      sections: materialSections,
    } = currentMaterial.toObject();
    const currentSections = currentSettings.sections;

    return (
      <Panel title="Target">
        <SelectField
          fullWidth
          floatingLabelText="Material"
          value={materialId}
          onChange={this.onChangeMaterial}
        >
          {this.renderMaterialList()}
        </SelectField>
        <br />
        <MaterialDetails
          {...currentMaterial.toObject()}
        />
        <br />
        <TextField
          fullWidth
          floatingLabelText="Sections *"
          hintText={materialSections}
          defaultValue={currentSections}
          onBlur={this.onBlurSections}
        />
      </Panel>
    );
  }
}
