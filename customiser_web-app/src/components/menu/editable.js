import React from 'react';
import TextField from "material-ui/TextField";
import CancelIcon from "material-ui/svg-icons/navigation/cancel";
import { TableRow, TableRowColumn } from "material-ui/Table";

class Editable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      values: {
        ...props.x
      }
    }
  }

  render() {
    const { header, x, i } = this.props;
    return [
      header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>
          <TextField
            name={y.prop}
            onChange={this.change}
            value={this.state.values[y.prop]}
            errorText={this.state.errors[y.prop]}
          />
        </TableRowColumn>
      )),
      <TableRowColumn key="icon-row-column">
        <CancelIcon onClick={this.props.stopEditing} />
      </TableRowColumn>
    ];
  }
}

export default Editable;