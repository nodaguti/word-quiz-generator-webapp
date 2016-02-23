import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import Panel from 'components/Panel';
import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

export default class SourcesSettings extends Component {
  static propTypes = {
    sources: PropTypes.instanceOf(List).isRequired,
    currentSetting: PropTypes.instanceOf(List).isRequired,
    filter: PropTypes.string.isRequired,
    updateSources: PropTypes.func.isRequired,
  };

  onRowSelection = (selectedRows) => {
    const {
      sources,
      updateSources,
      filter,
    } = this.props;

    if (selectedRows === 'all') {
      updateSources(
        sources
          .toSeq()
          .filter((source) => !filter || source.get('lang') === filter)
          .map((source) => source.get('id'))
          .toList()
      );
    } else if (selectedRows === 'none') {
      updateSources(new List());
    } else {
      updateSources(
        sources
          .toSeq()
          .filter((source) => !filter || source.get('lang') === filter)
          .filter((source, idx) => selectedRows.indexOf(idx) !== -1)
          .map((source) => source.get('id'))
          .toList()
      );
    }
  }

  renderSources = () => {
    const {
      sources,
      filter,
      currentSetting: selectedSources,
    } = this.props;

    return sources
      .toSeq()
      .filter((source) => !filter || source.get('lang') === filter)
      .map((source) =>
        this.renderSource(source, selectedSources.includes(source.get('id')))
      )
      .toArray();
  }

  renderSource(source, selected) {
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
    return (
      <Panel title="Sources">
        <Table
          fixedHeader
          selectable
          multiSelectable
          onRowSelection={this.onRowSelection}
        >
          <TableHeader enableSelectAll>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
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
