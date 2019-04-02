import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Cell } from 'react-mdl';
import './main_page.css'

export default class main_page extends Component {
  render() {
    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        <Grid className="main-grid">
          <Cell col={12}>
            <img
              src='../../../../mobile/src/assets/Logo.png'
              alt="logo"
              className="avatar-img"
            />

            <div className="main">
              <h1>DrinKing Customiser Application</h1>
              <p>The Main page for the DrinKing customiser application. Here you can
              <Link to="/setUp"> set up?</Link></p>

            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}
