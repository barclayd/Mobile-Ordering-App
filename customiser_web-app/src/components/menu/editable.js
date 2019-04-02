import React from 'react';

export default class Editable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      values: {
        ...props.x
      }
    }
  }
}

export default Editable;