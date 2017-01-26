import { List, Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import MaterialDetails from 'components/settings/MaterialDetails';
import SectionDetails from 'components/settings/SectionDetails';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { translate } from 'react-i18next';

class TargetSettings extends Component {
  static propTypes = {
    materials: PropTypes.instanceOf(List).isRequired,
    currentSettings: PropTypes.instanceOf(Record).isRequired,
    updateMaterial: PropTypes.func.isRequired,
    updateSections: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
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

  renderMaterial = (material) => {
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

  renderPanel = ({
    id,
    currentMaterial,
    currentSections,
    sections,
    sectioningRule,
    t,
  }) => (
    <Panel title={t('labels.target')}>
      <SelectField
        fullWidth
        floatingLabelText={t('labels.material')}
        value={id}
        onChange={this.onChangeMaterial}
      >
        {this.renderMaterialList()}
      </SelectField>
      <MaterialDetails {...currentMaterial.toObject()} />
      <TextField
        fullWidth
        floatingLabelText={`${t('labels.sections')} (${sections}) *`}
        hintText={sections}
        defaultValue={currentSections}
        onBlur={this.onBlurSections}
      />
      <SectionDetails
        sections={sections}
        sectioningRule={sectioningRule}
      />
    </Panel>
  );

  renderPanelWithNothingSelected = ({ t }) => (
    <Panel title={t('labels.target')}>
      <SelectField
        fullWidth
        floatingLabelText={t('labels.material')}
        onChange={this.onChangeMaterial}
      >
        {this.renderMaterialList()}
      </SelectField>
      <TextField
        fullWidth
        floatingLabelText={`${t('labels.sections')} *`}
        onBlur={this.onBlurSections}
      />
    </Panel>
  );

  render() {
    const {
      currentSettings,
      t,
    } = this.props;
    const currentMaterial = currentSettings.material;
    const {
      id,
      sections,
      sectioningRule,
    } = currentMaterial.toObject();
    const currentSections = currentSettings.sections;

    return id ?
      this.renderPanel({
        id,
        currentMaterial,
        currentSections,
        sections,
        sectioningRule,
        t,
      })
    :
      this.renderPanelWithNothingSelected({ t });
  }
}

export default translate()(TargetSettings);
