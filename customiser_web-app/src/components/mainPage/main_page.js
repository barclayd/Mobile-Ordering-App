import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Cell } from 'react-mdl';
import logo from '../../assets/Logo.png';
import menu from '../../assets/menu.png';
import stats from '../../assets/stats.png';
import './main_page.css';

export default class main_page extends Component {
  render() {
    return (
      <div style={{ width: '100%', margin: 'auto' }}>
        <Grid className="main-grid">
          <Cell col={12}>
            <div className="main">
              <img src={logo} width="10%" height="10%"/>;
              <h1>DrinKing Customiser Application</h1>
              <div className='menu'>
                <h2>Menu customiser</h2>
                <img src={menu} width="95%" height="95%"/>;
                <p>View or add/remove drinks from your menu</p>
              </div>
              <div className='stats'>
                <h2>Statistics viewer</h2>
                <img src={stats} width="30%" height="30%"/>;
                <p>View stats such as number of orders per
                collection point.</p>
              </div>
              <div className='text'><p>In your current DrinKing package you are able to edit/view drinks prices, and view statistics
                your collection points that you have sent to us. In addition to looking at your services you can also
                <Link to="/setUp"> set up</Link> your application, this tells us what kind of service you intend
                to operate and means that we can suggest a personalised customer facing app that you may like.</p>
              </div>

                {/**/}



            </div>
          </Cell>
        </Grid>
      </div>
    )
  }
}
