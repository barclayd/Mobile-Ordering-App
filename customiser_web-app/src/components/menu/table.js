import React from "react";
import { Table } from "material-ui/Table";
import Editable from "./editable";

//code adapted from : https://github.com/benawad/basic-react-form/blob/8_cancel_edit/src/Table.js

const row = (
  x,
  i,
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleSave,
  stopEditing
) => {
  const currentlyEditing = editIdx === i;
  return currentlyEditing ? (
    <TableRow key={`inline-form-${i}`} selectable={false}>
      <InlineForm
        handleSave={handleSave}
        header={header}
        x={x}
        i={i}
        stopEditing={stopEditing}
      />
    </TableRow>
  ) : (
    <TableRow key={`tr-${i}`} selectable={false}>
      {header.map((y, k) => (
        <TableRowColumn key={`trc-${k}`}>{x[y.prop]}</TableRowColumn>
      ))}
      <TableRowColumn>
        <EditIcon onClick={() => startEditing(i)} />
        <TrashIcon onClick={() => handleRemove(i)} />
      </TableRowColumn>
    </TableRow>
  );
};

export default ({
                  data,
                  header,
                  handleRemove,
                  startEditing,
                  editIdx,
                  handleSave,
                  stopEditing,
                }) => (
  <Table>
    <TableHeader>
      <TableRow>
        {header.map((x, i) => (
          <TableHeaderColumn key={`thc-${i}`}>
            <div
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
            </div>
          </TableHeaderColumn>
        ))}
        <TableHeaderColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((x, i) =>
        row(
          x,
          i,
          header,
          handleRemove,
          startEditing,
          editIdx,
          handleSave,
          stopEditing
        )
      )}
    </TableBody>
  </Table>
);