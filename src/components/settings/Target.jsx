import { List, Record, Map } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

export default class TargetSettings extends Component {
  static propTypes = {
    presets: PropTypes.instanceOf(Map).isRequired,
    materials: PropTypes.instanceOf(List).isRequired,
    currentSetting: PropTypes.instanceOf(Record).isRequired,
    updateMaterial: PropTypes.func.isRequired,
    updateSections: PropTypes.func.isRequired,
  };

  onChangeMaterial = (event, index, value) => {
    const {
      presets,
      materials,
      currentSetting,
      updateMaterial,
    } = this.props;
    const oldMaterial = currentSetting.material;

    if (value !== oldMaterial.get('id')) {
      const newMaterial = materials.find((item) => item.get('id') === value);
      const oldLang = oldMaterial.get('lang');
      const newLang = newMaterial.get('lang');

      if (oldLang !== newLang) {
        const preset = presets.get(newLang);
        updateMaterial({ material: newMaterial, preset });
      } else {
        updateMaterial({ material: newMaterial });
      }
    }
  }

  onBlurSections = (event) => {
    const {
      currentSetting,
      updateSections,
    } = this.props;

    if (event.target.value !== currentSetting.sections) {
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
    } = material.toObject();
    const nameWithLang = `${name} (${lang})`;

    return (
      <MenuItem value={id} key={id} label={name} primaryText={nameWithLang} />
    );
  }

  render() {
    const { currentSetting } = this.props;
    const currentMaterial = currentSetting.material;
    const {
      id: materialId,
      sections: materialSections,
    } = currentMaterial.toObject();
    const currentSections = currentSetting.sections;

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
        <TextField
          fullWidth
          floatingLabelText="Sections"
          hintText={materialSections}
          defaultValue={currentSections}
          onBlur={this.onBlurSections}
        />
      </Panel>
    );
  }
}
