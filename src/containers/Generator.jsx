import { Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import * as GeneratorActions from 'redux/actions/generator';
import * as SettingsActions from 'redux/actions/settings';
import RaisedButton from 'material-ui/lib/raised-button';
import Header from 'components/Header';
import Content from 'components/Content';
import Toolbar from 'components/Toolbar';
import TargetSettings from 'components/settings/Target';
import SourcesSettings from 'components/settings/Sources';
import FormatSettings from 'components/settings/Format';
import AdvancedSettings from 'components/settings/Advanced';

const mapStateToProps = (state) => ({
  settings: state.settings,
  resources: state.resources,
});

const mapDispatchToProps = (dispatch) => ({
  routeActions: bindActionCreators(routeActions, dispatch),
  generatorActions: bindActionCreators(GeneratorActions, dispatch),
  settingsActions: bindActionCreators(SettingsActions, dispatch),
});

class Generator extends Component {
  static propTypes = {
    routeActions: PropTypes.object.isRequired,
    generatorActions: PropTypes.object.isRequired,
    settingsActions: PropTypes.object.isRequired,
    settings: PropTypes.instanceOf(Record).isRequired,
    resources: PropTypes.instanceOf(Record).isRequired,
  };

  componentWillMount() {
    this.props.generatorActions.fetchAllMaterials();
    this.props.generatorActions.fetchAllSources();
    this.props.generatorActions.fetchAllPresets();
  }

  onGenerate = () => {
    this.props.generatorActions.clearQuiz();
    this.props.routeActions.push('/preview');
    this.props.generatorActions.generate(this.props.settings);
  }

  render() {
    const {
      settingsActions: actions,
      settings,
      resources,
    } = this.props;
    const {
      updateMaterial,
      updateSections,
      updateSources,
      clearSources,
      updateFormat,
      updateAdvanced,
    } = actions;
    const lang = this.props.settings.target.material.get('lang') || '';
    const preset = resources.presets.get(lang);

    return (
      <div>
        <Header title="Settings" />
        <Content>
          <Toolbar>
            <RaisedButton
              primary
              label="Generate"
              onTouchTap={this.onGenerate}
            />
          </Toolbar>
          <TargetSettings
            materials={resources.materials}
            currentSettings={settings.target}
            updateMaterial={updateMaterial}
            updateSections={updateSections}
          />
          <FormatSettings
            currentSettings={settings.format}
            updateFormat={updateFormat}
          />
          <SourcesSettings
            sources={resources.sources}
            filter={lang}
            currentSettings={settings.sources}
            updateSources={updateSources}
            clearSources={clearSources}
          />
          <AdvancedSettings
            preset={preset}
            currentSettings={settings.advanced}
            updateAdvanced={updateAdvanced}
          />
        </Content>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Generator);
