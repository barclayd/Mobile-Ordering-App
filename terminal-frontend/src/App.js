import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import TimeAgo from "react-timeago";
import "./App.css";
import PopupWindow from "./components/popup-window/popup-window";
import Button from "./components/Button/Button";
import Button1 from "./components/Button/Button1";
import Capture from "../src/components/Pics/Capture.PNG";
import Pound from "../src/components/Pics/Pound.jpg";
import Minus from "../src/components/Pics/Minus.jpg";
const OrderState = {
  AWAITING_COLLECTION: 0,
  IN_PROGRESS: 1,
  PENDING: 2
};

class App extends Component {
  constructor() {
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
    };

    let awaitingOrders = [],
      inProgressOrders = [],
      pendingOrders = [];
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
    this.setState({ billingPopupVisible: true });
  };
  closeBillingPopup = () => {
    this.setState({ billingPopupVisible: false });
  };

  renderBillingPopup = () => {
    if (this.state.billingPopupVisible) {
      return (
        <PopupWindow
          className="billingOptions"
          title="#KHVD OPTIONS:"
          subtitle="Ordered at 11:39pm, 21 minutes ago"
          showCloseButton={true}
          closeFunc={this.closeBillingPopup}
        >
          <h1>DRINKS:</h1>
          <div className="indentedContent">
            <ul className="orderList">
              <li>
                <span className="quantity">4x</span>VK Orange{" "}
                <span
                  style={{
                    marginLeft: "220px",
                    borderLeft: "3px dashed grey",

                    padding: "5px"
                  }}
                >
                  $23
                </span>
              </li>
              <li>
                <span className="quantity">1x</span>VK Green{" "}
                <span
                  style={{
                    marginLeft: "240px",
                    borderLeft: "3px dashed grey",
                    padding: "5px"
                  }}
                >
                  {" "}
                  $22
                </span>
              </li>
              <li style={{ marginTop: "-28px" }}>
                <span
                  style={{
                    marginLeft: "300px",
                    marginTop: "-100px",
                    color: "grey"
                  }}
                >
                  {" "}
                  ___ ___ ___ ___ ___ __ __
                  <br />
                </span>{" "}
                <span
                  style={{
                    marginLeft: "450px",
                    borderLeft: "3px dashed grey"
                  }}
                >
                  {" "}
                  $45{" "}
                </span>
                <br />
                <span
                  style={{
                    marginLeft: "450px",
                    borderLeft: "3px dashed grey"
                  }}
                />
              </li>
            </ul>
            {/* <Button /> */}
            <button
              style={{
                width: "200px",
                height: "70px",
                borderRadius: "20px 20px 20px 20px",
                display: "inline-block",
                margin: "50px"
              }}
            >
              Refund
              <br />
              <img
                src={Pound}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "200px",
                  marginLeft: "-5px",
                  marginTop: "-20px"
                }}
              />
              <span
                style={{
                  fontSize: "14px ",
                  fontWeight: "20px",
                  marginLeft: "5px"
                }}
              >
                Refund Customer
              </span>
            </button>
            <button
              style={{
                width: "200px",
                height: "70px",
                borderRadius: "20px 20px 20px 20px",
                display: "inline-block",
                margin: "50px"
              }}
            >
              Out Of Stock
              <br />
              <img
                src={Capture}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "200px",
                  marginLeft: "-30px",
                  marginTop: "-20px"
                }}
              />
              <span
                style={{
                  fontSize: "14px ",
                  fontWeight: "20px",
                  marginLeft: "5px"
                }}
              >
                Make unavailable
              </span>
            </button>

            <button
              style={{
                width: "200px",
                height: "70px",
                borderRadius: "20px 20px 20px 20px",
                display: "inline-block",
                margin: "50px"
              }}
            >
              Delete
              <br />
              <img
                src={Minus}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "200px",
                  marginLeft: "-30px",
                  marginTop: "-20px"
                }}
              />
              <span
                style={{
                  fontSize: "14px ",
                  fontWeight: "20px",
                  marginLeft: "5px"
                }}
              >
                Delete Item
              </span>
            </button>
          </div>
        </PopupWindow>
      );
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div id="accountsHotbar">
            {this.state.staffMembers.map(staffData => {
              let buttonClass = "";
              if (this.state.selectedStaffMember === staffData.id)
                buttonClass = "selected";
              return (
                <button key={staffData.id} className={buttonClass}>
                  {staffData.firstName}
                </button>
              );
            })}
          </div>

          <div id="accountSwitcherContainer">
            <button className="large">
              <FontAwesomeIcon icon={faRetweet} /> Switch account
            </button>
          </div>

          <h1>AWAITING COLLECTION ({this.state.awaitingOrders.length}):</h1>
          <div className="ordersContainer">
            {this.state.awaitingOrders.map(orderIndex => {
              const orderData = this.state.orders[orderIndex];
              return (
                <div key={orderData.id} className="orderContainer">
                  <h2>
                    #{orderData.id} - <TimeAgo date={orderData.orderDate} />
                  </h2>
                  <div className="orderButtonsContainer">
                    <button className="orderButton">
                      <span className="icon notReady" />
                      <span className="title">Not ready</span>
                      <br />
                      <span className="subtitle">Mark as un-ready</span>
                    </button>
                    <button
                      onClick={this.showBillingPopup}
                      className="orderButton"
                    >
                      <span className="icon notReady" />
                      <span className="title">More</span>
                      <br />
                      <span className="subtitle">Billing &amp; more</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <h1>YOUR IN-PROGRESS ({this.state.inProgressOrders.length}):</h1>
          <div className="ordersContainer">
            {this.state.inProgressOrders.map(orderIndex => {
              const orderData = this.state.orders[orderIndex];
              return (
                <div key={orderData.id} className="orderContainer">
                  <h3>
                    #{orderData.id} - <TimeAgo date={orderData.orderDate} />
                  </h3>
                  <div className="orderButtonsContainer">
                    <button className="orderButton">
                      <span className="icon notReady" />
                      <span className="title">Ready</span>
                      <br />
                      <span className="subtitle">Mark as ready</span>
                    </button>
                    <button
                      onClick={this.showBillingPopup}
                      className="orderButton"
                    >
                      <span className="icon notReady" />
                      <span className="title">More</span>
                      <br />
                      <span className="subtitle">Billing &amp; more</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <h4>{this.state.pendingOrders.length} orders currently pending...</h4>

          {this.renderBillingPopup()}
        </header>
      </div>
    );
  }
}

export default App;