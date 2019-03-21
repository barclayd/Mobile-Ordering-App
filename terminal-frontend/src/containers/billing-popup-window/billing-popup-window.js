import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './style.css'
import PopupWindow from '../popup-window/popup-window'
import TimeAgo from '../time-ago-clean/time-ago-clean'
import { DateTime } from 'luxon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import OrderState from '../../OrderStatuses';

// SETTINGS:
const HideStockManagementForAwaitingCollection = false; // Should hide out of stock button for orders awaiting collection?

class BillingPopupWindow extends Component {

    showOutOfStock = () => {
        this.state.showOutOfStock();
    };

    calcTotal = (order) => {
        if (order) {
            return order.items.reduce((accumulator, item) => {
                return accumulator + item.price;
            },0)
        } else {
            return 0;
        }
    };

    buildTitle = (order) => {
        if (order) return "#" + order.id + " options"; else return "";
    };

    // Time formatting with Luxon: https://moment.github.io/luxon/docs/manual/formatting.html#table-of-tokens
    buildSubtitle = (order) => {
        if (order) return (
            <span>
                Ordered <TimeAgo date={order.orderDate}/>, at {DateTime.fromJSDate(order.orderDate).toFormat("h:mma")}
            </span>
        ); else return (<span></span>);
    };

    buildChildren = (order) => {
        if (order) return (
            <React.Fragment>
                <h1>DRINKS:</h1>
                <div className="indentedContent">
                    <ul className="orderList">
                        {order.items.map((itemData) => {
                            return (
                                <li key={itemData.id}>
                                    <span className="quantity">{itemData.quantity}x</span>
                                    <span className="item">{itemData.name}</span>
                                    <span className="price">£{itemData.price}</span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="billingTotal">
                        <span className="totalText">Total:</span>
                        <span className="totalAmount">£{this.calcTotal(this.props.order)}</span>
                    </div>
                </div>
            </React.Fragment>
        ); else return "";
    };

    // Function to hide stock button if the order is awaiting collection (if user setting permits)
    renderOutOfStockButton = (order) => {
        if (!HideStockManagementForAwaitingCollection || order.status !== OrderState.AWAITING_COLLECTION) {
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
                <button className="orderButton">
                    <span className="icon refund"></span>
                    <span className="title">Refund</span>
                    <br />
                    <span className="subtitle">Mark as un-ready</span>
                </button>
                {this.renderOutOfStockButton(order)}
                <button className="orderButton">
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
};

export default BillingPopupWindow;
