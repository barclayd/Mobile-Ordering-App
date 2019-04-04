import React from 'react';
import TextField from "material-ui/TextField";
import CheckIcon from "material-ui/svg-icons/navigation/check";
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

  change = e => {
    const { name, value } = e.target;
    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value
      }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.handleSave(this.props.i, this.state.values);
  };

  render() {
    const { header, x, i } = this.props;
    return [
      header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>
          <TextField
            name={y.prop}
            onChange={this.change}
            value={this.state.values[y.prop]}
          />
        </TableRowColumn>
      )),
      <TableRowColumn key="icon-row-column">
        <CheckIcon onClick={this.onSubmit} />
        <CancelIcon onClick={this.props.stopEditing} />
      </TableRowColumn>
    ];
  }
}

export default Editable;