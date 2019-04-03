import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Cell } from 'react-mdl';
import logo from '../../assets/Logo.png';
import menu from '../../assets/menu.png';
import stats from '../../assets/stats.png';
import './statistics.css';

export default class statistics extends Component {
  render() {
    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        <Grid className="main-grid">
          <Cell col={12}>
            <div className="main">
              <img src={logo} width="10%" height="10%"/>;
              <h1>View Statistics</h1>
              <div className='whsmith'>
                <h2>Number of Orders in WHSmith</h2>
                <p><Link to="/whsmith">View stats</Link></p>
              </div>
              <div className='topfloor'>
                <h2>Number of Orders on the top floor</h2>
                <p><Link to="/topfloor">View stats</Link></p>
              </div>
            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}
