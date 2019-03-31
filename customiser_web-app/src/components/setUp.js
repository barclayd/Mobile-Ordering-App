import React, { Component } from 'react';

export default class setUp extends Component {
  constructor(props) {
    super(props);

    const typeOfBar = [
      {
        name: "Student Bar",
        description: "Suitable for bars for students."
      },
      {
        name: "Cocktail Bar",
        description: "Suitable for cocktail bars."
      },
      {
        name: "Festivals",
        description: "Suitable for festivals."
      },
    ];
    this.state = {current:0, barSelect: typeOfBar}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(select) {
    if (this.state.current == 4) {
      this.setState({current: 0})
    }
    else{
      this.setState({current: this.state.current + 1})
    }
  }
  render() {
    return(
      <div>
        <selectionBox handleClick={this.handleClick} dataSet={this.state.dataSet[this.state.current]} />
      </div>
    )
  }
}

function selectionBox(props) {
  let style = {
    width: "25%",
    display: "block",
    textAlign: "center",
    boxSizing: "border-box",
    float: "left",
    padding: "0 2em"
  }