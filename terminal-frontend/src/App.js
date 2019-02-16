import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
import TimeAgo from 'react-timeago'
import './App.css';
import PopupWindow from './components/popup-window/popup-window'

const OrderState = {
  AWAITING_COLLECTION: 0, 
  IN_PROGRESS: 1, 
  PENDING: 2
};

class App extends Component {
  constructor () {
    super();

    this.state = {
      orders: [
        {
          id: "ALVR",
          orderDate: new Date(),
          customerID: 42,
          orderItems: [],
          orderState: OrderState.AWAITING_COLLECTION
        },
        {
          id: "KHVD",
          orderDate: new Date(),
          customerID: 13,
          orderItems: [],
          orderState: OrderState.AWAITING_COLLECTION
        },
        {
          id: "XHBS",
          orderDate: new Date(),
          customerID: 93,
          orderItems: [],
          orderState: OrderState.IN_PROGRESS
        },
        {
          id: "ACBS",
          orderDate: new Date(),
          customerID: 93,
          orderItems: [],
          orderState: OrderState.PENDING
        },
        {
          id: "PPLC",
          orderDate: new Date(),
          customerID: 93,
          orderItems: [],
          orderState: OrderState.PENDING
        },
        {
          id: "AHBS",
          orderDate: new Date(),
          customerID: 93,
          orderItems: [],
          orderState: OrderState.PENDING
        }
      ],

      staffMembers: [
        {
          id: 0,
          firstName: "Ben"
        },
        {
          id: 1,
          firstName: "Jess"
        },
        {
          id: 2,
          firstName: "Markus"
        },
        {
          id: 3,
          firstName: "James"
        }
      ],

      selectedStaffMember: 1,
      awaitingOrders: [],
      inProgressOrders: [],
      pendingOrders: [],
      billingPopupVisible: false
    }

    let awaitingOrders=[], inProgressOrders=[], pendingOrders=[];
    for (let orderIndex in this.state.orders) {
      let order = this.state.orders[orderIndex];
      switch (order.orderState) {
        case OrderState.AWAITING_COLLECTION:
          awaitingOrders.push(order.id);
          break;
        case OrderState.IN_PROGRESS:
          inProgressOrders.push(order.id);
          break;
        default:
          pendingOrders.push(order.id);
      }
    }
    
    this.state.awaitingOrders = awaitingOrders;
    this.state.inProgressOrders = inProgressOrders;
    this.state.pendingOrders = pendingOrders;
  }

  showBillingPopup = () => {
    this.setState({billingPopupVisible: true})
  }
  closeBillingPopup = () => {
    this.setState({billingPopupVisible: false})
  }

  renderBillingPopup = () => {
    if (this.state.billingPopupVisible) {
      return (
        <PopupWindow className="billingOptions" title="#KHVD PICKUP:" subtitle="Ordered at 11:39pm, 21 minutes ago" showCloseButton={true} closeFunc={this.closeBillingPopup}>
          <h1>DRINKS:</h1>
          <div className="indentedContent">
            <ul className="orderList">
              <li><span className="quantity">4x</span>VK Orange</li>
              <li><span className="quantity">1x</span>VK Green</li>
            </ul>

            <h2>Customer notes:</h2>
            <p className="indentedPara">pleawse dont put a lime in my Vk becaseu i dont think im not allergic to htem!!!!</p>
          </div>
        </PopupWindow>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="accountsHotbar">
          {
            this.state.staffMembers.map((staffData) => {
              let buttonClass = "";
              if (this.state.selectedStaffMember === staffData.id) buttonClass = "selected";
              return ( <button key={staffData.id} className={buttonClass}>{staffData.firstName}</button> );
            })
          }
          </div>

          <div id="accountSwitcherContainer">
            <button className="large"><FontAwesomeIcon icon={faRetweet} /> Switch account</button>
          </div>

          <h1>AWAITING COLLECTION ({ this.state.awaitingOrders.length }):</h1>
          <div className="ordersContainer">
            {
              this.state.orders.map((orderData) => {
                return (
                  <div key={orderData.id} className="orderContainer">
                    <h2>#{orderData.id} - {TimeAgo().format(orderData.orderDate)}</h2>
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
                );
              })
            }
          </div>

          <h1>YOUR IN-PROGRESS ({this.state.inProgressOrders.length}):</h1>
         
            <div className="orderContainer">
              <h2>#ALVR - 11:36pm</h2>
              <div className="orderButtonsContainer">
                <button className="orderButton">
                  <span className="icon notReady"></span>
                  <span className="title">Not ready</span>
                  <br />
                  <span className="subtitle">Mark as un-ready</span>
                </button>
                <button onClick={this.showBillingPopup} className="orderButton">
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

          <h3>#BXCQ - 11:41pm</h3>
          <h4>{this.state.pendingOrders.length} orders currently pending...</h4>

          { this.renderBillingPopup() }

        </header>
      </div>
    );
  }
}

export default App;
