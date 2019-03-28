import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBeer, faCamera, faExclamation, faExclamationTriangle, faInfo, faLongArrowAltUp, faRetweet, faTrophy, faCheck, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import QrReader from "react-qr-reader";
import { connect } from 'react-redux';
import './App.css';
import * as actions from '../src/store/actions/index';
import BillingPopupWindow from './containers/billing-popup-window/billing-popup-window';
import ManualPickupPopupWindow from './containers/manual-pickup-popup-window/manual-pickup-popup-window';
import MultiColumnItemList from './components/multi-column-item-list/multi-column-item-list';
import NotesPopupWindow from './components/notes-popup-window/notes-popup-window';
import PickupPopupWindow from './containers/pickup-popup-window/pickup-popup-window';
import SwitchAccountsPopupWindow from './containers/switch-accounts-popup-window/switch-accounts-popup-window';
import SelectCollectionPointPopupWindow from './containers/select-collection-point-popup-window/select-collection-point-popup-window';
import TimeAgo from './containers/time-ago-clean/time-ago-clean';
import UpcomingPopupWindow from './components/upcoming-popup-window/upcoming-popup-window';
import NotesIcon from "./assets/notes.svg";
import {OrderStatuses} from './helpers/schemaHelper.js';
import {rangeScaling} from "./helpers/FunctionLib.js";
import OutOfStockPopUpWindow from './containers/out-of-stock-popup-window/out-of-stock-popup-window';
import {rebuildDateAndDrinksForOrderWithQuantities} from './helpers/FunctionLib.js';
import LoadingIcon from './assets/loading-icon.gif';

// Settings:
const notificationDuration = 8000; // How long notifications stay on-screen (milliseconds)
const qrDelay = 200; // How fast to scan for QR codes (more info: https://www.npmjs.com/package/react-qr-reader)
const validScanCooldown = 3000; // Delay before accepting more QR codes after a valid scan (blocks notification scan)
const maxCollapsedOrdersToShow = 3; // How many orders show in a collapsed stack before fading to nothing
const collapsedOrderOpacityOffset = 35; // Opacity dim amount for collapsed awaiting orders

class App extends Component {
  constructor (props) {
    super(props);

    this.previewDiv = React.createRef();
  }

  state = {
    // Hardcoded notifications have IDs in the negative so as to not conflict with addNotification()
    notifications: [],

    collectionPoints: [
      {
        id: 1,
        name: "Downstairs",
        description: "Outside WHSmiths, usually dead."
      },
      {
        id: 2,
        name: "Upstairs",
        description: "Small minibar."
      },
      {
        id: 3,
        name: "Main floor",
        description: "Wide bar."
      }
    ],

    lastNotificationID: 0,

    selectedStaffMemberID: "5c97adae8cab340a0995dd25",

    lastValidScan: 0,
    qrResult: "empty",

    awaitingOrdersClass: "collapsed",
    awaitingOrdersCollapsed: true,
  };

  loadOrdersIntoStateIndexArrays = (orders) => {
    let awaitingOrdersIndexes=[], inProgressOrdersIndexes=[], pendingOrders=[];

    for(let orderIndex = 0; orderIndex < orders.length; orderIndex += 1) {
      let order = orders[orderIndex];

      switch (order.status) {
        case OrderStatuses.AWAITING_COLLECTION:
          awaitingOrdersIndexes.push(orderIndex);
          break;
        case OrderStatuses.IN_PROGRESS:
          inProgressOrdersIndexes.push(orderIndex);
          break;
        default:
          pendingOrders.push(order);
      }
    }

    this.setState({
      awaitingOrdersIndexes: awaitingOrdersIndexes,
      inProgressOrdersIndexes: inProgressOrdersIndexes,
      pendingOrders: pendingOrders
    })
  };

  addNotification = (iconClassName, title, description) => {
    // Increment notification key/id
    this.setState((prevState) => {
      return { lastNotificationID: prevState.lastNotificationID + 1 }
    }, () => {
      // Build notification object
      const newNotification = {
        id: this.state.lastNotificationID,
        title: title,
        class: iconClassName,
        description: description,
        date: new Date(),
        isDismissed: false,
      };

      // Add notification to notifications state
      this.setState((prevState) => {
        return {
          notifications: [...prevState.notifications, newNotification]
        }
      })
    })
  };

