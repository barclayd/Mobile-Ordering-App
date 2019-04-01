import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class main_page extends Component {
  render() {
    return(
      <div><h1>Main Page</h1>
      <p>would you like to <Link to="/setUp">set up?</Link></p></div>
    )
  }
}
