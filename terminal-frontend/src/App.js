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
import multiColumnItemList from './components/multi-column-item-list/multi-column-item-list';
import notesPopupWindow from './components/notes-popup-window/notes-popup-window';
import PickupPopupWindow from './containers/pickup-popup-window/pickup-popup-window';
import switchAccountsPopupWindow from './components/switch-accounts-popup-window/switch-accounts-popup-window';
import TimeAgo from './containers/time-ago-clean/time-ago-clean';
import upcomingPopupWindow from './components/upcoming-popup-window/upcoming-popup-window';
import NotesIcon from "./notes.svg";
import OrderStatus from './OrderStatuses.js';
import IngredientAmounts from './IngredientAmounts.js';
import rangeScaling from "./FunctionLib.js";
import OutOfStockPopUpWindow from './containers/out-of-stock-popup-window/out-of-stock-popup-window';

// Settings:
const notificationDuration = 8000; // How long notifications stay on-screen (milliseconds)
const qrDelay = 200; // How fast to scan for QR codes (more info: https://www.npmjs.com/package/react-qr-reader)
const validScanCooldown = 3000; // Delay before accepting more QR codes after a valid scan (blocks notification scan)
const maxCollapsedOrdersToShow = 3; // How many orders show in a collapsed stack before fading to nothing
const collapsedOrderOpacityOffset = 35; // Opacity dim amount for collapsed awaiting orders

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      orders: [
        {
          id: "ALVR",
          orderDate: new Date(),
          customerID: 42,
          staffMemberID: 4,
          notes: "hi",
          items: [
            {
              id: 1,
              name: "VK Orange",
              price: 250,
              quantity: 1,
              ingredients: [{
                id: 546,
                name: "VK Orange",
                containsAlcohol: true,
                allergens: [],
                amount: IngredientAmounts.FACTORY,

              }]

            },
          ],
          status: OrderStatus.AWAITING_COLLECTION
        },
        {
          id: "KHVD", orderDate: new Date(), customerID: 13, staffMemberID: 6, items: [
            {
              id: 1,
              name: "VK Orange",
              price: 250,
              quantity: 1,
              ingredients: [{
                id: 547,
                name: "VK Orange",
                containsAlcohol: true,
                allergens: [],
                amount: IngredientAmounts.FACTORY,

              }]
            },
          ],
          status: OrderStatus.AWAITING_COLLECTION
        },
        { id: "EOPL", orderDate: new Date(), customerID: 13, staffMemberID: 4, items: [ { id: 1, name: "VK Orange", price: 250, quantity: 1, ingredients: [{id: 547, name: "VK Orange", containsAlcohol: true, allergens: [], amount: IngredientAmounts.FACTORY, }] }, ], status: OrderStatus.AWAITING_COLLECTION },
        { id: "KJHS", orderDate: new Date(), customerID: 13, staffMemberID: 2, items: [ { id: 1, name: "VK Orange", price: 250, quantity: 1, ingredients: [{id: 547, name: "VK Orange", containsAlcohol: true, allergens: [], amount: IngredientAmounts.FACTORY, }] }, ], status: OrderStatus.AWAITING_COLLECTION },
        { id: "KXHS", orderDate: new Date(), customerID: 13, staffMemberID: 10, items: [ { id: 1, name: "VK Orange", price: 250, quantity: 1, ingredients: [{id: 547, name: "VK Orange", containsAlcohol: true, allergens: [], amount: IngredientAmounts.FACTORY, }] }, ], status: OrderStatus.AWAITING_COLLECTION },
        { id: "KAHS", orderDate: new Date(), customerID: 13, staffMemberID: 1, items: [ { id: 1, name: "VK Orange", price: 250, quantity: 1, ingredients: [{id: 547, name: "VK Orange", containsAlcohol: true, allergens: [], amount: IngredientAmounts.FACTORY, }] }, ], status: OrderStatus.AWAITING_COLLECTION },
        {
          id: "XHBS",
          orderDate: new Date(),
          customerID: 93,
          staffMemberID: 0,
          items: [
            {
              id: 1,
              name: "VK Orange",
              price: 250,
              quantity: 1,
            },
            {
              id: 19,
              name: "VK Green",
              price: 250,
              quantity: 2,
            }
          ],
          status: OrderStatus.IN_PROGRESS
        },
        {
          id: "ZBNU",
          orderDate: new Date(),
          customerID: 93,
          staffMemberID: 1,
          items: [
            {
              id: 672,
              name: "VK Red",
              price: 250,
              quantity: 1,
              ingredients: [
                {
                  id: 921,
                  name: "VK Red",
                  containsAlcohol: true,
                  allergens: [],
                  amount: IngredientAmounts.FACTORY,
                  inStock: true,
                }
              ]
            },
            {
              id: 122,
              name: "Jager bomb",
              price: 125,
              quantity: 5,
              ingredients: [
                {
                  id: 8349,
                  name: "Jagermeister",
                  containsAlcohol: true,
                  allergens: [],
                  amount: IngredientAmounts.SHOT,
                  inStock: true,
                },
                {
                  id: 13,
                  name: "Redbull",
                  containsAlcohol: false,
                  allergens: [],
                  amount: IngredientAmounts.FILL,
                  inStock: true,
                }
              ]
            },
            {
              id: 484,
              name: "Mojito",
              price: 125,
              quantity: 1,
              ingredients: [
                {
                  id: 48,
                  name: "Lime cordial",
                  containsAlcohol: false,
                  allergens: [],
                  amount: IngredientAmounts.FILL,
                  inStock: true,
                },
                {
                  id: 10,
                  name: "White rum",
                  containsAlcohol: true,
                  allergens: [],
                  amount: IngredientAmounts.DOUBLE_SHOT,
                  inStock: true,
                }
              ]
            },
            {
              id: 1023,
              name: "Bottled water",
              price: 90,
              quantity: 2,
              ingredients: [
                {
                  id: 19,
                  name: "Bottled water",
                  containsAlcohol: false,
                  allergens: [],
                  amount: IngredientAmounts.FACTORY,
                  inStcok: true,
                }
              ]
            },
            {
              id: 67,
              name: "Jumba juice cocktail",
              price: 750,
              quantity: 1,
              ingredients: [
                {
                  id: 123,
                  name: "Slurp juice",
                  containsAlcohol: true,
                  allergens: [],
                  amount: IngredientAmounts.DOUBLE_SHOT,
                  inStock: true,
                },
                {
                  id: 276,
                  name: "Tomato soup",
                  containsAlcohol: false,
                  allergens: [],
                  amount: IngredientAmounts.SHOT,
                  inStock: false,
                },
                {
                  id: 2384,
                  name: "Diced Lego bricks",
                  containsAlcohol: false,
                  allergens: [],
                  amount: IngredientAmounts.PINT,
                  inStock: true,
                }
              ]
            }
          ],
          notes: "pleawse dont put a lime in my Vk becaseu i dont think im not allergic to htem!!!!",
          status: OrderStatus.IN_PROGRESS
        },
        {
          id: "ACBS",
          orderDate: new Date(),
          customerID: 93,
          items: [
            {
              id: 672,
              name: "VK Red",
              price: 250,
              quantity: 1,
              ingredients: [ {
                id: 222,
                name: "VK Red",
                containsAlcohol: true,
                allergens: [],
                amount: IngredientAmounts.FACTORY,
              }]
            },
            {
              id: 122,
              name: "Jager bomb",
              price: 125,
              quantity: 5,
              ingredients: [{
                id: 663,
                name: "Jagermesiter",
                containsAlcohol: true,
                allergens: [],
                amount: IngredientAmounts.SHOT,
                },
              {
                id: 197,
                name: "Red Bull",
                containsAlcohol: false,
                allergens: [],
                amount: IngredientAmounts.FILL,
              }]
            },
            {
              id: 484,
              name: "Mojito",
              price: 450,
              quantity: 1,
              ingredients: [{

                id: 48,
                name: "Lime cordial",
                containsAlcohol: false,
                allergens: [],
                amount: IngredientAmounts.FILL,
              },
              {
                id: 10,
                name: "White rum",
                containsAlcohol: true,
                allergens: [],
                amount: IngredientAmounts.DOUBLE_SHOT,

              }]
            },
            {
              id: 1023,
              name: "Bottled water",
              price: 90,
              quantity: 2,
              ingredients: [{
                id:1010,
                name: "Bottled Water",
                containsAlcohol: false,
                allergens: [],
                amount: IngredientAmounts.FACTORY
              }]
            },
            {
              id: 67,
              name: "Jumba juice cocktail",
              price: 750,
              quantity: 1,
              ingredients: [{
                  id: 105,
                  name: "Slurp juice",
                  containsAlcohol: true,
                  allergens: [],
                  amount: IngredientAmounts.DOUBLE_SHOT,
                },
                {
                  id: 277,
                  name: "Tomato soup",
                  containsAlcohol: false,
                  allergens: [],
                  amount: IngredientAmounts.SHOT,
                },
                {
                  id: 2386,
                  name: "Diced Lego bricks",
                  containsAlcohol: false,
                  allergens: [],
                  amount: IngredientAmounts.PINT,
              }]
            }
          ],
          status: OrderStatus.PENDING
        },
        {
          id: "PPLC",
          orderDate: new Date(),
          customerID: 93,
          items: [
            {
              id: 672,
              name: "VK Red",
              price: 250,
              quantity: 1,
            },
            {
              id: 122,
              name: "Jager bomb",
              price: 125,
              quantity: 5,
            },
            {
              id: 484,
              name: "Mojito",
              price: 750,
              quantity: 1,
            },
            {
              id: 1023,
              name: "Bottled water",
              price: 90,
              quantity: 2,
            },
            {
              id: 67,
              name: "Jumba juice cocktail",
              price: 750,
              quantity: 1,
            }
          ],
          status: OrderStatus.PENDING
        },
        {
          id: "AHBS",
          orderDate: new Date(),
          customerID: 93,
          items: [
            {
              id: 672,
              name: "VK Red",
              price: 250,
              quantity: 1,
            }
          ],
          status: OrderStatus.PENDING
        },
        {
          id: "LJPN",
          orderDate: new Date(),
          customerID: 93,
          items: [
            {
              id: 672,
              name: "Jager bomb",
              price: 125,
              quantity: 4,
            }
          ],
          status: OrderStatus.PENDING
        },
        {
          id: "GVAQ",
          orderDate: new Date(),
          customerID: 92,
          items: [
            {
              id: 672,
              name: "VK Red",
              price: 250,
              quantity: 1,
            },
            {
              id: 122,
              name: "Jager bomb",
              price: 125,
              quantity: 5,
            },
            {
              id: 484,
              name: "Mojito",
              price: 250,
              quantity: 1,
            },
            {
              id: 1023,
              name: "Bottled water",
              price: 90,
              quantity: 2,
            }
          ],
          status: OrderStatus.PENDING
        },
      ],

      staffMembers: [
        {
          id: 0,
          firstName: "Ben",
          surname: "Davies"
        },
        {
          id: 1,
          firstName: "Jess",
          surname: "Chessell"
        },
        {
          id: 2,
          firstName: "Markus",
          surname: "Jones"
        },
        {
          id: 3,
          firstName: "James",
          surname: "Smith"
        },
        {
          id: 4,
          firstName: "Joe",
          surname: "Bourton"
        },
        {
          id: 5,
          firstName: "Taylor",
          surname: "Stephens"
        },
        {
          id: 6,
          firstName: "Austin",
          surname: "Wheeler"
        },
        {
          id: 7,
          firstName: "Oscar",
          surname: "Isaac"
        },
        {
          id: 8,
          firstName: "Fenton",
          surname: "Reed"
        },
        {
          id: 9,
          firstName: "Ronnie",
          surname: "Pickering"
        },
        {
          id: 10,
          firstName: "Franco",
          surname: "Begbie"
        }
      ],

      // Hardcoded notifications have IDs in the negative so as to not conflict with addNotification()
      notifications: [
        {
          id: -1,
          class: "error",
          title: "Scan error",
          description: "Customer QR has been tampered with!",
          date: new Date(),
          isDismissed: false
        },
        {
          id: -2,
          class: "success",
          title: "Order completed",
          description: "You finished order #AHIF",
          date: new Date(),
          isDismissed: false
        },
        {
          id: -3,
          class: "info",
          title: "New order",
          description: "You now have 1 pending order",
          date: new Date(),
          isDismissed: false
        },
        {
          id: -4,
          class: "warning",
          title: "Collection not ready",
          description: "Customer's order is not ready for collection",
          date: new Date(),
          isDismissed: false
        }
      ],

      lastNotificationID: 0,

      selectedStaffMember: 1,
      awaitingOrdersIndexes: [],
      inProgressOrdersIndexes: [],
      pendingOrders: [],

      lastValidScan: 0,
      qrResult: "empty",

      awaitingOrdersClass: "collapsed",
      awaitingOrdersCollapsed: true,
    };

    let awaitingOrdersIndexes=[], inProgressOrdersIndexes=[], pendingOrders=[];
    for (let orderIndex in this.state.orders) {
      let order = this.state.orders[orderIndex];
      switch (order.status) {
        case OrderStatus.AWAITING_COLLECTION:
          awaitingOrdersIndexes.push(orderIndex);
          break;
        case OrderStatus.IN_PROGRESS:
          inProgressOrdersIndexes.push(orderIndex);
          break;
        default:
          pendingOrders.push(order);
      }
    }

    this.state.awaitingOrdersIndexes = awaitingOrdersIndexes;
    this.state.inProgressOrdersIndexes = inProgressOrdersIndexes;
    this.state.pendingOrders = pendingOrders;

    this.previewDiv = React.createRef();
  }

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
      }, () => {
        // Re-render notifications
        this.loadNotificationsJSX()
      })
    })
  };

  getStaffMemberFullName = (staffID) => {
    let staffMember = this.state.staffMembers.find(x => x.id === staffID);
    return staffMember.firstName + " " + staffMember.surname;
  };

  // Takes an order index to get an order object to set orderForPopup state obj
  setOrderForPopup = (orderIndex, callback) => {
    this.setState({orderForPopup: this.state.orders[orderIndex]}, callback());
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
    let order = this.state.orders.find(order => order.id === orderID && order.customerID === customerID); // Find order sharing the same ID and customer ID

    // Check order is found and was not already just scanned (stop popup spam)
    if (order && !this.state.orderWindowOpen) {
      if (order.status === OrderStatus.AWAITING_COLLECTION) {
        this.setState({orderForPopup: order, orderWindowOpen: true}, this.state.showPickup) // Show billing popup
      } else {
        this.addNotification("warning", "Collection not ready", "Customer's order is not ready for collection")
      }

    } else if (!order) {
      this.addNotification("error", "Scan error", "Customer QR has been tampered with!")
    }
  };

  componentDidMount() {
    const collectionId = localStorage.getItem('collectionPoint') || '5c925624bc63a912ed715315';
    this.props.loadOrders(collectionId);
    this.loadNotificationsJSX();
    setInterval(this.loadNotificationsJSX, notificationDuration + 1)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        serverOrders: nextProps.serverOrders
      });
    }
  }

  // Relaxed version of pickup order, used for bartenders to manually input just an order ID (not corresponding customer ID)
  pickupOrderInsecure = (orderID) => {
    let order = this.state.orders.find(order => order.id === orderID); // Find order by ID
    if (order) {
      if (order.status === OrderStatus.AWAITING_COLLECTION) {
        this.setState({orderForPopup: order}, this.state.showPickup) // Show billing popup
      } else {
        this.addNotification("warning", "Collection not ready", "Customer's order is not ready for collection")
      }
    } else {
      this.addNotification("error", "Order not found", "No order with code " + orderID + " exists!")
    }
  };

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

  getNotificationIconJSX(notificationClass) {
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

  // Function to load feed of active un-dismissed notifications as JSX into state for rendering
  loadNotificationsJSX = () => {
    const notificationsJSX = (
      <div className="notificationsContainer">
        {
        this.state.notifications.map((notificationData) => {
          // Check the notification hasn't expired or been dismissed:
          if ((new Date() - notificationData.date) > notificationDuration || notificationData.isDismissed) return null;

          return (
            <div key={notificationData.id} className="notificationBanner">
              <span className={"icon " + notificationData.class}>{ this.getNotificationIconJSX(notificationData.class) }</span>
              <div className="textContainer">
                <span className="title">{notificationData.title}</span>
                <br />
                <span className="description">{notificationData.description}</span>
              </div>
              <div className="closeButton noselect" onClick={()=> {
                notificationData.isDismissed = true;
                this.loadNotificationsJSX()
              }}>&#x2716;</div>
            </div>
          )
        })
      }
      </div>
    );

    this.setState({notificationsJSX: notificationsJSX})
  };

  ToggleAwaitingCollapse = (event) => {
    let newStyle = "collapsed";
    let collapsed = true;
    if (this.state.awaitingOrdersClass === newStyle) {
      newStyle = "";
      collapsed = false;
    }

    this.setState({awaitingOrdersClass: newStyle, awaitingOrdersCollapsed: collapsed})
  };

  scrollToPreview = () => {
    this.previewDiv.current.scrollIntoView({ behavior: 'smooth' })
  };

  showOutOfStock = () => { this.state.showOutOfStock() };

  render() {
    console.log(this.state.serverOrders);
    return (
      <div className="App">
        <header className="App-header">
          <div id="topBar">
            <div id="accountsHotbar">
            {
              this.state.staffMembers.map((staffData) => {
                let buttonClass = "";
                if (this.state.selectedStaffMember === staffData.id) buttonClass = "selected";
                return ( <button key={staffData.id} className={buttonClass}>{staffData.firstName}</button> );
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

              <button onClick={this.state.showSwitchAccounts} className="large"><FontAwesomeIcon icon={faRetweet} /> Switch account</button>
            </div>
          </div>

          <h1>AWAITING COLLECTION ({ this.state.awaitingOrdersIndexes.length }):</h1>
          <div className={"ordersContainer " + this.state.awaitingOrdersClass}>
            {
              this.state.awaitingOrdersIndexes.map((orderIndex, incrementer) => {
                const orderData = this.state.orders[orderIndex];
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
                      className="orderContainer collapseable"
                      style={{zIndex: orderZIndex, opacity: orderOpacity, width: width + "%"}}
                  >
                    <h2>#{orderData.id} - <TimeAgo date={orderData.orderDate}/></h2>
                    <h5>Made by <span className="bartenderName">{ this.getStaffMemberFullName(orderData.staffMemberID) }</span></h5>
                    <div className="orderButtonsContainer" onClick={(e)=>{e.stopPropagation()}}>
                      <button className="orderButton">
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

          <h1>YOUR IN-PROGRESS ({this.state.inProgressOrdersIndexes.length}):</h1>
          <div className="ordersContainer">
            {
                this.state.inProgressOrdersIndexes.map((orderIndex) => {
                  const orderData = this.state.orders[orderIndex];

                  // Only show pending orders belonging to the current staff member
                  if (orderData.staffMemberID !== this.state.selectedStaffMember) return null;

                  return (
                    <div key={orderIndex} className="orderContainer in-progress">

                      <multiColumnItemList orderItems={orderData.items} />

                      <h3>#{orderData.id} - <TimeAgo date={orderData.orderDate}/></h3>

                      { this.renderCustomerNotes(orderIndex, orderData.notes) }

                      <div className="orderButtonsContainer">
                        <button className="orderButton">
                          <span className="icon ready"><FontAwesomeIcon icon={faCheck} /></span>
                          <span className="title">Ready</span>
                          <br />
                          <span className="subtitle">Mark as ready</span>
                        </button>
                        <button className="orderButton">
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
            <button className="pendingOrderButton">
              <span className="icon next"><FontAwesomeIcon icon={faLongArrowAltUp} /></span>
              <span className="title">Take next order</span>
              <br />
              <span className="subtitle">
                Adds next order to your ({
                  this.state.staffMembers.find(x => x.id === this.state.selectedStaffMember).firstName
                }) in-progress feed
              </span>
            </button>

            <button onClick={this.state.showUpcoming} className="pendingOrderButton">
              <span className="icon history"><FontAwesomeIcon icon={faClock} /></span>
              <span className="title">View upcoming</span>
              <br />
              <span className="subtitle">
                Display a feed of pending orders
              </span>
            </button>
          </div>

          <h4>{this.state.pendingOrders.length} orders currently pending...</h4>

          <BillingPopupWindow showFunc={callable => this.setState({showBilling: callable})} showOutOfStock={this.showOutOfStock} order={this.state.orderForPopup} />
          <PickupPopupWindow showFunc={callable => this.setState({showPickup: callable})} showOutOfStock={this.showOutOfStock} dismissedHandler={this.pickupPopupDismissed} order={this.state.orderForPopup} />
          <notesPopupWindow showFunc={callable => this.setState({showNotes: callable})} order={this.state.orderForPopup} />
          <switchAccountsPopupWindow showFunc={callable => this.setState({showSwitchAccounts: callable})} staffMembers={this.state.staffMembers} />
          <ManualPickupPopupWindow showFunc={callable => this.setState({showManualPickup: callable})} pickupOrderFunc={this.pickupOrderInsecure} />
          <upcomingPopupWindow showFunc={callable => this.setState({showUpcoming: callable})} pendingOrders={this.state.pendingOrders} />
          <OutOfStockPopUpWindow showFunc={callable => this.setState({showOutOfStock: callable})} order={this.state.orderForPopup} />

          { this.state.notificationsJSX }

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

const mapStateToProps = state => {
  return {
    serverOrders: state.orders.orders,
    ordersLoading: state.orders.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: (collectionPoint) => dispatch(actions.getOrdersByCollectionPoint(collectionPoint))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
