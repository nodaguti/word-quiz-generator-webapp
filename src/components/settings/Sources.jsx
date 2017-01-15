import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import Table from 'material-ui/Table/Table';
import TableHeader from 'material-ui/Table/TableHeader';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';
import { translate } from 'react-i18next';

class SourcesSettings extends Component {
  static propTypes = {
    sources: PropTypes.instanceOf(List).isRequired,
    filter: PropTypes.string.isRequired,
    currentSettings: PropTypes.instanceOf(List).isRequired,
    updateSources: PropTypes.func.isRequired,
    clearSources: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  onRowSelection = (selectedRows) => {
    const {
      sources,
      filter,
      updateSources,
      clearSources,
    } = this.props;

    if (selectedRows === 'all') {
      updateSources(
        sources
          .toSeq()
          .filter((source) => !filter || source.get('lang') === filter)
          .map((source) => source.get('id'))
          .toList(),
      );
    } else if (selectedRows === 'none') {
      clearSources();
    } else {
      updateSources(
        sources
          .toSeq()
          .filter((source) => !filter || source.get('lang') === filter)
          .filter((source, idx) => selectedRows.indexOf(idx) !== -1)
          .map((source) => source.get('id'))
          .toList(),
      );
    }
  }

  renderSources = () => {
    const {
      sources,
      filter,
      currentSettings: selectedSources,
    } = this.props;

    return sources
      .toSeq()
      .filter((source) => !filter || source.get('lang') === filter)
      .map((source) =>
        this.renderSource(source, selectedSources.includes(source.get('id'))),
      )
      .toArray();
  }

  renderSource = (source, selected) => {
    const {
      id,
      name,
    } = source.toObject();

    return (
      <TableRow key={id} selected={selected}>
        <TableRowColumn>{name}</TableRowColumn>
      </TableRow>
    );
  }

  render() {
    const { t } = this.props;

    return (
      <Panel title={t('labels.sources')}>
        <Table
          fixedHeader
          selectable
          multiSelectable
          onRowSelection={this.onRowSelection}
        >
          <TableHeader enableSelectAll>
            <TableRow>
              <TableHeaderColumn>{t('labels.name')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
            showRowHover
          >
            {this.renderSources()}
          </TableBody>
        </Table>
      </Panel>
    );
  }
}

export default translate()(SourcesSettings);
