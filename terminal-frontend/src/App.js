import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <div id="accountsHotbar">
            <button>Jon</button>
            <button className="selected">Ben</button>
            <button>Jess</button>
            <button>Markus</button>
            <button>Jess</button>
          </div>

          <div id="accountSwitcherContainer">
            <button className="large"><FontAwesomeIcon icon={faRetweet} /> Switch account</button>
          </div>

          <h1>AWAITING COLLECTION (2):</h1>
          <div className="ordersContainer">
            <div className="orderContainer">
              <h2>#ALVR - 11:36pm</h2>
              <div className="orderButtonsContainer">
                <button className="orderButton">
                  <span className="icon notReady"></span>
                  <span className="title">Not ready</span>
                  <br />
                  <span className="subtitle">Mark as un-ready</span>
                </button>
                <button className="orderButton">
                  <span className="icon notReady"></span>
                  <span className="title">More</span>
                  <br />
                  <span className="subtitle">Billing &amp; more</span>
                </button>
              </div>
            </div>
            <div className="orderContainer">
              <h2>#KHVD - 11:39pm</h2>
              <div className="orderButtonsContainer">
                <button className="orderButton">
                  <span className="icon notReady"></span>
                  <span className="title">Not ready</span>
                  <br />
                  <span className="subtitle">Mark as un-ready</span>
                </button>
                <button className="orderButton">
                  <span className="icon notReady"></span>
                  <span className="title">More</span>
                  <br />
                  <span className="subtitle">Billing &amp; more</span>
                </button>
              </div>
            </div>
          </div>

          <h1>YOUR IN-PROGRESS (2):</h1>
          
          <h3>#BXCQ - 11:41pm</h3>
          <h4>6 orders currently pending...</h4>



        </header>
      </div>
    );
  }
}

export default App;
