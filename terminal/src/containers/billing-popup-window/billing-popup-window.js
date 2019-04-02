import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {OrderStatuses} from '../../helpers/schemaHelper';
import {penniesToPriceString} from '../../helpers/FunctionLib'

// SETTINGS:
const HideStockManagementForAwaitingCollection = false; // Should hide out of stock button for orders awaiting collection?

class BillingPopupWindow extends Component {

    state = {}

    updateOrder = (orderID, status) => {
        this.setState({closePopup: true}, ()=>this.setState({closePopup: null}));
        this.props.updateOrderFunc(orderID, status);
    };

    showOutOfStock = () => {
        this.state.showOutOfStock();
    };

    
    buildTitle = (order) => {
        if (order) return "#" + order.collectionId + " options"; else return "";
    };

    // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
    buildSubtitle = (order) => {
        if (order) return (
            <span>
                Ordered <TimeAgo date={order.date}/>, at {DateTime.fromJSDate(order.date).toFormat("h:mma")}
            </span>
        ); else return (<span></span>);
    };

    buildChildren = (order) => {
        if (order) {
            let FeesJSX;
            if (order.stripeFee) {
                FeesJSX = (
                    <li>
                        <span className="quantity">- </span>
                        <span className="item">DrinKing fee(s)</span>
                        <span className="price">{penniesToPriceString(order.stripeFee)}</span>
                    </li>
                );
            }

            return (
                <React.Fragment>
                    <h1>DRINKS:</h1>
                    <div className="indentedContent">
                        <ul className="orderList">
                            { order.drinks.map((itemData, counter) => {
                                return (
                                    <li key={counter}>
                                        <span className="quantity">{itemData.quantity}x</span>
                                        <span className="item">{itemData.name}</span>
                                        <span className="price">{penniesToPriceString(itemData.price)}</span>
                                    </li>
                                )
                            })}
                            { FeesJSX }
                        </ul>
                        <div className="billingTotal">
                            <span className="totalText">Total:</span>
                            <span className="totalAmount">{penniesToPriceString(this.calcTotal(this.props.order))}</span>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else return "";
    };

    // Function to hide stock button if the order is awaiting collection (if user setting permits)
    renderOutOfStockButton = (order) => {
        if (!HideStockManagementForAwaitingCollection || order.status !== OrderStatuses.AWAITING_COLLECTION) {
            return (
                <button onClick={this.props.showOutOfStock} className="orderButton">
                    <span className="icon outOfStock"><FontAwesomeIcon icon={faArchive} /></span>
                    <span className="title">Out of Stock</span>
                    <br />
                    <span className="subtitle">Mark unavailable</span>
                </button>
            )
        } else {
            return null;
        }
    };

    // Function to build buttons for order
    buildButtons = (order) => {
        return (
            <div className="popupButtonsContainer">
                <button onClick={()=> {this.updateOrder(order._id, OrderStatuses.REFUNDED)}} className="orderButton">
                    <span className="icon refund"></span>
                    <span className="title">Refund</span>
                    <br />
                    <span className="subtitle">Mark as un-ready</span>
                </button>
                {this.renderOutOfStockButton(order)}
                <button onClick={()=> {this.updateOrder(order._id, OrderStatuses.CANCELLED)}} className="orderButton">
                    <span className="icon delete"><FontAwesomeIcon icon={faTrashAlt} /></span>
                    <span className="title">Delete</span>
                    <br />
                    <span className="subtitle">Cancel &amp; charge</span>
                </button>
            </div>
        )
    };

    render () {
        return (
            <PopupWindow
                    className="billingOptionsPopup"
                    title={this.buildTitle(this.props.order)}
                    subtitle={this.buildSubtitle(this.props.order)}
                    showCloseButton={true}
                    showFunc={this.props.showFunc}
                    dismissedHandler={this.props.dismissedHandler}
                    buttons={this.buildButtons(this.props.order)}
                    closePopup={this.state.closePopup}
            >
                { this.buildChildren(this.props.order) }
            </PopupWindow>
        )
    }
}

BillingPopupWindow.propTypes = {
    order: PropTypes.object,
    showFunc: PropTypes.func.isRequired, // Callback function held in parent that calls popup window instance's ShowPopup()
    showOutOfStock: PropTypes.func.isRequired, // Function to show out of stock window
    updateOrderFunc: PropTypes.func.isRequired // Func to post updated order status
};

export default BillingPopupWindow;