  getStaffMemberFullName = (staffID) => {
    let staffMember = this.state.barStaff.find(x => x._id === staffID);
    if (!staffMember) return "unknown";
    return staffMember.firstName + " " + staffMember.lastName;
  };

  // Takes an order index to get an order object to set orderForPopup state obj
  setOrderForPopup = (orderIndex, callback) => {
    this.setState({orderForPopup: this.state.serverOrders[orderIndex]}, callback());
  };

  changeCollectionPoint = (collectionPointID) => {
    this.setState({collectionPointID: collectionPointID});
  };

  // Displays billing popup for order by order index
  showBilling = (orderIndex) => {
    this.setOrderForPopup(orderIndex, () => { this.state.showBilling() });
  };

  // Displays customer notes popup for order by order index
  showNotes = (orderIndex) => {
    this.setOrderForPopup(orderIndex, () => { this.state.showNotes() });
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        qrResult: data
      });

      try {
        let qrJSON = JSON.parse(data); // Attempt to parse QR data to see if it contains valid JSON
        if (qrJSON.orderID && new Date() - this.state.lastValidScan > validScanCooldown) { // Check the JSON contains an order ID, then run the pickup function
          this.pickupOrder(qrJSON.orderID, qrJSON.customerID);
          this.setState({
            lastValidScan: new Date()
          });
        }

      } catch (error) {
        console.error(error);
      }
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  // Handler to re-enable order scanning for the same order when knowingly dismissed by bartender
  pickupPopupDismissed = () => {
    this.setState({orderWindowOpen: null})
  };

  // Strict func that takes order ID and corresponding customer ID from QR to prevent order code theft
  pickupOrder = (orderID, customerID) => {
    let order = this.state.serverOrders.find(order => order.id === orderID && order.customerID === customerID); // Find order sharing the same ID and customer ID

    // Check order is found and was not already just scanned (stop popup spam)
    if (order && !this.state.orderWindowOpen) {
      if (order.status === OrderStatuses.AWAITING_COLLECTION) {
        this.setState({orderForPopup: order, orderWindowOpen: true}, this.state.showPickup) // Show billing popup
      } else {
        this.addNotification("warning", "Collection not ready", "Customer's order is not ready for collection")
      }

    } else if (!order) {
      this.addNotification("error", "Scan error", "Customer QR has been tampered with!")
    }
  };

  componentDidMount() {
    // Pull orders from server
    const collectionId = localStorage.getItem('collectionPoint') || '5c925636bc63a912ed715316';
    this.props.findBarStaff("5c6aafda90d4735a4e22f711");
    this.setState({selectedStaffMemberID: localStorage.getItem("selectedStaffMemberID") || "5c97adae8cab340a0995dd25"});
    this.props.loadOrders(collectionId);
    this.getUserMedia();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.serverOrders.length === 0) return;
    let newServerOrders = rebuildDateAndDrinksForOrderWithQuantities(this.props.serverOrders);
    let areArraysEqual = JSON.stringify(newServerOrders) === JSON.stringify(prevState.serverOrders);

    // only update chart if the data has changed
    if (!this.props.loading && !areArraysEqual) {
      this.loadOrdersIntoStateIndexArrays(newServerOrders); // Load orders into arrays

      this.setState({
        serverOrders: newServerOrders,
        barStaff: this.props.barStaff
      });
    }
  }



  // Relaxed version of pickup order, used for bartenders to manually input just an order ID (not corresponding customer ID)
  pickupOrderInsecure = (orderID) => {
    let order = this.state.serverOrders.find(order => order.collectionId === orderID); // Find order by ID
    if (order) {
      if (order.status === OrderStatuses.AWAITING_COLLECTION) {
        this.setState({orderForPopup: order}, this.state.showPickup) // Show billing popup
      } else {
        this.addNotification("warning", "Collection not ready", "Customer's order is not ready for collection")
      }
    } else {
      this.addNotification("error", "Order not found", "No order with code " + orderID + " exists!")
    }
  };

  getUserMedia = () => {
      if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, this.qrReader, this.handleError);
      }
  };

  qrReader = () => (
    <QrReader
        delay={qrDelay}
        onError={this.handleError}
        onScan={this.handleScan}
    />
  );

  renderCustomerNotes = (orderIndex, notes) => {
    if (notes) {
      // Crop down long notes to prevent overflowing
      if (notes.length > 50) {
        notes = notes.substr(0, 50) + "...";
      }

      return (
        <div onClick={() => this.showNotes(orderIndex) } className="customerNotesContainer">
          <img className="notesIcon" src={NotesIcon} alt="Notes icon"/>
          <h2 className="header">Customer notes:</h2>
          <div className="notes">{notes}</div>
        </div>
      )
    }
  };

  static getNotificationIconJSX(notificationClass) {
    switch (notificationClass) {
      case "info":
        return <FontAwesomeIcon icon={faInfo} />;
      case "success":
        return <FontAwesomeIcon icon={faTrophy} />;
      case "warning":
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      default: // "error"
        return <FontAwesomeIcon icon={faExclamation} />;
    }
  }

  // Runs an inteligent queuing algorithm to pull the top order, and similar top orders at once into the current staff member's in-progress feed
  TakeNextOrdersFromQueue = () => {
    let mostRecentOrderID = this.state.pendingOrders[this.state.pendingOrders.length-1]._id;
    let ordersToTake = [mostRecentOrderID];
    console.log(this.state.pendingOrders)

    for (let i = 0, len = ordersToTake.length; i < len; i++) {
      this.props.updateOrder(ordersToTake[i], "IN_PROGRESS", this.state.selectedStaffMemberID)
    }
  }

  ToggleAwaitingCollapse = (event) => {
    let newStyle = "collapsed";
    let collapsed = true;
    if (this.state.awaitingOrdersClass === newStyle) {
      newStyle = "";
      collapsed = false;
    }
    this.setState({awaitingOrdersClass: newStyle, awaitingOrdersCollapsed: collapsed});
  };

  scrollToPreview = () => {
    this.previewDiv.current.scrollIntoView({ behavior: 'smooth' })
  };

  showOutOfStock = () => { this.state.showOutOfStock() };

  switchAccounts = (staffID) => {
    this.setState({selectedStaffMemberID: staffID});
    localStorage.setItem("selectedStaffMemberID", staffID)
  };

  buildLoadingScreen = (message) => {
    return (
      <div className="loadingScreen">
          <img src={LoadingIcon} alt="Loading icon"/>
          <span className="loadingMessage">{message}</span>
      </div>
    )
  };

  // Shows "this is where your orders will be" tip if you have no orders
  buildOrdersAreaEmptyTip = (totalOrders, tipTitle, tipMessage) => {
    // Check if there are no orders before displaying tip
    if (totalOrders === 0) {
      return <div className="orderContainer tip-prompt">
        <span className="title">{tipTitle}</span><br />
        <span className="message">{tipMessage}</span>
      </div>
    }
  };

  // Func to build total pending orders differently depending on the quantity
  buildPendingOrdersTitle = (numberOfOrders) => {
    if (this.state.pendingOrders.length === 0) {
      return <h4>0 pending orders - you're all caught up!</h4>
    } else {
      return <h4>{numberOfOrders} {numberOfOrders === 1 ? "order" : "orders"} currently pending...</h4>
    }
  };

  render() {
    if (!this.state.serverOrders || this.state.serverOrders.length === 0) {
      return this.buildLoadingScreen("Loading orders...")

    } else {

      return (
        <div className="App">
          <header className="App-header">
            <div id="topBar">
              <div id="accountsHotbar">
              {
                this.state.barStaff.map((staffData) => {
                  let buttonClass = "";
                  if (this.state.selectedStaffMemberID === staffData._id) buttonClass = "selected";
                  return ( <button key={staffData._id} onClick={()=>{this.switchAccounts(staffData._id)}} className={buttonClass}>{staffData.firstName}</button> );
                })
              }
              </div>

              <div id="buttonsToolbar">
                <button className="large" onClick={() => {
                  this.setState({showPreview: !this.state.showPreview}, () => {
                    if (this.state.showPreview) {
                      document.getElementsByClassName("qrReader")[0].style.display = "block";
                      this.scrollToPreview();
                    } else {
                      document.getElementsByClassName("qrReader")[0].style.display = "none";
                    }
                  })
                }}><FontAwesomeIcon icon={faCamera} /> Preview scanner</button>

                <button className="large" onClick={this.state.showManualPickup}><FontAwesomeIcon icon={faBeer} /> Pickup order</button>

                <button onClick={this.state.showSwitchAccounts} className="large"><FontAwesomeIcon icon={faRetweet} /> More accounts</button>
              </div>
            </div>

            <h1>Awaiting collection ({ this.state.awaitingOrdersIndexes.length }):</h1>
            <div className={"ordersContainer " + this.state.awaitingOrdersClass}>
              {
                // Build tip shown when there are no orders awaiting collection
                this.buildOrdersAreaEmptyTip(this.state.awaitingOrdersIndexes.length, "No orders awaiting collection!", "Orders ready for pickup show here")
              }

              {
                this.state.awaitingOrdersIndexes.map((orderIndex, incrementer) => {
                  const orderData = this.state.serverOrders[orderIndex];
                  const orderZIndex = this.state.awaitingOrdersIndexes.length - incrementer;

                  // Calculate styles
                  let orderOpacity = 1; // Order opacity (lowered when collapsed and far down)
                  let width = 100; // Width as percentage
                  if (incrementer !== 0) {
                    if (this.state.awaitingOrdersCollapsed)
                      orderOpacity = rangeScaling(incrementer, 100 - collapsedOrderOpacityOffset, 0, 0, maxCollapsedOrdersToShow) / 100;
                      width = rangeScaling(incrementer, 100, 95, 0, maxCollapsedOrdersToShow);
                  }
                  
                  return (
                    <div
                        key={orderIndex}
                        onClick={this.ToggleAwaitingCollapse}
                        className="orderContainer collapsible"
                        style={{zIndex: orderZIndex, opacity: orderOpacity, width: width + "%"}}
                    >
                      <h2>#{orderData.collectionId} - <TimeAgo date={orderData.date}/></h2>
                      <h5>Made by <span className="bartenderName">{ this.getStaffMemberFullName(orderData.orderAssignedTo._id) }</span></h5>
                      <div className="orderButtonsContainer" onClick={(e)=>{ e.stopPropagation(); }}>
                        <button className="orderButton" onClick={()=>{
                          this.props.updateOrder(orderData._id, "IN_PROGRESS", this.state.selectedStaffMemberID); // Update order to state to pending and assign to current bartender
                        }}>
                          <span className="icon notReady"><FontAwesomeIcon icon={faUndoAlt} /></span>
                          <span className="title">Not ready</span>
                          <br />
                          <span className="subtitle">Mark as un-ready</span>
                        </button>
                        <button onClick={()=>{this.showBilling(orderIndex)}} className="orderButton">
                          <span className="icon billingAndMore"></span>
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

            <h1>Your in-progress:</h1>
            <div className="ordersContainer">
              {
                // Build tip shown when there are no in-progress orders for the logged in user
                this.buildOrdersAreaEmptyTip(
                  // Reducer to calculate how total orders for current staff member in in-progress array
                  this.state.inProgressOrdersIndexes.reduce((accumulator, orderIndex) => {
                    let order = this.state.serverOrders[orderIndex];
                    if (order.orderAssignedTo && order.orderAssignedTo._id === this.state.selectedStaffMemberID) return accumulator + 1; else return accumulator;
                  },0), "No in-progress orders!", "Orders you take will appear here")
              }

              {
                  this.state.inProgressOrdersIndexes.map((orderIndex) => {
                    const orderData = this.state.serverOrders[orderIndex];

                    // Only show pending orders belonging to the current staff member
                    if (orderData.orderAssignedTo._id !== this.state.selectedStaffMemberID) return null;

                    return (
                      <div key={orderIndex} className="orderContainer in-progress">

                        <MultiColumnItemList orderItems={orderData.drinks} />

                        <h3>#{orderData.collectionId} - <TimeAgo date={orderData.date}/></h3>

                        { this.renderCustomerNotes(orderIndex, orderData.notes) }

                        <div className="orderButtonsContainer">
                          <button className="orderButton" onClick={() => this.props.updateOrder(orderData._id, "AWAITING_COLLECTION", this.state.selectedStaffMemberID)}>
                            <span className="icon ready"><FontAwesomeIcon icon={faCheck} /></span>
                            <span className="title">Ready</span>
                            <br />
                            <span className="subtitle">Mark as ready</span>
                          </button>
                          <button className="orderButton" onClick={()=> {this.props.updateOrder(orderData._id, "PENDING", this.state.selectedStaffMemberID)}}>
                            <span className="icon notInProgress"><FontAwesomeIcon icon={faUndoAlt} /></span>
                            <span className="title">Not in progress</span>
                            <br />
                            <span className="subtitle">Return to pending</span>
                          </button>
                          <button onClick={() => { this.showBilling(orderIndex) }} className="orderButton">
                            <span className="icon billingAndMore"></span>
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
              <button disabled={this.state.pendingOrders.length===0} className="pendingOrderButton" onClick={this.TakeNextOrdersFromQueue}>
                <span className="icon next"><FontAwesomeIcon icon={faLongArrowAltUp} /></span>
                <span className="title">Take next order</span>
                <br />
                <span className="subtitle">
                  Adds next order to your ({
                    this.state.barStaff.find(x => x._id === this.state.selectedStaffMemberID).firstName
                  }) in-progress feed
                </span>
              </button>
              <button disabled={this.state.pendingOrders.length===0} onClick={this.state.showUpcoming} className="pendingOrderButton">
                <span className="icon history"><FontAwesomeIcon icon={faClock} /></span>
                <span className="title">View upcoming</span>
                <br />
                <span className="subtitle">
                  Display a feed of pending orders
                </span>
              </button>
            </div>
            { this.buildPendingOrdersTitle(this.state.pendingOrders.length) }

            {/* Build popup windows, assigning their show functions to the App.js state so they're callable */}
            <BillingPopupWindow showFunc={callable => this.setState({showBilling: callable})} showOutOfStock={this.showOutOfStock} order={this.state.orderForPopup} />
            <PickupPopupWindow showFunc={callable => this.setState({showPickup: callable})} showOutOfStock={this.showOutOfStock} dismissedHandler={this.pickupPopupDismissed} order={this.state.orderForPopup} />
            <NotesPopupWindow showFunc={callable => this.setState({showNotes: callable})} order={this.state.orderForPopup} />
            <SwitchAccountsPopupWindow showFunc={callable => this.setState({showSwitchAccounts: callable})} barStaff={this.state.barStaff} activeUser={this.state.selectedStaffMemberID} switchAccountsFunc={this.switchAccounts} />
            <ManualPickupPopupWindow showFunc={callable => this.setState({showManualPickup: callable})} pickupOrderFunc={this.pickupOrderInsecure} />
            <UpcomingPopupWindow showFunc={callable => this.setState({showUpcoming: callable})} pendingOrders={this.state.pendingOrders} />
            <OutOfStockPopUpWindow showFunc={callable => this.setState({showOutOfStock: callable})} order={this.state.orderForPopup} />
            <SelectCollectionPointPopupWindow showFunc={callable => this.setState({showCollectionPoint: callable})} collectionPoints={this.state.collectionPoints} changeColletionPoint={this.changeCollectionPoint} />

            <div className="notificationsContainer">
              {
                this.state.notifications.map((notificationData, index) => {
                  // Check the notification hasn't expired or been dismissed:
                  if ((new Date() - notificationData.date) > notificationDuration || notificationData.isDismissed) return null;

                  setTimeout(()=> {
                    let newNotifications = this.state.notifications;
                    newNotifications[index].isDismissed = true;
                    this.setState({notifications: newNotifications})
                  }, notificationDuration);

                  return (
                    <div key={index} className="notificationBanner">
                      <span className={"icon " + notificationData.class}>{ App.getNotificationIconJSX(notificationData.class) }</span>
                      <div className="textContainer">
                        <span className="title">{notificationData.title}</span>
                        <br />
                        <span className="description">{notificationData.description}</span>
                      </div>
                      <div className="closeButton noselect" onClick={()=> {
                        let newNotifications = this.state.notifications;
                        newNotifications[index].isDismissed = true;
                        this.setState({notifications: newNotifications})
                      }}>&#x2716;</div>
                    </div>
                  )
                })
              }
            </div>


            {
              this.state.disableScanner ? null :
                <div ref={this.previewDiv} className="qrReader">
                  <QrReader
                      delay={qrDelay}
                      onError={this.handleError}
                      onScan={this.handleScan}
                  />
                  <p>
                    QR content:<br />
                    {this.state.qrResult}
                  </p>
                </div>
            }
          </header>
        </div>
      );
    }
  }
}

const mapReduxStateToProps = state => {
  return {
    serverOrders: state.orders.orders,
    updatedOrder: state.orders.updatedOrder,
    ordersLoading: state.orders.loading,
    barStaff: state.bar.barStaff
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: (collectionPoint) => dispatch(actions.getOrdersByCollectionPoint(collectionPoint)),
    updateOrder: (orderId, status, barStaffId) => dispatch(actions.updateOrder(orderId, status, barStaffId)),
    findBarStaff: (barId) => dispatch(actions.findBarStaff(barId))
  }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(App);
