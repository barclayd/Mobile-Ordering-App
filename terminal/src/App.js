import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBeer, faCamera, faExclamation, faExclamationTriangle, faInfo, faLongArrowAltUp, faRetweet, faTrophy, faCheck, faUndoAlt, faCog } from '@fortawesome/free-solid-svg-icons';
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
import MoreAccountsPopupWindow from './containers/more-accounts-popup-window/more-accounts-popup-window';
import SelectCollectionPointPopupWindow from './containers/select-collection-point-popup-window/select-collection-point-popup-window';
import TimeAgo from './containers/time-ago-clean/time-ago-clean';
import UpcomingPopupWindow from './components/upcoming-popup-window/upcoming-popup-window';
import NotesIcon from "./assets/notes.svg";
import {OrderStatuses} from './helpers/schemaHelper.js';
import {rangeScaling} from "./helpers/FunctionLib.js";
import OutOfStockPopUpWindow from './containers/out-of-stock-popup-window/out-of-stock-popup-window';
import {rebuildDateAndDrinksForOrderWithQuantities} from './helpers/FunctionLib.js';
import LoadingIcon from './assets/loading-icon.gif';
import SettingsPopupWindow from './containers/settings-popup-window/settings-popup-window';
import OrderSubscription from './components/order-subscription/OrderSubscription';

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
      pendingOrders: pendingOrders.reverse()
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

  getStaffMemberFullName = (userInfoObj) => {
    if (!userInfoObj) return "unknown";
    let staffMember = this.props.barStaff.find(x => x._id === userInfoObj._id);
    if (!staffMember) return "unknown";
    return staffMember.firstName + " " + staffMember.lastName;
  };

  // Takes an order index to get an order object to set orderForPopup state obj
  setOrderForPopup = (orderIndex, callback) => {
    this.setState({orderForPopup: this.state.serverOrders[orderIndex]}, callback());
  };

  changeCollectionPoint = (collectionPointID) => {
    console.log("Changed collection point", collectionPointID)

    // Update localstorage so same collection point shows after page reload
    localStorage.setItem("selectedcollectionPointID", collectionPointID)

    // Pull orders from server by selected collection point
    this.props.loadOrders(collectionPointID);
  };

  // Displays billing popup for order by order index
  showBilling = (orderIndex) => {
    this.setOrderForPopup(orderIndex, () => { this.state.showBilling() });
  };

  // Displays customer notes popup for order by order index
  showNotes = (orderIndex) => {
    this.setOrderForPopup(orderIndex, () => { this.state.showNotes() });
  };

  addStaffByIDToHotbar = (staffID) => {
    let newStaffHotBarOrder = this.state.staffHotBarOrder;
    let origStaffHotBarEntryIndex = newStaffHotBarOrder.findIndex((entry) => { return entry.id === staffID });
    if (origStaffHotBarEntryIndex !== -1) { // Check if the staff member already has an entry in staffHotBarOrder
      newStaffHotBarOrder[origStaffHotBarEntryIndex].dateAdded = new Date().getTime(); // Update their dateAdded to jump them to the hotbar front

    } else {
      // No entry for this staff member exists so create them one with the current date&time
      const staffHotBarEntry = {
        id: staffID,
        dateAdded: new Date().getTime(),
      };
      newStaffHotBarOrder.push(staffHotBarEntry)
    }

    // Sort array by last login time
    newStaffHotBarOrder.sort((a,b)=>{
      if (a.dateAdded < b.dateAdded) return 1; // Swap if A is older than B
      if (a.dateAdded > b.dateAdded) return -1; // Swap other direction if A is newer than B
      return 0; // Do nothing when dates are equal
    });

    // Update state
    this.setState({ staffHotBarOrder: newStaffHotBarOrder });
    localStorage.setItem("staffHotBarOrder", JSON.stringify(newStaffHotBarOrder)); // Update localstorage
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        qrResult: data
      });

      try {
        if (new Date() - this.state.lastValidScan > validScanCooldown) { // Check an item hasn't just been scanned then run pickup function
          this.setState({
            lastValidScan: new Date()
          }, ()=>{
            this.pickupOrderRelaxed(data);
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
    const order = this.state.serverOrders.find(order => order.collectionId === orderID && order.userInfo._id === customerID); // Find order and validate the customer ID
    this.showPickupForOrder(order)
  };

  // Relaxed version of pickup order (doesn't check corresponding customer ID)
  pickupOrderRelaxed = (orderID) => {
    this.showPickupForOrder( this.state.serverOrders.find(order => order.collectionId === orderID) )
  };

  showPickupForOrder = (order) => {

    // Check order is found and was not already just scanned (stop popup spam)
    if (order && !this.state.orderWindowOpen) {
      if (order.status === OrderStatuses.AWAITING_COLLECTION) {
        this.setState({orderForPopup: order, orderWindowOpen: true}, this.state.showPickup) // Show billing popup
      } else {
        this.addNotification("warning", "Collection not ready", "Customer's order is not ready for collection")
      }

    } else if (!order) {
      this.addNotification("warning", "Order not found", "No order could be found for this QR code!")
    }
  };

  componentDidMount() {
    const Hardcoded_barID = "5c6ab350180f855c65fce6ef" // Hardcoded SU bar ID until we add a login screen
    const Hardcoded_barStaffID = "5c97adae8cab340a0995dd25"
    const Hardcoded_collectionPointID = "5c925636bc63a912ed715316"

    // Pull bartenders from server
    this.props.findBarStaff(Hardcoded_barID);

    
    // Load bartender hotbar order from localstorage (or use empty array)
    this.setState({staffHotBarOrder: JSON.parse(localStorage.getItem("staffHotBarOrder")) || []});
    
    // Load selected bartender account from localstorage, or select the first if none exists
    this.setState({selectedStaffMemberID: localStorage.getItem("selectedStaffMemberID") || Hardcoded_barStaffID});
    

    // Pull collection points from server
    this.props.findCollectionPoints(Hardcoded_barID);

    
    // Load selected collection point from localstorage, or select the first if none exists
    const collectionPointID = localStorage.getItem("selectedcollectionPointID") || Hardcoded_collectionPointID;

    // Pull orders from server by selected collection point
    this.props.loadOrders(collectionPointID);

    // Load webcam for iOS
    if (navigator.mediaDevices.getUserMedia) {       
      navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}})
    }
  }

  // Map redux-recieved data that needs to be manipulated to react state from props
  componentDidUpdate(prevProps, prevState) {
    let newServerOrders = rebuildDateAndDrinksForOrderWithQuantities(this.props.serverOrders);
    let areArraysEqual = JSON.stringify(newServerOrders) === JSON.stringify(prevState.serverOrders);
    
    // only update chart if the data has changed
    if (!this.props.loading && (prevState.serverOrders == null || !areArraysEqual)) {
      this.loadOrdersIntoStateIndexArrays(newServerOrders); // Load orders into arrays

      this.setState({
        serverOrders: newServerOrders,
      });
    }
  }

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

    const firstOrder = this.state.pendingOrders[0]; // Get the top order to always be taken from queue
    const ordersToScan = 4; // How many extra orders to check for similarities
    const maxOrdersToTake = 3; // How many orders MAX can be taken automatically at once
    const matchThreshold = 30; // Percentage match required to pull order


    // Loop through orders under the top order
    let orderMatches = []; // Array holding IDs of orders under firstOrder and their number of matches
    for (let i = 1, len=ordersToScan+1; i < len; i++) {
      let orderData = this.state.pendingOrders[i];
      if (!orderData) break; // If no order exists at this index, stop scanning

      // Loop through each drink in the orderData to see if it's in firstOrder
      let matches = 0;
      let differences = 0;
      orderData.drinks.forEach(function(drink) {
        if (firstOrder.drinks.some(firstOrderDrink => {
          return firstOrderDrink._id === drink._id
        })) { matches++ } else { differences++ }
      });

      // Add order to list of orders with matches and differences
      orderMatches.push({id: orderData._id, matches: matches, differences: differences})
    }

    // Calculate which orders to take
    let ordersToTake = [firstOrder._id]; // Array of orders to be taken by bartender

    // Sort orderMatches by match & difference count
    orderMatches.sort((a,b)=>{
      if (a.matches < b.matches) return 1; // Swap if A has less matches than B
      if (a.matches > b.matches) return -1; // Swap other direction if A has more matches than B
      if (a.differences > b.differences) return 1; // Swap if A has more differences than B and same matches
      if (a.differences < b.differences) return -1; // Swap other direction if A has less differences than B and same matches
      return 0; // Do nothing if differences and matches are equal
    });

    console.log(orderMatches);

    // Take top n matched orders from orderMatches
    for (let i = 0, len=maxOrdersToTake-1; i < len; i++) {
      const orderMatch = orderMatches[i];
      if (!orderMatch) break; // Break for when orderMatches is smaller than maxOrdersToTake

      const matchPercentage = orderMatch.matches === 0 ? 0 : orderMatch.matches / firstOrder.drinks.length * 100;
      if (matchPercentage < matchThreshold) break; // Stop taking orders from orderMatches once an order doesn't meet the threshold
      ordersToTake.push(orderMatch.id); // Add order to ordersToTake
    }

    // Run API to take all orders in ordersToTake
    for (let i = 0, len = ordersToTake.length; i < len; i++) {
      this.props.updateOrder(ordersToTake[i], "IN_PROGRESS", this.state.selectedStaffMemberID)
    }
  };

  UpdateOrderStatus = (orderID, newStatus) => {
    this.props.updateOrder(orderID, newStatus, localStorage.getItem("selectedStaffMemberID"));
    this.addNotification("success", "Order status updated", "Order is now " + newStatus);
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

  showCollectionPoint = () => { this.state.showCollectionPoint()};


  moreAccounts = (staffID) => {
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

  buildHotbarButton = (staffData) => {
    let buttonClass = "";
    if (this.state.selectedStaffMemberID === staffData._id) buttonClass = "selected";
    return ( <button key={staffData._id} onClick={()=>{this.moreAccounts(staffData._id)}} className={buttonClass}>{staffData.firstName}</button> );
  };

  render() {
    if (!this.state.serverOrders) {
      return this.buildLoadingScreen("Loading orders...")
    
    } else if (!this.props.collectionPoints || this.props.collectionPoints.length === 0) { // Terminal requires at least 1 collection point
      return this.buildLoadingScreen("Loading collection points...")

    } else if (!this.props.barStaff || this.props.barStaff.length === 0) { // Terminal requires at least 1 staff to load
      return this.buildLoadingScreen("Loading bar staff...")

    } else {
      return (
        <div className="App">
          <header className="App-header">
            <div id="topBar">
              <div id="accountsHotbar">
              {
                // Build staff buttons from recently switched-into accounts
                this.state.staffHotBarOrder.map((staffHotBarData) => {
                  let staffData = this.props.barStaff.find(entry => entry._id === staffHotBarData.id);
                  if (!staffData) return null; // Don't attempt to add button if the staff member referenced in localstorage has been deleted
                  return this.buildHotbarButton(staffData)
                })
              }
              {
                // Build staff buttons for all other accounts
                this.props.barStaff.map((staffData) => {
                  if (this.state.staffHotBarOrder.find(entry => entry.id === staffData._id)) {
                    return null
                  } else {
                    return this.buildHotbarButton(staffData)
                  }
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

               <button onClick={this.state.showSettings} className='large'> <FontAwesomeIcon icon ={faCog} /> Settings </button>

                <button className="large" onClick={this.state.showManualPickup}><FontAwesomeIcon icon={faBeer} /> Pickup order</button>

                <button onClick={this.state.showMoreAccounts} className="large"><FontAwesomeIcon icon={faRetweet} /> More accounts</button>
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
                      <h5>Made by <span className="bartenderName">{ this.getStaffMemberFullName(orderData.orderAssignedTo) }</span></h5>
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
                    this.props.barStaff.find(x => x._id === this.state.selectedStaffMemberID).firstName
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
            <BillingPopupWindow showFunc={callable => this.setState({showBilling: callable})} showOutOfStock={this.showOutOfStock} order={this.state.orderForPopup} updateOrderFunc={this.UpdateOrderStatus}/>
            <PickupPopupWindow showFunc={callable => this.setState({showPickup: callable})} showOutOfStock={this.showOutOfStock} dismissedHandler={this.pickupPopupDismissed} order={this.state.orderForPopup} updateOrderFunc={this.UpdateOrderStatus}/>
            <NotesPopupWindow showFunc={callable => this.setState({showNotes: callable})} order={this.state.orderForPopup} />
            <MoreAccountsPopupWindow showFunc={callable => this.setState({showMoreAccounts: callable})} barStaff={this.props.barStaff} activeUser={this.state.selectedStaffMemberID} moreAccountsFunc={this.moreAccounts} addStaffByIDToHotbarFunc={this.addStaffByIDToHotbar} />
            <ManualPickupPopupWindow showFunc={callable => this.setState({showManualPickup: callable})} pickupOrderFunc={this.pickupOrderRelaxed} />
            <UpcomingPopupWindow showFunc={callable => this.setState({showUpcoming: callable})} pendingOrders={this.state.pendingOrders} />
            <OutOfStockPopUpWindow showFunc={callable => this.setState({showOutOfStock: callable})} order={this.state.orderForPopup} />
            <SelectCollectionPointPopupWindow showFunc={callable => this.setState({showCollectionPoint: callable})} collectionPoints={this.props.collectionPoints} changeColletionPointFunc={this.changeCollectionPoint} />
            <SettingsPopupWindow showFunc={callable => this.setState({showSettings: callable})} showCollectionPoint={this.showCollectionPoint}/>
            <OrderSubscription />

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
    serverOrders:     state.orders.orders,
    updatedOrder:     state.orders.updatedOrder,
    ordersLoading:    state.orders.loading,
    barStaff:         state.bar.barStaff,
    collectionPoints: state.collectionPoints.collectionPoints
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: (collectionPoint) =>              dispatch(actions.getOrdersByCollectionPoint(collectionPoint)),
    updateOrder: (orderId, status, barStaffId) => dispatch(actions.updateOrder(orderId, status, barStaffId)),
    findBarStaff: (barId) =>                      dispatch(actions.findBarStaff(barId)),
    findCollectionPoints: (barId) =>              dispatch(actions.findCollectionPoints(barId))
  }
};

export default connect(mapReduxStateToProps, mapDispatchToProps)(App);
