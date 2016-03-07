import { Record } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux';
import * as GeneratorActions from 'redux/actions/generator';
import * as SettingActions from 'redux/actions/setting';
import RaisedButton from 'material-ui/lib/raised-button';
import Header from 'components/Header';
import Content from 'components/Content';
import Toolbar from 'components/Toolbar';
import TargetSettings from 'components/settings/Target';
import SourcesSettings from 'components/settings/Sources';
import FormatSettings from 'components/settings/Format';
import AdvancedSettings from 'components/settings/Advanced';

const mapStateToProps = (state) => ({
  setting: state.setting,
  resource: state.resource,
});

const mapDispatchToProps = (dispatch) => ({
  routeActions: bindActionCreators(routeActions, dispatch),
  generatorActions: bindActionCreators(GeneratorActions, dispatch),
  settingActions: bindActionCreators(SettingActions, dispatch),
});

class Generator extends Component {
  static propTypes = {
    routeActions: PropTypes.object.isRequired,
    generatorActions: PropTypes.object.isRequired,
    settingActions: PropTypes.object.isRequired,
    setting: PropTypes.instanceOf(Record).isRequired,
    resource: PropTypes.instanceOf(Record).isRequired,
  };

  componentWillMount() {
    this.props.generatorActions.fetchAllMaterials();
    this.props.generatorActions.fetchAllSources();
    this.props.generatorActions.fetchAllPresets();
  }

  onGenerate = () => {
    this.props.generatorActions.clearQuiz();
    this.props.routeActions.push('/preview');
    this.props.generatorActions.generate(this.props.setting);
  }

  render() {
    const {
      settingActions: actions,
      setting,
      resource,
    } = this.props;
    const {
      updateMaterial,
      updateSections,
      updateSources,
      clearSources,
      updateFormat,
      updateAdvanced,
    } = actions;
    const lang = this.props.setting.target.material.get('lang') || '';
    const preset = resource.presets.get(lang);

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
            materials={resource.materials}
            currentSetting={setting.target}
            updateMaterial={updateMaterial}
            updateSections={updateSections}
          />
          <FormatSettings
            currentSetting={setting.format}
            updateFormat={updateFormat}
          />
          <SourcesSettings
            sources={resource.sources}
            filter={lang}
            currentSetting={setting.sources}
            updateSources={updateSources}
            clearSources={clearSources}
          />
          <AdvancedSettings
            preset={preset}
            currentSetting={setting.advanced}
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
