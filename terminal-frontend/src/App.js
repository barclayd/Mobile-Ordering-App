import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet, faLongArrowAltUp, faCamera, faBeer, faExclamation, faInfo, faTrophy, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import TimeAgo from './components/time-ago-clean/time-ago-clean'
import BillingPopupWindow from './components/billing-popup-window/billing-popup-window'
import NotesPopupWindow from './components/notes-popup-window/notes-popup-window'
import ManualPickupPopupWindow from './components/manual-pickup-popup-window/manual-pickup-popup-window'
import NotesIcon from "./notes.svg"
import './App.css'
import QrReader from "react-qr-reader"

const OrderState = {
  AWAITING_COLLECTION: 0, 
  IN_PROGRESS: 1, 
  PENDING: 2
};

// Settings:
const itemsPerOrderListColumn = 4; // How many order items show per column
const notificationDuration = 7000; // How long notifications stay on-screen (miliseconds)
const qrDelay = 300; // How fast to scan for QR codes (more info: https://www.npmjs.com/package/react-qr-reader)
const validScanCooldown = 3000; // Delay before accepting more QR codes after a valid scan (blocks notification scan)

export default class App extends Component {
  constructor (props) {
    super(props);

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
      awaitingOrders: [],
      inProgressOrders: [],
      pendingOrders: [],

      lastValidScan: 0,
      qrResult: "No result",
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
      }

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
  }

  handleScan = (data) => {
    if (data) {
      this.setState({
        qrResult: data
      });

      try {
        let qrJSON = JSON.parse(data); // Attempt to parse QR data to see if it contains valid JSON
        if (qrJSON.orderID && new Date() - this.state.lastValidScan > validScanCooldown) { // Check the JSON contains an order ID, then run the pickup function
          this.pickupOrder(qrJSON.orderID, qrJSON.customerID)
          this.setState({
            lastValidScan: new Date()
          });
        }

      } catch (error) {
        console.error(error);
      }
    }
  }
  handleError = (err) => {
    console.error(err);
  }

  // Handler to re-enable order scanning for the same order when knowingly dismissed by bartender
  billingPopupDismissed = () => {
    this.setState({orderWindowOpen: null})
  }

  // Strict func that takes order ID and corrisponding customer ID from QR to prevent order code theft
  pickupOrder = (orderID, customerID) => {
    let order = this.state.orders.find(order => order.id === orderID && order.customerID === customerID) // Find order sharing the same ID and customer ID

    // Check order is found and was not already just scanned (stop popup spam)
    if (order && !this.state.orderWindowOpen) {
      if (order.orderState === OrderState.AWAITING_COLLECTION) {
        this.setState({orderForPopup: order, orderWindowOpen: true}, this.state.showBilling) // Show billing popup
      } else {
        this.addNotification("warning", "Collection not ready", "Customer's order is not ready for collection")
      }

    } else if (!order) {
      this.addNotification("error", "Scan error", "Customer QR has been tampered with!")
    }
  }

  // Relaxed version of pickup order, used for bartenders to manaully input just an order ID (not corrisponding customer ID)
  pickupOrderInsecure = (orderID) => {
    let order = this.state.orders.find(order => order.id === orderID) // Find order by ID
    if (order) {
      if (order.orderState === OrderState.AWAITING_COLLECTION) {
        this.setState({orderForPopup: order}, this.state.showBilling) // Show billing popup
      } else {
        this.addNotification("warning", "Collection not ready", "Customer's order is not ready for collection")
      }
    }
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
        <div onClick={this.state.showNotes} className="customerNotesContainer">
          <img className="notesIcon" src={NotesIcon} alt="Notes icon"/>
          <h2 className="header">Customer notes:</h2>
          <div className="notes">{notes}</div>
        </div>
      )
    }
  }

  getNotificationIconJSX(notificationClass) {
    switch (notificationClass) {
      case "info":
        return <FontAwesomeIcon icon={faInfo} />
      case "success":
        return <FontAwesomeIcon icon={faTrophy} />
      case "warning":
        return <FontAwesomeIcon icon={faExclamationTriangle} />
      default: // "error"
        return <FontAwesomeIcon icon={faExclamation} />
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
              <div className="closeButton" onClick={()=> {
                notificationData.isDismissed = true;
                this.loadNotificationsJSX()
              }}>🗙</div>
            </div>
          )
        })
      }
      </div>
    )

    this.setState({notificationsJSX: notificationsJSX})
  }

  componentDidMount() {
    this.loadNotificationsJSX()
    setInterval(this.loadNotificationsJSX, notificationDuration + 1)
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

          <div id="buttonsToolbar">
            <button className="large" onClick={() => {
              this.setState({showPreview: !this.state.showPreview}, () => {
                if (this.state.showPreview) {
                  document.getElementsByClassName("qrReader")[0].style.display = "block"
                } else {
                  document.getElementsByClassName("qrReader")[0].style.display = "none";
                }
              })
            }}><FontAwesomeIcon icon={faCamera} /> Preview scanner</button>

            <button className="large" onClick={this.state.showManualPickup}><FontAwesomeIcon icon={faBeer} /> Pickup order</button>

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
                      <button onClick={this.state.showBilling} className="orderButton">
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
                        <button onClick={this.state.showBilling} className="orderButton">
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
            <button onClick={this.state.showBilling} className="pendingOrderButton">
              <span className="icon next"><FontAwesomeIcon icon={faLongArrowAltUp} /></span>
              <span className="title">Take next order</span>
              <br />
              <span className="subtitle">
                Adds next order to your ({
                  this.state.staffMembers.find(x => x.id === this.state.selectedStaffMember).firstName
                }) in-progress feed
              </span>
            </button>

            <button onClick={this.state.showBilling} className="pendingOrderButton">
              <span className="icon history"><FontAwesomeIcon icon={faClock} /></span>
              <span className="title">View upcoming</span>
              <br />
              <span className="subtitle">
                Display a feed of pending orders
              </span>
            </button>
          </div>

          <h4>{this.state.pendingOrders.length} orders currently pending...</h4>

          <BillingPopupWindow showFunc={callable => this.setState({showBilling: callable})} dismissedHandler={this.billingPopupDismissed} order={this.state.orderForPopup} />
          <NotesPopupWindow showFunc={callable => this.setState({showNotes: callable})} order={this.state.orders[3]} />
          <ManualPickupPopupWindow showFunc={callable => this.setState({showManualPickup: callable})} pickupOrderFunc={this.pickupOrderInsecure} />
          
          { this.state.notificationsJSX }

          {
            this.state.disableScanner ? null :
              <QrReader
                delay={qrDelay}
                onError={this.handleError}
                onScan={this.handleScan}
                className="qrReader"
              />
          }
          <p>{this.state.qrResult}</p>
        </header>
      </div>
    );
  }
}