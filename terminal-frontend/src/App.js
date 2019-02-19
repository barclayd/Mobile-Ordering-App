import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import TimeAgo from './components/time-ago-clean/time-ago-clean'
import './App.css';
import BillingPopupWindow from './components/billing-popup-window/billing-popup-window';
import NotesPopupWindow from './components/notes-popup-window/notes-popup-window';
import NotesIcon from "./notes.svg"

const OrderState = {
  AWAITING_COLLECTION: 0, 
  IN_PROGRESS: 1, 
  PENDING: 2
};

const itemsPerOrderListColumn = 4;

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
          orderItems: [
            {
              id: 1,
              name: "VK Orange",
              quantity: 1,
            },
            {
              id: 19,
              name: "VK Green",
              quantity: 2,
            }
          ],
          orderState: OrderState.IN_PROGRESS
        },
        {
          id: "ZBNU",
          orderDate: new Date(),
          customerID: 93,
          orderItems: [
            {
              id: 672,
              name: "VK Red",
              quantity: 1,
            },
            {
              id: 122,
              name: "Jager bomb",
              quantity: 5,
            },
            {
              id: 484,
              name: "Mojito",
              quantity: 1,
            },
            {
              id: 1023,
              name: "Bottled water",
              quantity: 2,
            },
            {
              id: 67,
              name: "Jumba juice cocktail",
              quantity: 1,
            }
          ],
          notes: "pleawse dont put a lime in my Vk becaseu i dont think im not allergic to htem!!!!",
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
      billingPopupVisible: false,
      notesPopupVisible: false
    }

    let awaitingOrders=[], inProgressOrders=[], pendingOrders=[];
    for (let orderIndex in this.state.orders) {
      let order = this.state.orders[orderIndex];
      switch (order.orderState) {
        case OrderState.AWAITING_COLLECTION:
          awaitingOrders.push(orderIndex);
          break;
        case OrderState.IN_PROGRESS:
          inProgressOrders.push(orderIndex);
          break;
        default:
          pendingOrders.push(orderIndex);
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
    if (this.state.billingPopupVisible)
      return (
        <BillingPopupWindow order={this.state.orders[1]} closeFunc={this.closeBillingPopup} />
      )
  }

  showNotesPopup = () => {
    this.setState({notesPopupVisible: true})
  }
  closeNotesPopup = () => {
    this.setState({notesPopupVisible: false})
  }
  renderNotesPopup = () => {
    if (this.state.notesPopupVisible)
      return (
        <NotesPopupWindow order={this.state.orders[3]} closeFunc={this.closeNotesPopup} />
      )
  }

  renderListItems = (items) => {
    return items.map((itemData) => {
      return (
        <li key={itemData.id}><span className="quantity">{itemData.quantity}x</span>{itemData.name}</li>
      );
    })
  }

  renderMultiColumItemList = (items) => {
    if (items.length > itemsPerOrderListColumn) {
      const columnCount = Math.floor(items.length / itemsPerOrderListColumn) + 1; // Calculate how many columns are needed
      let columns = []; // Array of arrays of rows

      // Build columns array
      for (let i=0; i < columnCount; i++) {
        let startIndex = i*itemsPerOrderListColumn
        columns.push(items.slice(startIndex, startIndex + itemsPerOrderListColumn));
      }

      // Loop through columns, creating each a UL and spawning LI inside
      let i = -1; // Counter used for key
      return columns.map((columnData) => {
        i++;
        return(
          <ul key={i} className="orderList multiColumn">
            { this.renderListItems(columnData) }
          </ul>
        )
      });

    } else {
      return <ul className="orderList">{ this.renderListItems(items) }</ul>
    }
  }

  renderCustomerNotes = (notes) => {
    if (notes) {
      // Crop down long notes to prevent overflowing
      if (notes.length > 50) {
        notes = notes.substr(0, 50) + "...";
      }

      return (
        <div onClick={this.showNotesPopup} className="customerNotesContainer">
          <img className="notesIcon" src={NotesIcon} alt="Notes icon"/>
          <h2 className="header">Customer notes:</h2>
          <div className="notes">{notes}</div>
        </div>
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
              this.state.awaitingOrders.map((orderIndex) => {
                const orderData = this.state.orders[orderIndex];
                return (
                  <div key={orderData.id} className="orderContainer">
                    <h2>#{orderData.id} - <TimeAgo date={orderData.orderDate}/></h2>
                    <div className="orderButtonsContainer">
                      <button className="orderButton">
                        <span className="icon notReady"></span>
                        <span className="title">Not ready</span>
                        <br />
                        <span className="subtitle">Mark as un-ready</span>
                      </button>
                      <button onClick={this.showBillingPopup} className="orderButton">
                        <span className="icon"></span>
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
          <div className="ordersContainer">
            {
                this.state.inProgressOrders.map((orderIndex) => {
                  const orderData = this.state.orders[orderIndex];
                  return (
                    <div key={orderData.id} className="orderContainer in-progress">

                      { this.renderMultiColumItemList(orderData.orderItems) }

                      <h3>#{orderData.id} - <TimeAgo date={orderData.orderDate}/></h3>

                      { this.renderCustomerNotes(orderData.notes) }

                      <div className="orderButtonsContainer">
                        <button className="orderButton">
                          <span className="icon ready"></span>
                          <span className="title">Ready</span>
                          <br />
                          <span className="subtitle">Mark as ready</span>
                        </button>
                        <button className="orderButton">
                          <span className="icon notInProgress"></span>
                          <span className="title">Not in progress</span>
                          <br />
                          <span className="subtitle">Return to pending</span>
                        </button>
                        <button onClick={this.showBillingPopup} className="orderButton">
                          <span className="icon"></span>
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
          
          <div className="pendingOrderButtons">
            <button onClick={this.showBillingPopup} className="pendingOrderButton">
              <span className="icon next"><FontAwesomeIcon icon={faLongArrowAltUp} /></span>
              <span className="title">Take next order</span>
              <br />
              <span className="subtitle">
                Adds next order to your ({
                  this.state.staffMembers.find(x => x.id === this.state.selectedStaffMember).firstName
                }) in-progress feed
              </span>
            </button>

            <button onClick={this.showBillingPopup} className="pendingOrderButton">
              <span className="icon history"><FontAwesomeIcon icon={faClock} /></span>
              <span className="title">View upcoming</span>
              <br />
              <span className="subtitle">
                Display a feed of pending orders
              </span>
            </button>
          </div>

          <h4>{this.state.pendingOrders.length} orders currently pending...</h4>

          { this.renderBillingPopup() }
          { this.renderNotesPopup() }

        </header>
      </div>
    );
  }
}

export default App;
