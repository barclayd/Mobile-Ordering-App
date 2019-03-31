import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class setUp extends React.Component {
  constructor(props) {
    super(props)

    const questionsForUser = [
      {
        text: "What is your target audience for your business?",
        option: [
          "Students",
          "Local people close to your bar",
          "High-Income clients",
          "Unsure/huge variety"
        ],
      },
      {
        text: "What kind of drinks do you specialise in?",
        option: [
          "Craft Beers",
          "Low price drinks",
          "Classy cocktails",
          "Family craft drinks"
        ],
      },
      {
        text: "Thank you very much for your option." ,
        option: [] //that's it.
      },
    ];

    this.state = {current:0, dataSet:questionsForUser}
    this.handleClick = this.handleClick.bind(this)

  } // end constructor

  handleClick() {
    if (this.state.current === 2) {
    } else {
      this.setState({current: this.state.current + 1})
    }
  }

  render() {
    return(
      <div>
        <p>hi</p>
      </div>
    )
  }
}



ReactDOM.render(
  <setUp />,
  document.getElementById("root")
)
