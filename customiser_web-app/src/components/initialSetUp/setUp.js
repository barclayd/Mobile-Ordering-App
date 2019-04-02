import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class SetUp extends React.Component {
  constructor(props) {
    super(props)

    const questionsForUser = [
      {
        line: "What is your target audience for your business?",
        multiChoice: [
          "Students",
          "Local people close to your bar",
          "High-Income clients",
          "Unsure/huge variety"
        ],
      },
      {
        line: "What kind of drinks do you specialise in?",
        multiChoice: [
          "Craft Beers",
          "Low price drinks",
          "Classy cocktails",
          "Family craft drinks"
        ],
      },
      {
        line: "Thank you very much for your answers." ,
        multiChoice: [] //that's it.
      },
    ];

    this.state = {current:0, data:questionsForUser}
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
        <Area handleClick={this.handleClick} data={this.state.data[this.state.current]} />
      </div>
    )
  }
}

function ChoiceButton(props) {
  return(
    <div>
      <button onClick={() => props.handleClick(props.choice)}>{props.answer}</button>
    </div>
  )
}

function Question(props) {
  return (
    <p>{props.data.line}</p>
  )
}

function Area(props) {
  return(
    <div>
      <Question data={props.data} />
      <List data={props.data} handleClick={props.handleClick} />
    </div>
  )
}

function List(props) {
  let choices = [];
  for (let i = 0; i < props.data.multiChoice.length; i++) {
    choices.push(<ChoiceButton choice={i} handleClick={props.handleClick} answer={props.data.multiChoice[i]} />)
  }
  return(
    <div>
      {choices}
    </div>
  )
}

ReactDOM.render(
  <SetUp />,
  document.getElementById("root")
)
